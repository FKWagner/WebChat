using System;

namespace WebChat.Models
{
    public class ChatMessage
    {
        public int ChatMessageID { get; set; }

        public ChatRoom ChatRoom { get; set; }

        public DateTime DateTime { get; set; }

        public int SequenceNumber { get; set; }

        public string Message { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}