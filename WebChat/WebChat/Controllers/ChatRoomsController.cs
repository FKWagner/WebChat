using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebChat.Models;

namespace WebChat.Controllers
{
    public class ChatRoomsController : Controller
    {
        private WebChatContext db = new WebChatContext();

        // GET: ChatRooms
        public async Task<ActionResult> Index()
        {
            return View(await db.ChatRooms.ToListAsync());
        }

        // GET: ChatRooms/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ChatRoom chatRoom = await db.ChatRooms.FindAsync(id);
            if (chatRoom == null)
            {
                return HttpNotFound();
            }
            return View(chatRoom);
        }

        // GET: ChatRooms/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ChatRooms/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "ChatRoomId,ChatRoomName")] ChatRoom chatRoom)
        {
            if (ModelState.IsValid)
            {
                db.ChatRooms.Add(chatRoom);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(chatRoom);
        }

        // GET: ChatRooms/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ChatRoom chatRoom = await db.ChatRooms.FindAsync(id);
            if (chatRoom == null)
            {
                return HttpNotFound();
            }
            return View(chatRoom);
        }

        // POST: ChatRooms/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "ChatRoomId,ChatRoomName")] ChatRoom chatRoom)
        {
            if (ModelState.IsValid)
            {
                db.Entry(chatRoom).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(chatRoom);
        }

        // GET: ChatRooms/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ChatRoom chatRoom = await db.ChatRooms.FindAsync(id);
            if (chatRoom == null)
            {
                return HttpNotFound();
            }
            return View(chatRoom);
        }

        // POST: ChatRooms/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            ChatRoom chatRoom = await db.ChatRooms.FindAsync(id);
            db.ChatRooms.Remove(chatRoom);
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
