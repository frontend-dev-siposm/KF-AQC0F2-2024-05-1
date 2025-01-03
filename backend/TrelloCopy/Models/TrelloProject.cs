using LiteDB;
using System.ComponentModel.DataAnnotations;

namespace TrelloCopy.Models
{
    public class TrelloProject
    {
        [BsonId]
        public int Id { get; set; }
        [Display(Name = "Project")]
        public string Name { get; set; }
        //public List<int> TaskID { get; set; } = new List<int>();
    }
}
