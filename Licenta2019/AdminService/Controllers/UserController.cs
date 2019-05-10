using BusinessLogic.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace AdminService.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/users")]
    public class UserController: ControllerBase
    {
        private readonly IUserLogic _userLogic;

        public UserController(IUserLogic userLogic)
        {
            _userLogic = userLogic;
        }

        [HttpPost("students")]
        public IActionResult RegisterStudent([FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _userLogic.CreateStudent(userDto);

            var userInformationDto = new UserInformationsDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName
            };

            return Ok(userInformationDto);
        }

        [HttpPost("teachers")]
        public IActionResult RegisterTeacher([FromBody] TeacherDto teacherDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _userLogic.CreateTeacher(teacherDto);

            var userInformationDto = new UserInformationsDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName
            };

            return Ok(userInformationDto);
        }


    }
}
