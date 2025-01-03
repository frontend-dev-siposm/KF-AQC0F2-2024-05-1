﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TrelloCopy.Data;
using TrelloCopy.Models;

namespace TrelloCopy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ILogger<TaskController> _logger;
        private readonly UserManager<SiteUser> _userManager;
        IProjectRepository _ProjectRepository;
        ITaskRepository _TaskRepository;

        public TaskController(ILogger<TaskController> logger, UserManager<SiteUser> userManager, IProjectRepository projectRepository, ITaskRepository taskRepository)
        {
            _logger = logger;
            _userManager = userManager;
            _ProjectRepository = projectRepository;
            _TaskRepository = taskRepository;
        }


        [HttpGet]
        public ActionResult<IEnumerable<TrelloTask>> GetTasks()
        {
            return Ok(_TaskRepository.ReadAll().ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<TrelloTask> GetTask(int id)
        {
            var task = _TaskRepository.ReadById(id);
            if (task == null)
                return NotFound();
            
            return Ok(task);
        }
        [HttpPost]
        public ActionResult<TrelloTask> CreateTask(TrelloTask task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _TaskRepository.Create(task);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, TrelloTask task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingTask = _TaskRepository.ReadById(id);
            if (existingTask == null)
                return NotFound();

            if (id != task.Id)
                return BadRequest("Task ID mismatch");
            
            _TaskRepository.Update(task);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _TaskRepository.ReadById(id);
            if (task == null)
                return NotFound();

            _TaskRepository.Delete(id);
            return NoContent();
        }
        [Authorize]
        [HttpGet("users/{userid}/image")]
        public async Task<IActionResult> GetUserImage(string userid)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.Id == userid);
            if (user == null)
                return NotFound("User not found");

            if (user.Data == null || user.ContentType == null)
                return NotFound("User has no profile image");

            return new FileContentResult(user.Data, user.ContentType);
        }
        [Authorize]
        [HttpPost("{id}/assign")]
        public IActionResult AssignTask(int id)
        {
            var task = _TaskRepository.ReadById(id);
            if (task == null)
                return NotFound();
                
            if (task.HasOwner)
                return BadRequest("Task is already assigned");
                
            task.Owner = _userManager.GetUserId(this.User);
            task.HasOwner = true;
            _TaskRepository.Update(task);
            return NoContent();
        }
        [Authorize]
        [HttpPost("{id}/detach")]
        public IActionResult DetachTask(int id)
        {
            var task = _TaskRepository.ReadById(id);
            if (task == null)
                return NotFound();

            var currentUserId = _userManager.GetUserId(this.User);
            if (task.Owner != currentUserId)
                return BadRequest("Only the task owner can detach from it");

            task.Owner = "";
            task.HasOwner = false;
            _TaskRepository.Update(task);
            return NoContent();
        }

    }
}
