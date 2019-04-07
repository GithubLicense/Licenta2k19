namespace Models
{
    public class CourseDto : BaseDto
    {
        public string Name { get; set; }

        public int Year { get; set; }

        public int Semester { get; set; }
    }
}
