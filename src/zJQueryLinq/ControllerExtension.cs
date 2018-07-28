using System;
using System.Web;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using System.IO;

namespace JQueryLinq
{
    public static class ControllerExtension
    {
        public static object TryApplyView(this Controller ctr, IRequestQuery req, object result)
        {
            dynamic data = (dynamic)result;
            string viewname = (string)ctr.Request.QueryString["view"];
            if (viewname != null)
            {
                string buffer = "";
                if (string.IsNullOrEmpty(viewname) == true)
                    viewname = ctr.ControllerContext.RouteData.GetRequiredString("action");
                ctr.ViewData.Model = data.rows;
                using (StringWriter sw = new StringWriter())
                {
                    ViewEngineResult viewResult = ViewEngines.Engines.FindPartialView(ctr.ControllerContext, viewname);
                    ViewContext viewContext = new ViewContext(ctr.ControllerContext, viewResult.View, ctr.ViewData, ctr.TempData, sw);
                    viewResult.View.Render(viewContext, sw);
                    buffer = (string)sw.GetStringBuilder().ToString();
                }
                result = req.ApplyView(data, buffer);
            }
            return result;
        }
    }
}
