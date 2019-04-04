using FluentValidation;
using Models;

namespace BusinessLogic.Validators
{
    class CourseManagementValidator : AbstractValidator<CourseManagementDto>
    {

        public CourseManagementValidator()
        {
            RuleFor(managementDto => managementDto.CourseId)
                .NotEmpty()
                .NotNull()
                .Must(BaseValidator.IsGuid);

            RuleFor(managementDto => managementDto.UserId)
                .NotEmpty()
                .NotNull()
                .Must(BaseValidator.IsGuid);
        }

    }
}
