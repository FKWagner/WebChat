using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;
using WebChat.Models;

namespace WebChat.Controllers
{
    [Authorize]
    public class ChatRoomsController : Controller
    {
        private WebChatContext db = new WebChatContext();

        // GET: ChatRooms
        [OutputCache(Location = System.Web.UI.OutputCacheLocation.None)]
        public ActionResult Index()
        {
            return Json(HttpStatusCode.Forbidden);
        }

    }
}
