using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebChat.Models
{
    public class ChatMessage
    {
        public int ChatMessageID { get; set; }

        public ChatRoom ChatRoom { get; set; }

        public User User { get; set; }

        public DateTime DateTime { get; set; }

        public int SequenceNumber { get; set; }
    }
}