using TrelloCopy.Models;

namespace TrelloCopy.Data
{
    public interface IProjectRepository
    {
        void Add(TrelloProject project);
        void Delete(int id);
        IEnumerable<TrelloProject> ReadAll();
        TrelloProject? ReadById(int id);
        void Update(TrelloProject project);
    }
}