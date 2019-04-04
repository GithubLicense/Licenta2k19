using System;
using System.Collections.Generic;
using BusinessLogic.Abstractions;
using DataAccess.Abstractions;
using Entities;
using Models;

namespace BusinessLogic.Implementations
{
    public class CourseManagementLogic : BaseLogic, ICourseManagementLogic
    {
        public CourseManagementLogic(IRepository repository)
            : base(repository)
        {

        }

        public CourseManagement Create(CourseManagementDto courseManagementDto)
        {
            var newCourse = new CourseManagement()
            {
                CourseId = courseManagementDto.CourseId,
                UserId = courseManagementDto.UserId,
            };

            _repository.Insert(newCourse);
            _repository.Save();

            return newCourse;
        }

        public CourseManagement Update(CourseManagementDto courseManagementDto, Guid courseManagementId)
        {
            var courseManagement = _repository.GetLastByFilter<CourseManagement>(c => c.Id == courseManagementId);

            if (courseManagement == null)
            {
                return null;
            }

            courseManagement.CourseId = courseManagementDto.CourseId;
            courseManagement.UserId = courseManagementDto.UserId;

            _repository.Update(courseManagement);
            _repository.Save();

            return courseManagement;
        }

        public CourseManagement Delete(Guid courseManagementId)
        {
            var courseManagement = _repository.GetLastByFilter<CourseManagement>(c => c.Id == courseManagementId);

            if (courseManagement == null)
            {
                return null;
            }

            _repository.Delete(courseManagement);
            _repository.Save();

            return courseManagement;
        }

        public CourseManagementDto GetById(Guid courseManagementId)
        {
            var courseManagement = _repository.GetLastByFilter<CourseManagement>(c => c.Id == courseManagementId);

            if (courseManagement == null)
            {
                return null;
            }

            var courseManagementDto = new CourseManagementDto()
            {
                CourseId = courseManagement.CourseId,
                UserId = courseManagement.UserId,
            };

            return courseManagementDto;
        }

        public ICollection<CourseManagementDto> GetAll()
        {
            List<CourseManagementDto> courseManagementDtos = new List<CourseManagementDto>();

            var courseManagements = _repository.GetAll<CourseManagement>();

            foreach (var courseManagement in courseManagements)
            {
                var courseManagementDto = new CourseManagementDto
                {
                    CourseId = courseManagement.CourseId,
                    UserId = courseManagement.UserId,
                };

                courseManagementDtos.Add(courseManagementDto);

            }


            return courseManagementDtos;
        }
    }
}
