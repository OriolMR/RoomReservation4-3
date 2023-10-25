using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Usuarios.Models;


namespace Usuarios.Controllers;

//[Authorize]
[ApiController]
[Route("api/[controller]")]

public class UserController : Controller
{


    private readonly UserManager<IdentityUser> _userManager;

    public UserController(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;

    }


    [HttpGet]
    [Route("GetAllUsers")]
    public async Task<IActionResult> GetAllUsers() => Ok(await _userManager.Users.ToListAsync());

    [HttpGet]
    [Route("GetUserById")]
    public async Task<IActionResult> GetUserById(string id) =>
        Ok(await _userManager.FindByIdAsync(id));

    [HttpGet]
    [Route("GetUserByEmail")]
    public async Task<IActionResult> GetUserByEmail(string email) =>
        Ok(await _userManager.FindByEmailAsync(email));

    [HttpPut]
    [Route("UpdateUser")]
    public async Task<IActionResult> UpdateUser(UserModel model)
    {
        var userToUpdate = await _userManager.FindByEmailAsync(model.Email);

        if (userToUpdate == null)
        {
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new Response { Status = "Error", Message = "User does not exist." }
            );
        }

        userToUpdate.PhoneNumber = model.Phone;
        userToUpdate.Email = model.Email;
        userToUpdate.UserName = model.UserName;

        var result = await _userManager.UpdateAsync(userToUpdate);
        if (result.Succeeded)
        {
            return NoContent();
        }
        return StatusCode(
            StatusCodes.Status500InternalServerError,
            new Response
            {
                Status = "Error",
                Message = result.Errors
                    .Select(error => error.Description)
                    .Aggregate("", (acc, error) => acc + $"*SEPARATOR*{error}")
            }
        );
    }

    [Route("UpdatePassword")]
    [HttpPut]
    public async Task<IActionResult> UpdatePassword(string id, UpdatePasswordModel model)
    {
        if (model.NewPassword == model.NewPasswordConfirmation)
        {
            var result = await _userManager.ChangePasswordAsync(
                await _userManager.FindByIdAsync(id),
                model.CurrentPassword,
                model.NewPassword
            );
            if (result.Succeeded)
            {
                return Ok("Password updated successfully.");
            }
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new Response
                {
                    Status = "Error.",
                    Message = result.Errors
                        .Select(error => error.Description)
                        .Aggregate("", (acc, error) => acc + $"*SEPARATOR*{error}")
                }
            );
        }
        return StatusCode(
            StatusCodes.Status500InternalServerError,
            new Response
            {
                Status = "Error.",
                Message = "New password doesn't match password confirmation field."
            }
        );
    }

    [Route("CheckPassword")]
    [HttpGet]
    public async Task<IActionResult> CheckPassword(string password) =>
        Ok(await _userManager.CheckPasswordAsync(await _userManager.GetUserAsync(User), password));
}
