using System;
using System.Web;
using System.Web.Routing;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web.Mvc.Html;
using System.Web.Mvc;
using System.Linq;
using System.Text;

namespace StemaAspMvc
{
    public static class HelpUtil
    {
        public static int GetPageNum(ViewDataDictionary viewdata)
        {
            PagingObject data = (PagingObject)viewdata["*#PagingData#*"];
            return data.NumPage;
        }

        public static int GetPageNum(HttpRequest request)
        {
            RouteValueDictionary tab = request.RequestContext.RouteData.Values;
            return Convert.ToInt32((string)tab["page"]);
        }

        public static int GetPageNum(HttpRequestBase request)
        {
            RouteValueDictionary tab = request.RequestContext.RouteData.Values;
            return Convert.ToInt32((string)tab["page"]);
        }

        public static string GetWhere(ViewDataDictionary viewdata)
        {
            return (string)viewdata["*#WhereData#*"];
        }

        public static string GetWhere(HttpRequest request)
        {
            RouteValueDictionary tab = request.RequestContext.RouteData.Values;
            return (string)tab["page"];
        }

        public static string GetWhere(HttpRequestBase request)
        {
            RouteValueDictionary tab = request.RequestContext.RouteData.Values;
            return (string)tab["page"];
        }

        public static string GetUrlParam(HttpRequest request, string name)
        {
            RouteValueDictionary tab = request.RequestContext.RouteData.Values;
            return (string)tab[name];
        }

        public static string GetUrlParam(HttpRequestBase request, string name)
        {
            RouteValueDictionary tab = request.RequestContext.RouteData.Values;
            return (string)tab[name];
        }

        public static MvcHtmlString EditorFor<TModel, TValue>(this HtmlHelper<TModel> html, 
       Expression<Func<TModel, TValue>> expression, string templateName, int leng, int size)
        {
            return html.EditorFor(expression, templateName, new {
              Leng = leng.ToString(), Size = size.ToString()});
        }
    }
}