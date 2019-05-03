using BusinessLogic.Abstractions;
using DataAccess.Abstractions;
using Entities;
using Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace BusinessLogic.Implementations
{
    public class EmailLogic : BaseLogic, IEmailLogic
    {
        public EmailLogic(IRepository repository)
            : base(repository)
        {
        }

        public Email Create(EmailDto emailDto)
        {
            SendEmail(emailDto.Receiver, emailDto.Subject, emailDto.Body);
            var newEmail = new Email
            {
                Body = emailDto.Body,
                Receiver = emailDto.Receiver,
                Subject = emailDto.Subject
            };

            _repository.Insert(newEmail);
            _repository.Save();

            return newEmail;
        }

        public EmailDto GetById(Guid emailId)
        {
            var email = _repository.GetLastByFilter<Email>(e => e.Id == emailId);

            var emailDto = new EmailDto
            {
                Body = email.Body,
                Receiver = email.Receiver,
                Subject = email.Subject
            };

            return emailDto;
        }

        public ICollection<EmailDto> GetAll()
        {
            List<EmailDto> emailDtos = new List<EmailDto>();

            var emails = _repository.GetAll<Email>();

            foreach (var email in emails)
            {
                var emailDto = new EmailDto
                {
                    Body = email.Body,
                    Receiver = email.Receiver,
                    Subject = email.Subject
                };

                emailDtos.Add(emailDto);
            }

            return emailDtos;
        }

        public void SendEmail(string receiver, string subject, string body)
        {
            SmtpClient client = new SmtpClient();
            client.Host = "127.0.0.1";
            client.Port = 1925;
            client.EnableSsl = false;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("learningsmart211@gmail.com", "q1w2e3r4t5!");
            MailMessage mail = new MailMessage("learningsmart211@gmail.com", receiver);
            mail.Subject = subject;
            mail.Body = body;
            mail.BodyEncoding = Encoding.UTF8;
            mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
            client.Send(mail);
            mail.Dispose();
        }
    }
}
