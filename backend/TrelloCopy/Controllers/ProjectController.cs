﻿﻿﻿﻿﻿﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using TrelloCopy.Data;
using TrelloCopy.Models;

namespace TrelloCopy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly ILogger<ProjectController> _logger;
        private readonly UserManager<SiteUser> _userManager;
        IProjectRepository _ProjectRepository;
        ITaskRepository _TaskRepository;

        public ProjectController(ILogger<ProjectController> logger, UserManager<SiteUser> userManager, IProjectRepository projectRepository, ITaskRepository taskRepository)
        {
            _logger = logger;
            _userManager = userManager;
            _ProjectRepository = projectRepository;
            _TaskRepository = taskRepository;
        }


        [HttpGet]
        //[Authorize]
        public ActionResult<IEnumerable<TrelloProject>> Index()
        {
            return Ok(_ProjectRepository.ReadAll().ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<TrelloProject> GetProject(int id)
        {
            var project = _ProjectRepository.ReadById(id);
            if (project == null)
                return NotFound();
                
            return Ok(project);
        }

        [HttpPost]
        public ActionResult<TrelloProject> CreateProject(TrelloProject project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _ProjectRepository.Add(project);
            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProject(int id, TrelloProject project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _ProjectRepository.Update(project);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProject(int id)
        {
            var tasks = _TaskRepository.ReadAll().Where(t=>t.ProjectId==id);
            foreach (var item in tasks)
            {
                _TaskRepository.Delete(item.Id);
            }
            _ProjectRepository.Delete(id);
            return NoContent();
        }

 
        [HttpGet("{id}/tasks")]
        public ActionResult<IEnumerable<TrelloTask>> GetProjectTasks(int id)
        {
            var tasks = _TaskRepository.ReadAll().Where(t => t.ProjectId == id).ToList();
            return Ok(tasks);
        }
        [HttpPut("{projectId}/tasks/{taskId}")]
        public IActionResult UpdateProjectTask(int projectId, int taskId, TrelloTask task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _TaskRepository.Update(task);
            return NoContent();
        }
        [HttpPost("{id}/tasks")]
        public ActionResult<TrelloTask> CreateProjectTask(int id, TrelloTask task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _TaskRepository.Create(task);
            return CreatedAtAction(nameof(GetProjectTasks), new { id = task.ProjectId }, task);
        }
        [Authorize]
        [HttpGet("users/{userid}/image")]
        public async Task<IActionResult> GetUserImage(string userid)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.Id == userid);
            return new FileContentResult(user.Data, user.ContentType);
        }
    }
}
