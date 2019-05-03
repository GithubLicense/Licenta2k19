using Entities;
using Models;
using System;
using System.Collections.Generic;

namespace BusinessLogic.Abstractions
{
    public interface IEmailLogic
    {
        Email Create(EmailDto emailDto);

        EmailDto GetById(Guid emailId);

        ICollection<EmailDto> GetAll();
    }
}
