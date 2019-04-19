using System;
using System.Collections.Generic;

namespace BusinessLogic.Abstractions
{
    using Entities;

    using Models;

    public interface IUserLogic
    {
        User Authenticate(string email, string password);

        ICollection<UserInformationsDto> GetAll();

        ICollection<UserInformationsDto> GetAllByYear(string year);

        UserInformationsDto GetById(Guid id);

        User Create(SignUpUserDto user, string password);

        User CreateStudent(UserDto user);
    }
}
