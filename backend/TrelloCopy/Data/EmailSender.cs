using Microsoft.AspNetCore.Identity.UI.Services;
using System.Net.Mail;
using System.Net;

namespace TrelloCopy.Data
{
    public class EmailSender : IEmailSender
    {



        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            using (SmtpClient client = new SmtpClient()
            {
                Host = "smtp.office365.com",
                Port = 587,
                UseDefaultCredentials = false,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential("sesa99@stud.uni-obuda.hu", "Werter99"),
                TargetName = "STARTTLS/smtp.office365.com",
                EnableSsl = true
                })
            {
                MailMessage message = new MailMessage()
                {
                    From = new MailAddress("sesa99@stud.uni-obuda.hu"),
                    Subject = subject,
                    IsBodyHtml = true,
                    Body = htmlMessage,
                    BodyEncoding = System.Text.Encoding.UTF8,
                    SubjectEncoding = System.Text.Encoding.UTF8,
                };
                message.To.Add(email);
                try
                {
                    client.Send(message);
                }
                catch (Exception ex)
                {
                }
            }
            return Task.CompletedTask;
        }
    }

}


