using FluentValidation;
using Models;

namespace BusinessLogic.Validators
{
    public class CourseValidator : AbstractValidator<CourseDto>
    {
        public CourseValidator()
        {
            RuleFor(courseDto => courseDto.Name)
                .NotEmpty()
                .NotNull()
                .Length(1, 35);

            RuleFor(courseDto => courseDto.Semester)
                .NotEmpty()
                .NotNull()
                .InclusiveBetween(1, 2);

            RuleFor(courseDto => courseDto.Year)
                .NotEmpty()
                .NotNull()
                .InclusiveBetween(1, 3);
        }
    }
}
