using Microsoft.Build.Construction;
using Microsoft.Build.Evaluation;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Security.Cryptography;
using TrelloCopy.Models;

namespace TrelloCopy.Data
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationLiteDbContext _context;

        public ProjectRepository(ApplicationLiteDbContext context)
        {
            _context = context;
        }

        public IEnumerable<TrelloProject> ReadAll()
        {
            return _context.Projects.FindAll();
        }

        public TrelloProject? ReadById(int id)
        {
            return _context.Projects.FindById(id);
        }

        public void Add(TrelloProject project)
        {
            _context.Projects.Insert(project);
        }

        public void Update(TrelloProject project)
        {
            TrelloProject old = ReadById(project.Id);
            old.Name = project.Name;

            _context.Projects.Update(old);
        }

        public void Delete(int id)
        {
            _context.Projects.Delete(id);
        }
    }
}
