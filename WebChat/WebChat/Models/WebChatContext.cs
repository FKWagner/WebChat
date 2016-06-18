using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebChat.Models
{
    public class WebChatContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public WebChatContext() : base("name=WebChatContext")
        {
        }

        public System.Data.Entity.DbSet<WebChat.Models.ChatRoom> ChatRooms { get; set; }

        public System.Data.Entity.DbSet<WebChat.Models.User> Users { get; set; }

        public System.Data.Entity.DbSet<WebChat.Models.ChatMessage> ChatMessages { get; set; }
    }
}
