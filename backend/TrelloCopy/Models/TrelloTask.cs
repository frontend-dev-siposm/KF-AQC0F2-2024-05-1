using LiteDB;
using System.ComponentModel.DataAnnotations;

namespace TrelloCopy.Models
{
    public class TrelloTask
    {
        [BsonId]
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        [StringLength(200, ErrorMessage = "Name length can't be more than 200.")]
        public string Name { get; set; }
        public string Description { get; set; } = "";
        public bool IsCompleted { get; set; } = false;
        public bool HasOwner { get; set; } = false;
        public string? Owner { get; set; }
        [Required]
        public int ProjectId { get; set; }


    }
}
