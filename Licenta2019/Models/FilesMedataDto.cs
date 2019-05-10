using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class FilesMetadataDto
    {
        public Guid EntityId { get; set; }
        public Guid CourseId { get; set; }
        public string Path { get; set; }
        public string FileName { get; set; }
    }
}
