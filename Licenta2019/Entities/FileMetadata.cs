using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class FileMetadata : BaseEntity
    {
        public Guid CourseId { get; set; }
        public string FileName { get; set; }
        public string Path { get; set; }

    }
}
