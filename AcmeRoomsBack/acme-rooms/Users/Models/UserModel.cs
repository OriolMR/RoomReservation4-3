﻿using System.ComponentModel.DataAnnotations;

namespace Users.Models;

public class UserModel
{
    [Required]
    public string UserName { get; set; } = default!;

    [EmailAddress]
    [Required]
    public string Email { get; set; } = default!;

    [Phone]
    public string Phone { get; set; } = default!;
}
