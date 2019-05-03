namespace Models
{
    public class EmailDto : BaseDto
    {
        public string Subject { get; set; }

        public string Body { get; set; }

        public string Receiver { get; set; }
    }
}
