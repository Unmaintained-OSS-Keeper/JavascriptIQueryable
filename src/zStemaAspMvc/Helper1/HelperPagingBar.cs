using System;
using System.Web;
using System.Web.Routing;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web.Mvc.Html;
using System.Web.Mvc;
using System.Linq;
using System.Text;

using StemaAspMvc;

namespace System.Web.Mvc.Html
{
    public static class HelperPagingBar
    {
        public static string PagingBar(this HtmlHelper helper, string route, string action,
                         string controller, string textprev, string textnext)
        {
            StringBuilder sb = new StringBuilder();
            PagingObject data1 = (PagingObject)helper.ViewData["*#PagingData#*"];
            if ( data1 == null )
                return "";
            string where = (string)helper.ViewData["*#WhereData#*"];
            if (data1.HasPrev == true)
            {               
                RequestContext ctx = helper.ViewContext.RequestContext;
                RouteCollection list = helper.RouteCollection;
                RouteValueDictionary param = new RouteValueDictionary();
                param.Add("page", data1.NumPage - 1);
                param.Add("param", where);
                string link = HtmlHelper.GenerateLink(ctx, list, textprev, route,
                                 action, controller, param, null);
                sb.Append(link);
            }
            else sb.Append(textprev);
            sb.Append("&nbsp;&nbsp;&nbsp;");
            if (data1.HasNext == true)
            {
                RequestContext ctx = helper.ViewContext.RequestContext;
                RouteCollection list = helper.RouteCollection;
                RouteValueDictionary param = new RouteValueDictionary();
                param.Add("page", data1.NumPage + 1);
                param.Add("param", where);
                string link = HtmlHelper.GenerateLink(ctx, list, textnext, route,
                                 action, controller, param, null);
                sb.Append(link);
            }
            else sb.Append(textnext);
            return sb.ToString();
        }
    }
}