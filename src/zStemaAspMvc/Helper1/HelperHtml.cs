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
    public static class HelperHtml
    {       
        public static MvcHtmlString EditorText<TModel, TValue>(this HtmlHelper<TModel> html, 
                  Expression<Func<TModel, TValue>> expression, int leng, int size)
        {
            return html.EditorFor(expression, "TextField1", new {Aleng = leng.
                         ToString(), Asize = size.ToString() });
        }

        public static MvcHtmlString EditorText<TModel, TValue>(this HtmlHelper<TModel> html,
             Expression<Func<TModel, TValue>> expression, int leng, int size,bool ronly)
        {
            return html.EditorFor(expression, "TextField2", new {Aleng = leng.
          ToString(), Asize = size.ToString() , Areadonly = ronly.ToString() });
        }

        public static MvcHtmlString TextField<TModel, TValue>(this HtmlHelper<TModel> html,
                 Expression<Func<TModel, TValue>> expression, int leng, int size)
        {
            return html.TextBoxFor(expression, new { size = size, maxlength = leng });
        }

        public static MvcHtmlString TextField<TModel, TValue>(this HtmlHelper<TModel> html,
           Expression<Func<TModel, TValue>> expression, int leng, int size, bool ronly)
        {
            if ( ronly == true )
                return html.TextBoxFor(expression, new { size = size,
                         maxlength = leng, @readonly =  true });
            else
                return html.TextBoxFor(expression, new { size = size,
                         maxlength = leng, @readonly = false });
        }
    }
}
