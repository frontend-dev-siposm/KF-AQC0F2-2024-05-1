
using LiteDB;
using Microsoft.Build.Evaluation;
using Microsoft.CodeAnalysis;
using TrelloCopy.Models;

namespace TrelloCopy.Data
{
    public class ApplicationLiteDbContext : IDisposable
    {
        private readonly LiteDatabase _liteDatabase;

        public ApplicationLiteDbContext(string ConnectionString)
        {
            _liteDatabase = new LiteDatabase(ConnectionString);
            Seed();
        }



        public ILiteCollection<TrelloProject> Projects => _liteDatabase.GetCollection<TrelloProject>("projects");
        public ILiteCollection<TrelloTask> Tasks => _liteDatabase.GetCollection<TrelloTask>("tasks");

        public void Dispose()
        {
            throw new NotImplementedException();
        }
        public void Seed()
        {
            if (_liteDatabase.GetCollection<TrelloProject>("projects").Count() == 0)
            {
                var tasks = new List<TrelloTask> {
                 new TrelloTask { Name = "A", Description = "Task 1 for Project A", ProjectId = 1 },
                 new TrelloTask { Name = "B", Description = "Task 2 for Project A", ProjectId = 1 },
                 new TrelloTask { Name = "C", Description = "Task 3 for Project A", ProjectId = 1 },
                 new TrelloTask { Name = "D", Description = "Task 4 for Project A", ProjectId = 1 },
                 new TrelloTask { Name = "E", Description = "Task 1 for Project B" , ProjectId = 2},
                 new TrelloTask { Name = "F", Description = "Task 2 for Project B" , ProjectId = 2},
                 new TrelloTask { Name = "G", Description = "Task 3 for Project B" , ProjectId = 2},
                 new TrelloTask { Name = "H", Description = "Task 4 for Project B" , ProjectId = 2}
            };

                foreach (var task in tasks)
                {
                    var tasksCollection = _liteDatabase.GetCollection<TrelloTask>("tasks");
                    tasksCollection.Insert(task);
                }

                var taskCollection = _liteDatabase.GetCollection<TrelloTask>("tasks").FindAll();

                var projects = new List<TrelloProject>
            {
            //    new TrelloProject { Name = "Project A", TaskID = new List<int>
            //        {
            //            taskCollection.ToList()[0].Id,
            //            taskCollection.ToList()[1].Id }
            //        },

            //new TrelloProject { Name = "Project B", TaskID = new List<int>
            //{
            //    taskCollection.ToList()[2].Id,
            //    taskCollection.ToList()[3].Id }
            //}
                new TrelloProject { Name = "Project A" },
                new TrelloProject { Name = "Project B" }
                };

                var projectsCollection = _liteDatabase.GetCollection<TrelloProject>("projects");

                foreach (var project in projects)
                {
                    projectsCollection.Insert(project);


                }
            }
        }
    }
}
