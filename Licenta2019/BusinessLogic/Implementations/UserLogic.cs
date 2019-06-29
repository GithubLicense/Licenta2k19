using System;
using System.Collections.Generic;

namespace BusinessLogic.Implementations
{
    using BusinessLogic.Abstractions;

    using DataAccess.Abstractions;

    using Entities;

    using Models;

    public class UserLogic : BaseLogic, IUserLogic
    {
        public UserLogic(IRepository repository)
           : base(repository)
        {
        }

        public User Authenticate(string email, string password)
        {
            var user = _repository.GetLastByFilter<User>(x => x.Email == email);
            if (user == null)
                return null;

            byte[] passwordHash = System.Convert.FromBase64String(user.PasswordHash);
            byte[] passwordSalt = System.Convert.FromBase64String(user.PasswordSalt);

            if (!VerifyPasswordHash(password, passwordHash, passwordSalt))
                return null;

            return user;
        }

        ICollection<UserInformationsDto> GetAll()
        {
            ICollection<UserInformationsDto> usersDtos = new List<UserInformationsDto>();

            var users = this._repository.GetAll<User>();

            foreach (var user in users)
            {
                var userDto = new UserInformationsDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Group = user.Group,
                    Year = user.Year
                };
                usersDtos.Add(userDto);
            }

            return usersDtos;
        }

        public ICollection<UserInformationsDto> GetAllByYear(string year)
        {
            ICollection<UserInformationsDto> usersDtos = new List<UserInformationsDto>();

            var users = _repository.GetAllByFilter<User>(c => Int32.Parse(c.Year) >= Int32.Parse(year) && c.UserPosition == UserPosition.Student);

            foreach (var user in users)
            {
                var userDto = new UserInformationsDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Group = user.Group,
                    Year = user.Year
                };
                usersDtos.Add(userDto);
            }

            return usersDtos;
        }

        public ICollection<Teacher> GetTeachersByCourseId(Guid courseId)
        {
            ICollection<Teacher> usersDtos = new List<Teacher>();
            var courseManagements = _repository.GetAllByFilter<CourseManagement>(c => c.CourseId == courseId);

            foreach (var courseManagement in courseManagements)
            {
                var user = _repository.GetLastByFilter<User>(c => c.Id == courseManagement.UserId);

                if (user.UserPosition == UserPosition.Teacher)
                {
                    var userDto = new Teacher()
                    {
                        Id = user.Id,
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName
                    };
                    usersDtos.Add(userDto);
                }
            }

            return usersDtos;
        }


        public UserInformationsDto GetById(Guid id)
        {
            var user = _repository.GetLastByFilter<User>(x => x.Id == id);

            var userDto = new UserInformationsDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
            };
            return userDto;
        }

        public User Create(SignUpUserDto userDto, string password)
        {
            var user = _repository.GetLastByFilter<User>(x => x.Email == userDto.Email);

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = System.Convert.ToBase64String(passwordHash);
            user.PasswordSalt = System.Convert.ToBase64String(passwordSalt);

            _repository.Update(user);
            _repository.Save();

            return user;
        }

        public User CreateAdmin(SignUpAdminDto userdto, string password)
        {

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            var user = new User
            {
                Email = userdto.Email,
                LastName = userdto.LastName,
                FirstName = userdto.FirstName,
                Group = "-",
                Year = "-",
                UserPosition = UserPosition.Admin,
                PasswordHash = System.Convert.ToBase64String(passwordHash),
                PasswordSalt = System.Convert.ToBase64String(passwordSalt)

            };

            _repository.Insert(user);
            _repository.Save();

            return user;
        }


        public User CreateStudent(UserDto userDto)
        {
            User user = new User
            {
                LastName = userDto.LastName,
                FirstName = userDto.FirstName,
                Email = userDto.Email,
                Year = userDto.Year,
                Group = userDto.Group,
                UserPosition = UserPosition.Student
            };

            _repository.Insert(user);
            _repository.Save();

            return user;
        }


        public User CreateTeacher(TeacherDto teacherDto)
        {
            User user = new User
            {
                LastName = teacherDto.LastName,
                FirstName = teacherDto.FirstName,
                Email = teacherDto.Email,
                Year = "-",
                Group = "-",
                UserPosition = UserPosition.Teacher
            };

            _repository.Insert(user);
            _repository.Save();

            return user;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            }

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            }

            if (storedHash.Length != 64)
            {
                throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            }

            if (storedSalt.Length != 128)
            {
                throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");
            }

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        ICollection<UserInformationsDto> IUserLogic.GetAll()
        {
            ICollection<UserInformationsDto> usersDtos = new List<UserInformationsDto>();

            var users = this._repository.GetAll<User>();

            foreach (var user in users)
            {
                var userDto = new UserInformationsDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Group = user.Group,
                    Year = user.Year
                };
                usersDtos.Add(userDto);
            }

            return usersDtos;
        }
    }
}
