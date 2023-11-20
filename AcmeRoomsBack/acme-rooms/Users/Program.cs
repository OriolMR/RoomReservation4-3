using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Users.Data;
using Users.Areas.Identity.Data;
using System.Security.Claims;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("UsersContextConnection") 
    ?? throw new InvalidOperationException("Connection string 'UsersContextConnection' not found.");

builder.Services.AddDbContext<UsersDbContext>(
    options => options.UseSqlServer(connectionString)
);

builder.Services
    .AddIdentity<IdentityUser, IdentityRole>(options => {
        options.User.AllowedUserNameCharacters = null;
    })
    .AddEntityFrameworkStores<UsersDbContext>()
    .AddDefaultTokenProviders()
    .AddRoles<IdentityRole>(); 


builder.Services.AddDbContext<UsersDbContext>(
    options => options.UseSqlServer(connectionString)
);

//builder.Services
//    .AddIdentity<IdentityUser, IdentityRole>(options => {
//        options.User.AllowedUserNameCharacters = null;
//    })
//    .AddEntityFrameworkStores<UsersDbContext>()
//    .AddDefaultTokenProviders()
//    .AddRoles<IdentityRole>();



// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();