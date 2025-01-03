namespace TrelloCopy.Models
{
    public class TaskCreateViewModel
    {
        public List<TrelloProject> Projects { get; set; }
        public TrelloTask Task { get; set; }
    }
}
