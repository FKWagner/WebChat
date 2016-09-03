using Microsoft.AspNetCore.Mvc;

namespace WebChat2.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
