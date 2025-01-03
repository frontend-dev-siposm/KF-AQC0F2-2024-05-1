using TrelloCopy.Models;

namespace TrelloCopy.Data
{
    public interface ITaskRepository
    {
        void Create(TrelloTask task);
        void Delete(int id);
        void DeleteByName(string name);
        IEnumerable<TrelloTask> ReadAll();
        TrelloTask? ReadById(int id);
        TrelloTask? ReadByName(string name);
        void Update(TrelloTask task);
    }
}