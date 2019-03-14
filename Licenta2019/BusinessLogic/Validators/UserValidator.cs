using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Validators
{
    using FluentValidation;

    using Models;
    public class UserValidator : AbstractValidator<UserDto>
    {
        public UserValidator()
        {
            RuleFor(user => user.Email)
                .NotEmpty()
                .NotNull()
                .EmailAddress().WithMessage("A valid email is required");

            RuleFor(user => user.FirstName)
                .NotEmpty()
                .NotNull()
                .Length(1, 25);

            RuleFor(user => user.LastName)
                .NotEmpty()
                .NotNull()
                .Length(1, 25);

            //RuleFor(user => user.Password)
            //    .NotEmpty()
            //    .NotNull()
            //    .MinimumLength(6);
        }
    }
}
