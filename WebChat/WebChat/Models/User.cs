namespace WebChat.Models
{
    public class User
    {
        public int UserID { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }

        public string MailAddress { get; set; }

        public bool LoggedIn { get; set; }
    }
}