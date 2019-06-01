using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class CodeFrequencyDto
    {
        public DateTime Day { get; set; }

        public int Additions { get; set; }

        public int Deletions { get; set; }
    }
}
