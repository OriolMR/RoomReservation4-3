using Microsoft.AspNetCore.Mvc;

namespace Users.Models;

public class Response : Controller
{
    public string Status { get; set; } = "500";
    public string? Message { get; set; }
}
