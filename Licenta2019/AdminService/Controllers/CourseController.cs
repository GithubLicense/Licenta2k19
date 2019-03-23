using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogic.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace AdminService.Controllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Route("api/v{version:apiVersion}/courses")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseLogic _courseLogic;

        public CourseController(ICourseLogic courseLogic)
        {
            _courseLogic = courseLogic;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CourseDto courseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCourse = _courseLogic.Create(courseDto);

            return CreatedAtAction(nameof(GetById), new {courseId = newCourse.Id}, courseDto);
        }

        [HttpPut("{courseId:guid}")]
        public IActionResult Update([FromBody] CourseDto courseDto, [FromRoute] Guid courseId)
        {
            var result = _courseLogic.Update(courseDto, courseId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpDelete("{courseId:guid}")]
        public IActionResult Delete([FromRoute] Guid courseId)
        {
            var result = _courseLogic.Delete(courseId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("{courseId:guid}")]
        public IActionResult GetById([FromRoute] Guid courseId)
        {
            var result = _courseLogic.GetById(courseId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet]
        public ICollection<CourseDto> GetAll()
        {
            var courses = _courseLogic.GetAll();

            return courses;
        }

    }
}
