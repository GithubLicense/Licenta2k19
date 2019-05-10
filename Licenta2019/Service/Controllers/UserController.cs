using System;

namespace Service.Controllers
{
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    using BusinessLogic.Abstractions;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    using Models;

    //[Authorize]
    [ApiController]
    [Route("api/v{version:apiVersion}")]
    public class UserController : ControllerBase
    {
        private readonly AppSettings _appSettings;

        private readonly IUserLogic _userLogic;

        public UserController(IUserLogic userLogic, IOptions<AppSettings> appSettings)
        {
            _userLogic = userLogic;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Authenticate([FromBody] UserAuthenticationDto userDto)
        {
            var user = _userLogic.Authenticate(userDto.Email, userDto.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                                                                           {
                                                                               new Claim(ClaimTypes.Name, user.Id.ToString())
                                                                           }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return Ok(new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                user.Year,
                user.Group,
                user.UserPosition,
                Token = tokenString
            });

        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] SignUpUserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _userLogic.Create(userDto, userDto.Password);

            var userInformationDto = new UserInformationsDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName
            };

            return Ok(userInformationDto);
        }


        [HttpGet("users")]
        public IActionResult GetAll()
        {
            var users = _userLogic.GetAll();
            return Ok(users);
        }

        [HttpGet("users/year/{year}")]
        public IActionResult GetAllByYear([FromRoute] string year)
        {
            var users = _userLogic.GetAllByYear(year);
            return Ok(users);
        }

        [HttpGet("users/{courseId}/teachers")]
        public IActionResult GetTeachersByCourse([FromRoute] Guid courseId)
        {
            var users = _userLogic.GetTeachersByCourseId(courseId);
            return Ok(users);
        }

        [HttpGet("users/{id}")]
        public IActionResult GetById([FromRoute] Guid id)
        {
            var user = _userLogic.GetById(id);
            return Ok(user);
        }
    }
}
