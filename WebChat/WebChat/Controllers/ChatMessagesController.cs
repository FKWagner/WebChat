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
using Microsoft.AspNet.Identity;

namespace WebChat.Controllers
{
    public class ChatMessagesController : Controller
    {
        private WebChatContext db = new WebChatContext();

        // GET: ChatMessages
        public async Task<ActionResult> Index()
        {
            return View(await db.ChatMessages.ToListAsync());
        }

        // GET: ChatMessages/Details/5
        public async Task<ActionResult> Details(int? id)
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

        // GET: ChatMessages/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ChatMessages/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "ChatMessageID,DateTime,SequenceNumber")] ChatMessage chatMessage)
        {
            if (ModelState.IsValid)
            {
                db.ChatMessages.Add(chatMessage);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(chatMessage);
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
