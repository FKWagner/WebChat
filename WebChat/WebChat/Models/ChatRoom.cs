using System.Collections.Generic;

namespace WebChat.Models
{
    public class ChatRoom
    {
        public int ChatRoomId { get; set; }

        public List<ChatMessage> ChatMessages { get; set; }

        public List<User> Users { get; set; }

    }
}