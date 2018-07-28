using System;
using System.Web;
using System.Web.Mvc;
using Microsoft.Practices.Unity;
using System.Collections.Generic;
using System.Web.Routing;
using System.Linq;

using JQueryLinq;
using Data.DALef40;
using StemaAspBase;
using StemaCore;

namespace Application1
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // -------------------------      

            routes.MapRoute(
                "Grid01", // Route name
                "Grid1/Index", // URL with parameters
                new { controller = "Grid1", action = "Index" }
            );

            routes.MapRoute(
                "Grid02", // Route name
                "Grid2/Index", // URL with parameters
                new { controller = "Grid2", action = "Index" } 
           );
            
            // -------------------------      

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            IUnityContainer factory = UnityFactory.GetInstance();
            //DependencyResolver.SetResolver(new UnityDependencyResolver(factory));
            UnityContext unity = new UnityContext(factory);
            IocContext.Current = (IIocContext)unity;

            //AddPathView();
        }

        private void AddPathView()
        {
            RazorViewEngine viewEngine = ViewEngines.Engines.OfType<RazorViewEngine>().FirstOrDefault();
            string[] partialViewLocationFormats = viewEngine.PartialViewLocationFormats;
            List<string> newPartialViewLocationFormats = new List<string>(partialViewLocationFormats);
            newPartialViewLocationFormats.Add("~/Views/View/{0}.cshtml");
            newPartialViewLocationFormats.Add("~/Views/View/{0}.vbhtml");
            viewEngine.PartialViewLocationFormats = newPartialViewLocationFormats.ToArray();
        }
    }
}