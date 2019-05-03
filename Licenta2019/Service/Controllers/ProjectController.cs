﻿using System;
using BusinessLogic.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Service.Controllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Route("api/v{version:apiVersion}/profile")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectLogic _projectLogic;

        public ProjectController(IProjectLogic projectLogic)
        {
            _projectLogic = projectLogic;
        }

        [HttpPost("{courseId:guid}/add-project")]
        public IActionResult Create([FromBody] ProjectDto projectDto, [FromRoute] Guid courseId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newProject = _projectLogic.Create(projectDto, courseId);

            return Ok();

            //return CreatedAtAction(nameof(GetById), new { courseId = newCourse.Id }, courseDto);
        }

        [HttpPost("{courseId:guid}/projects/{projectId:guid}/assign")]
        public IActionResult AddTeam([FromBody] TeamDto teamDto, [FromRoute] Guid projectId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newTeam = _projectLogic.CreateTeam(teamDto, projectId);

            return Ok();
        }

        [HttpPost("{courseId:guid}/projects/{projectId:guid}/teams/{teamId:guid}")]
        public IActionResult AddEvaluation([FromBody] EvalutionDto evalutionDto, [FromRoute] Guid teamId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newTeam = _projectLogic.CreateEvaluation(evalutionDto, teamId);

            return Ok();
        }

        [HttpGet("{courseId:guid}/projects/{projectId:guid}/teams")]
        public IActionResult GetTeams([FromRoute] Guid projectId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var teams = _projectLogic.GetTeamsByProjectId(projectId);

            return Ok(teams);
        }

        [HttpGet("{courseId:guid}/projects")]
        public IActionResult GetById([FromRoute] Guid courseId)
        {
            var result = _projectLogic.GetByCourseId(courseId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("{courseId:guid}/projects/{projectId:guid}")]
        public IActionResult GetByProjectId([FromRoute] Guid projectId)
        {
            var result = _projectLogic.GetByProjectId(projectId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("{courseId:guid}/projects/{projectId:guid}/year")]
        public IActionResult GetProjectId([FromRoute] Guid projectId)
        {
            var result = _projectLogic.GetProjectYear(projectId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}
