using System.ComponentModel.DataAnnotations;

namespace EmailService.Models
{
    public class EmailDataModel
    {
            [Required]
            [EmailAddress]
            public string emailData { get; set; }
        }
}