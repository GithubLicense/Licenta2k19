using System.Collections.Generic;

namespace Models
{
    public class EmailDto : BaseDto
    {
        public string Subject { get; set; }

        public string Body { get; set; }

        public string[] Teachers { get; set; }
    }
}
