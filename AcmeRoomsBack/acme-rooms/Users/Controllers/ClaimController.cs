using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Usuarios.Models;
using System.Data;

namespace Usuarios.Controllers;

public class ClaimController : Controller
{
    private readonly UserManager<IdentityUser> _userManager;

    public ClaimController(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost]
    [Route("AddClaimToUser")]
    //[Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> AddClaimToUser(
        string claimType,
        string claimValue,
        string userId
    )
    {
        IdentityResult result = await _userManager.AddClaimAsync(
            await _userManager.FindByIdAsync(userId),
            new System.Security.Claims.Claim(claimType, claimValue, ClaimValueTypes.String)
        );

        if (result.Succeeded)
        {
            return Ok(new Response { Status = "Success", Message = "Claim added successfully" });
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

    [HttpPost]
    [Route("DeleteClaimFromUser")]
    // [Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> DeleteClaimFromUser(
        string claimType,
        string claimValue,
        string claimIssuer,
        string userId
    )
    {
        IdentityResult result = await _userManager.RemoveClaimAsync(
            await _userManager.FindByIdAsync(userId),
            new Claim(claimType, claimValue, ClaimValueTypes.String, claimIssuer)
        );
        if (result.Succeeded)
        {
            return Ok();
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
}
