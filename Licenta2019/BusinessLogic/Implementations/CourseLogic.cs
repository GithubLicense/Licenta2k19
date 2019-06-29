using System;
using System.Collections.Generic;
using BusinessLogic.Abstractions;
using DataAccess.Abstractions;
using Entities;
using Models;

namespace BusinessLogic.Implementations
{
    public class CourseLogic : BaseLogic, ICourseLogic
    {
        public CourseLogic(IRepository repository) : base(repository)
        {
        }

        public Course Create(CourseDto courseDto)
        {
            var newCourse = new Course
            {
                Name = courseDto.Name,
                Semester = courseDto.Semester,
                Year = courseDto.Year
            };

            _repository.Insert(newCourse);
            _repository.Save();

            return newCourse;
        }

        public Course Update(CourseDto courseDto, Guid courseId)
        {
            var course = _repository.GetLastByFilter<Course>(c => c.Id == courseId);
            course.Name = courseDto.Name;
            course.Semester = courseDto.Semester;
            course.Year = courseDto.Year;

            _repository.Update(course);
            _repository.Save();

            return course;
        }

        public Course Delete(Guid courseId)
        {
            var course = _repository.GetLastByFilter<Course>(c => c.Id == courseId);

            _repository.Delete(course);
            _repository.Save();

            return course;
        }

        public CourseDto GetById(Guid courseId)
        {
            var course = _repository.GetLastByFilter<Course>(c => c.Id == courseId);

            if (course == null)
                return null;

            var courseDto = new CourseDto
            {
                Name = course.Name,
                Year = course.Year,
                Semester = course.Semester
            };

            return courseDto;
        }

        public ICollection<Course> GetByStudent(Guid userId)
        {
            var courseManagementDtos = _repository.GetAllByFilter<CourseManagement>(c => c.UserId == userId);

            ICollection<Course> courses = new List<Course>();

            foreach (var courseManagementDto in courseManagementDtos)
            {
                var course = _repository.GetLastByFilter<Course>(c => c.Id == courseManagementDto.CourseId);

                courses.Add(course);
            }

            return courses;
        }

        public ICollection<CourseDto> GetAll()
        {
            List<CourseDto> courseDtos = new List<CourseDto>();

            var courses = _repository.GetAll<Course>();

            foreach (var course in courses)
            {
                var courseDto = new CourseDto
                {
                    Id = course.Id,
                    Name = course.Name,
                    Year = course.Year,
                    Semester = course.Semester
                };

                courseDtos.Add(courseDto);
            }

            return courseDtos;
        }
    }
}
