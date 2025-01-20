﻿using TrelloCopy.Models;

namespace TrelloCopy.Data
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationLiteDbContext _context;

        public TaskRepository(ApplicationLiteDbContext context)
        {
            _context = context;
        }

        public void Create(TrelloTask task)
        {
            _context.Tasks.Insert(task);
        }
        public TrelloTask? ReadByName(string name)
        {
            var task = _context.Tasks.FindOne(x => x.Name == name);
            if (task == null) { throw new ArgumentNullException(); }
            return task;
        }
        public void DeleteByName(string name)
        {
            var task = this.ReadByName(name);
            if (task == null)
            {
                throw new ArgumentNullException();
            }
            _context.Tasks.Delete(task.Id);
        }
        public TrelloTask? ReadById(int id)
        {
            return _context.Tasks.FindById(id);
        }
        public IEnumerable<TrelloTask> ReadAll()
        {
            return _context.Tasks.FindAll();
        }
        public void Update(TrelloTask task)
        {
            TrelloTask old = ReadById(task.Id);
            old.Name = task.Name;
            old.HasOwner = task.HasOwner;
            old.IsCompleted = task.IsCompleted;
            old.Owner = task.Owner;
            old.OwnerEmail = task.OwnerEmail;
            old.Description = task.Description;
            old.ProjectId = task.ProjectId;
            _context.Tasks.Update(old);
        }
        public void Delete(int id)
        {
            _context.Tasks.Delete(id);
        }
    }
}
