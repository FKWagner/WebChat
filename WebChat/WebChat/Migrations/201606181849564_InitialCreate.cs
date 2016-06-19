namespace WebChat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ChatMessages",
                c => new
                    {
                        ChatMessageID = c.Int(nullable: false, identity: true),
                        DateTime = c.DateTime(nullable: false),
                        SequenceNumber = c.Int(nullable: false),
                        ChatRoom_ChatRoomId = c.Int(),
                        User_UserID = c.Int(),
                    })
                .PrimaryKey(t => t.ChatMessageID)
                .ForeignKey("dbo.ChatRooms", t => t.ChatRoom_ChatRoomId)
                .ForeignKey("dbo.Users", t => t.User_UserID)
                .Index(t => t.ChatRoom_ChatRoomId)
                .Index(t => t.User_UserID);
            
            CreateTable(
                "dbo.ChatRooms",
                c => new
                    {
                        ChatRoomId = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.ChatRoomId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Password = c.String(),
                        MailAddress = c.String(),
                        LoggedIn = c.Boolean(nullable: false),
                        ChatRoom_ChatRoomId = c.Int(),
                    })
                .PrimaryKey(t => t.UserID)
                .ForeignKey("dbo.ChatRooms", t => t.ChatRoom_ChatRoomId)
                .Index(t => t.ChatRoom_ChatRoomId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ChatMessages", "User_UserID", "dbo.Users");
            DropForeignKey("dbo.Users", "ChatRoom_ChatRoomId", "dbo.ChatRooms");
            DropForeignKey("dbo.ChatMessages", "ChatRoom_ChatRoomId", "dbo.ChatRooms");
            DropIndex("dbo.Users", new[] { "ChatRoom_ChatRoomId" });
            DropIndex("dbo.ChatMessages", new[] { "User_UserID" });
            DropIndex("dbo.ChatMessages", new[] { "ChatRoom_ChatRoomId" });
            DropTable("dbo.Users");
            DropTable("dbo.ChatRooms");
            DropTable("dbo.ChatMessages");
        }
    }
}
