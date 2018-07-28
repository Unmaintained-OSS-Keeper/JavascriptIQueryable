using System;
using System.Web;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using System.IO;
using StemaAspBase;

namespace StemaAspMvc
{
    public class BaseController : Controller
    {
        public BaseController() 
        {

        }

        public string RenderPartialViewToString(string viewName, object model)
        {
            if (string.IsNullOrEmpty(viewName) == true)
                viewName = ControllerContext.RouteData.GetRequiredString("action");
            ViewData.Model = model;
            using (StringWriter sw = new StringWriter())
            {
                ViewEngineResult viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
                ViewContext viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);
                return (string)sw.GetStringBuilder().ToString();
            }
        }

        public RedirectToRouteResult RedirectToPage(string action,
                     Nullable<int> page, string param)
        {
            if ( page.HasValue == false )
                page = 1;
            return RedirectToAction(action, new { page = page, param = param });
        }

        public T CreateWhereParam<T>(string param, bool pflag) where T : BaseFormSearch, new()
        {
            T form = new T();
            CreateWhereParam(form, param, pflag);
            return form;
        }

        public void CreateWhereParam(BaseFormSearch form, string param, bool pflag)
        {
            ViewData["*#WhereData#*"] = null;
            if ( pflag == true )
            {
                form.SetParam(param);
                if ( form.HasRequest == false )
                    return;
            }
            ViewData["*#WhereData#*"] = param;
        }

        public PagingObject CreatePaging(int numpage, int size)
        {
            PagingObject data = new PagingObject(numpage, size);
            ViewData["*#PagingData#*"] = data;
            return data;
        }       
    }
}