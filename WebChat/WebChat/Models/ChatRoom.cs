using System.Collections.Generic;

namespace WebChat.Models
{
    public class ChatRoom
    {
        public int ChatRoomId { get; set; }

        public string ChatRoomName { get; set; }

        public List<ChatMessage> ChatMessages { get; set; }

    }
}