﻿using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using EmailService.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System;

namespace webapi.Controllers
{
    [EnableCors("MyCorsPolicy")]
    [ApiController]
    [Route("api/[controller]")]

    public class EmailController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public EmailController(IConfiguration configuration)
        {
            this.configuration = configuration;
            
        }
        

        [HttpPost]
        public async Task<IActionResult> RequestPasswordReset([FromBody] EmailDataModel emailData)
        {
            try
            {
                string smtpServer = configuration["EmailSettings:stServidor"];
                int smtpPort = configuration.GetValue<int>("EmailSettings:stPuerto");
                string smtpUsername = configuration["EmailSettings:stUsuario"];
                string smtpPassword = configuration["EmailSettings:stPassword"];


                // Validar el correo electrónico aquí si es necesario.

                // Generar un token de restablecimiento de contraseña si es válido.
                string resetToken = GenerateResetToken();

                // Envía el correo electrónico de restablecimiento de contraseña.
                await SendPasswordResetEmail(emailData.emailData, resetToken, smtpServer, smtpPort, smtpUsername, smtpPassword);

                // Devuelve una respuesta exitosa al cliente.
                return Ok(new { message = "Solicitud de restablecimiento de contraseña enviada con éxito" });
            }
            catch (Exception ex)
            {
                // Maneja los errores y devuelve una respuesta de error al cliente.
                return StatusCode(500, new { message = $"Error al enviar la solicitud de restablecimiento de contraseña: {ex.Message}" });
            }
        }

        private string GenerateResetToken()
        {
            // Implementa lógica para generar un token de restablecimiento de contraseña aquí.
            return Guid.NewGuid().ToString();
        }

        private async Task SendPasswordResetEmail(string email, string resetToken, string smtpServer, int smtpPort, string smtpUsername, string smtpPassword)
        {
            using (SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort))
            {
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);

                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(smtpUsername);
                mailMessage.To.Add(email);

                mailMessage.Subject = "Solicitud de Restablecimiento de Contraseña";
                mailMessage.Body = $@"
                <html>
                    <body>
                        <h2 style='color: black;'> Reset Password </h2>
                        <p style='color: black;'> We have sent you this email in response to your request to reset your password.</p>
                        <p style='color: black;'>To reset your password for AcmeRooms, please follow the link below:</p>
                        <p> <a href = 'http://localhost:4200/password-reset?token={resetToken}'> Reset Password </a> </p>
                        <img src='https://i.imgur.com/m6AVggz.png' alt='eslogan-acme' />
                    </body>
                </html>
            ";

                // Establecer el tipo de contenido del cuerpo del mensaje como HTML
                mailMessage.IsBodyHtml = true;


                await smtpClient.SendMailAsync(mailMessage);
            }
        }


        
    }
}

