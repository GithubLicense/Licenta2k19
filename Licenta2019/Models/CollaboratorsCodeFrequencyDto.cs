using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class CollaboratorsCodeFrequencyDto
    {
        public string Username { get; set; }

        public ICollection<CodeFrequencyDto> userCodeFrequency { get; set; }
    }
}
