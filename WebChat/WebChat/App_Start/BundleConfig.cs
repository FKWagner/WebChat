using System.Web;
using System.Web.Optimization;

namespace WebChat
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/react").Include(
                      "~/Scripts/react-15.1.0.js"));
            bundles.Add(new ScriptBundle("~/bundles/react-dom").Include(
                      "~/Scripts/react-dom-15.1.0.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/site.css"));

            // Include the generated Bootstrap.css
            bundles.Add(new StyleBundle("~/Content/css").Include(
                       "~/Content/bootstrap.css"));
        }
    }
}

