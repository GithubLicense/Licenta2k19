using System;
using System.Collections.Generic;

namespace BusinessLogic.Abstractions
{
    using Entities;

    using Models;

    public interface IUserLogic
    {
        User Authenticate(string email, string password);

        IEnumerable<UserInformationsDto> GetAll();

        UserInformationsDto GetById(Guid id);

        User Create(SignUpUserDto user, string password);

        User CreateStudent(UserDto user);
    }
}
