using System.ComponentModel.DataAnnotations;

namespace Usuarios.Models;

public class RegisterModel
{
    [Required]
    public string? UserName { get; set; }

    [Required]
    public string? Password { get; set; }

    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Phone]
    public string? Phone { get; set; }
}
