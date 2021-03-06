﻿using BusinessLogic.Abstractions;
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

        public ICollection<Email> Create(Guid userId, EmailDto emailDto)
        {
            ICollection<Email> emails = new List<Email>();

            var user = _repository.GetLastByFilter<User>(c => c.Id == userId);

            string body = "The student, " + user.FirstName + " " + user.LastName + " wants to send you this message:" +
                          Environment.NewLine + emailDto.Body;

            SendEmail(emailDto.Teachers, emailDto.Subject, body);

            foreach (var teacher in emailDto.Teachers)
            {
                var newEmail = new Email
                {
                    Body = emailDto.Body,
                    Receiver = teacher,
                    Subject = emailDto.Subject
                };

                _repository.Insert(newEmail);
                _repository.Save();

                emails.Add(newEmail);
            }

            return emails;
        }

        public EmailDto GetById(Guid emailId)
        {
            var email = _repository.GetLastByFilter<Email>(e => e.Id == emailId);

            var emailDto = new EmailDto
            {
                Body = email.Body,
                Teachers = new[] { email.Receiver },
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
                    Teachers = new []{email.Receiver},
                    Subject = email.Subject
                };

                emailDtos.Add(emailDto);
            }

            return emailDtos;
        }

        public void SendEmail(ICollection<string> teachers, string subject, string body)
        {
            foreach (var teacher in teachers)
            {
                SmtpClient client = new SmtpClient();
                client.Host = "127.0.0.1";
                client.Port = 1925;
                client.EnableSsl = false;
                client.Timeout = 10000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("fii.project.keeper@gmail.com", "a1zs2xd3c");
                MailMessage mail = new MailMessage("fii.project.keeper@gmail.com", teacher);
                mail.Subject = subject;
                mail.Body = body;
                mail.BodyEncoding = Encoding.UTF8;
                mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                client.Send(mail);
                mail.Dispose();
            }
            
        }
    }
}
