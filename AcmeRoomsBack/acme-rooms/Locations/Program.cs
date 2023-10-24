using System.Security.Claims;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
//using Org.BouncyCastle.Asn1.Ocsp;
using Locations.Data;
//using Localizaciones.Policies.Handlers;
//using Locations.Policies.Requirements;
//using Localizaciones.Services;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

builder.Services.AddDbContext<LocationsContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("LocationsContext") ?? throw new InvalidOperationException("Connection string 'LocationssContext' not found.")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "MyCorsPolicy",
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
    );
});
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
app.UseCors("MyCorsPolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();