using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Abstractions
{
    using Entities;

    using Models;

    public interface IUserLogic
    {
        User Authenticate(string email, string password);

        IEnumerable<UserInformationsDto> GetAll();

        UserInformationsDto GetById(Guid id);

        User Create(UserDto user, string password);
    }
}
