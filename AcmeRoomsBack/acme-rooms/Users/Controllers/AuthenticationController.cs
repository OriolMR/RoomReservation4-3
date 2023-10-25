using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Usuarios.Models;

namespace Usuarios.Controllers;

[Route("api/[controller]")]
[ApiController]

public class AuthenticationController : Controller
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;

    public AuthenticationController(
        UserManager<IdentityUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration configuration
    )
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
    }

    private JwtSecurityToken GetToken(List<Claim> authClaims)
    {
        var authSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])
        );

        return new JwtSecurityToken(
            issuer: _configuration["Jwt:ValidIssuer"],
            audience: _configuration["Jwt:ValidAudience"],
            expires: DateTime.Now.AddHours(1),
            claims: authClaims,
            signingCredentials: new SigningCredentials(
                authSigningKey,
                SecurityAlgorithms.HmacSha512
            )
        );
    }

    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody] Usuarios.Models.LoginModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);

        if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
            {
                new(ClaimTypes.Email, user.Email),
                new("UserId", user.Id),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new(ClaimTypes.Role, userRole));
            }

            var token = GetToken(authClaims);

            return Ok(
                new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    //expiration = token.ValidTo
                    expiration = 60,
                    userId = user.Id,
                    email = user.Email,
                    phoneNumber = user.PhoneNumber,
                    claims = userRoles.ToArray()
                }
            );
        }

        return Unauthorized();
    }

    [HttpPost]
    [Route("Register")]
    public async Task<IActionResult> Register(
        [FromBody] Usuarios.Models.RegisterModel model
    )
    {
        var userExists = await _userManager.FindByNameAsync(model.UserName);
        if (userExists != null)
        {
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new Response { Status = "Error", Message = "User already exists." }
            );
        }

        IdentityUser user =
            new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.UserName
            };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
        {
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

        if (!await _roleManager.RoleExistsAsync(Models.UserRoles.User))
        {
            await _roleManager.CreateAsync(new IdentityRole(Models.UserRoles.User));
        }

        await _userManager.AddToRoleAsync(user, Models.UserRoles.User);

        return Ok(new Response { Status = "Success", Message = "User created successfully." });
    }

    [HttpPost]
    [Route("RegisterAdmin")]
    public async Task<IActionResult> RegisterAdmin(
        [FromBody] Usuarios.Models.RegisterModel model
    )
    {
        var userExists = await _userManager.FindByNameAsync(model.UserName);
        if (userExists != null)
        {
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new Response { Status = "Error", Message = "User already exists." }
            );
        }

        IdentityUser user =
            new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.UserName
            };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
        {
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

        if (!await _roleManager.RoleExistsAsync(Models.UserRoles.Admin))
        {
            await _roleManager.CreateAsync(new IdentityRole(Models.UserRoles.Admin));
        }

        await _userManager.AddToRoleAsync(user, Models.UserRoles.Admin);

        return Ok(new Response { Status = "Success", Message = "User created successfully." });
    }
}
