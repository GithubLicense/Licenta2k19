﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Project : BaseEntity
    {
        public Guid CourseId { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string NumberOfMembers { get; set; }

        public string NumberOfTeams { get; set; }

        public string MaxGrade { get; set; }

        public string Description { get; set; }
    }
}
