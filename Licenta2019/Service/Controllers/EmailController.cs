using BusinessLogic.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Models;
using System;
using System.Collections.Generic;

namespace Service.Controllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Route("api/v{version:apiVersion}/emails")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailLogic _emailLogic;

        public EmailController(IEmailLogic emailLogic)
        {
            _emailLogic = emailLogic;
        }

        [HttpPost]
        public IActionResult Create([FromBody] EmailDto emailDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var email = _emailLogic.Create(emailDto);

            return CreatedAtAction(nameof(GetById), new { emailId = email.Id }, emailDto);
        }

        [HttpGet("{emailId:guid}")]
        public IActionResult GetById([FromRoute] Guid emailId)
        {
            var result = _emailLogic.GetById(emailId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet]
        public ICollection<EmailDto> GetAll()
        {
            var emails = _emailLogic.GetAll();

            return emails;
        }
    }
}
