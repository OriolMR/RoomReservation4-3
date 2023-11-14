using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using System.Security.Cryptography.X509Certificates;

namespace AuthorizationServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            
            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
                             {
                                  options.LoginPath = "/account/login";
                             });

            builder.Services.AddDbContext<DbContext>(options =>
            {
                // Configure the context to use an in-memory store.
                options.UseInMemoryDatabase(nameof(DbContext));

                // Register the entity sets needed by OpenIddict.
                options.UseOpenIddict();
            });

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

            builder.Services.AddControllersWithViews();

            builder.Services.AddOpenIddict()

                    // Register the OpenIddict core components.
                    .AddCore(options =>
                    {
                        // Configure OpenIddict to use the EF Core stores/models.
                        options.UseEntityFrameworkCore()
                            .UseDbContext<DbContext>();
                    })

                    // Register the OpenIddict server components.
                    .AddServer(options =>
                    {
                        options
                            .AllowAuthorizationCodeFlow()
                            .RequireProofKeyForCodeExchange();

                        options
                            .AllowClientCredentialsFlow();

                        options
                            .SetAuthorizationEndpointUris("/connect/authorize")
                            .SetTokenEndpointUris("/connect/token")
                            .SetUserinfoEndpointUris("/connect/userinfo");

                        // Encryption and signing of tokens
                        options
                            .AddEphemeralEncryptionKey()
                            .AddEphemeralSigningKey();

                        // Register scopes (permissions)
                        options.RegisterScopes("api");

                        // Register the ASP.NET Core host and configure the ASP.NET Core-specific options.
                        options
                            .UseAspNetCore()
                            .EnableTokenEndpointPassthrough()
                            .EnableAuthorizationEndpointPassthrough()
                            .EnableUserinfoEndpointPassthrough();

                        options.UseAspNetCore().DisableTransportSecurityRequirement();

                        options
                               .AddEphemeralEncryptionKey()
                               .AddEphemeralSigningKey()
                               .DisableAccessTokenEncryption();


                    });


            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHttpsRedirection();
            }

            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors("AllowAnyOrigin");

            app.UseAuthentication();

            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });

            app.MapControllers();
            app.Run();
        }
    }
}
