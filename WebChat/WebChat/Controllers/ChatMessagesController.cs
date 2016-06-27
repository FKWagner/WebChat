using System;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web.Mvc;
using WebChat.Models;
using Microsoft.AspNet.Identity;
using System.Web;
using Microsoft.AspNet.Identity.Owin;

namespace WebChat.Controllers
{
    [Authorize]
    public class ChatMessagesController : Controller
    {
        private WebChatContext db = new WebChatContext();

        // GET: ChatMessages
        [Route("ChatMessages/{Room:int}")]
        public async Task<ActionResult> Index(int? Room)
        {
            ChatRoom ChatRoom = db.ChatRooms.Find(Room);

            var ChatMessages = from s in db.ChatMessages
                               orderby s.SequenceNumber descending
                               select new { s.ChatMessageID, s.DateTime, s.Message, s.SequenceNumber };
            //ChatMessages = ChatMessages.OrderByDescending(s => s.SequenceNumber);
            //ChatMessages = ChatMessages.Where(s => s.ChatRoom is ChatRoom);

            return Json(await ChatMessages.ToListAsync(), JsonRequestBehavior.AllowGet);
        }

        // POST: ChatMessages/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(true)]
        public async Task<ActionResult> Create(ChatMessage chatMessage)
        {
            //var errors = ModelState.Values.SelectMany(v => v.Errors);
            if (ModelState.IsValid)
            {
                int Room;
                if (!int.TryParse(Request.Form.Get("ChatRoomID"), out Room))
                    Json("Error : ChatRoomID must be present");

                chatMessage.ChatRoom = db.ChatRooms.Find(Room);
                chatMessage.SequenceNumber = db.ChatMessages.Where(s => s.ChatRoom.ChatRoomId == Room).Count() + 1;
                chatMessage.DateTime = DateTime.UtcNow;
                chatMessage.User = db.Users.Find(System.Web.HttpContext.Current.User.Identity.GetUserId());

                var test = ModelState.IsValidField("ChatMessageID");
                db.ChatMessages.Add(chatMessage);
                await db.SaveChangesAsync();
                return Content("Success :)");
            }

            return Json("Error :");
        }

        // GET: ChatMessages/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ChatMessage chatMessage = await db.ChatMessages.FindAsync(id);
            if (chatMessage == null)
            {
                return HttpNotFound();
            }
            return View(chatMessage);
        }

        // POST: ChatMessages/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "ChatMessageID,DateTime,SequenceNumber")] ChatMessage chatMessage)
        {
            if (ModelState.IsValid)
            {
                db.Entry(chatMessage).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(chatMessage);
        }

        // GET: ChatMessages/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ChatMessage chatMessage = await db.ChatMessages.FindAsync(id);
            if (chatMessage == null)
            {
                return HttpNotFound();
            }
            return View(chatMessage);
        }

        // POST: ChatMessages/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            ChatMessage chatMessage = await db.ChatMessages.FindAsync(id);
            db.ChatMessages.Remove(chatMessage);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
