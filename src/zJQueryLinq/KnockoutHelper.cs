using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System.Text;
using System.IO;

namespace JQueryLinq
{
    public static class KnockoutHelper {   
        public static MvcHtmlString KoTextBoxFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression) where TModel : class
        {
            return KoTextBoxFor(htmlHelper, expression, KnockoutTypeBinding.None, 60, 60, null);
        }
        public static MvcHtmlString KoTextBoxStrFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression) where TModel : class
        {
            return KoTextBoxFor(htmlHelper, expression, KnockoutTypeBinding.Str, 60, 60, null);
        }
        public static MvcHtmlString KoTextBoxIntFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression) where TModel : class
        {
            return KoTextBoxFor(htmlHelper, expression, KnockoutTypeBinding.Int, 60, 60, null);
        }
        public static MvcHtmlString KoTextBoxDecFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression) where TModel : class
        {
            return KoTextBoxFor(htmlHelper, expression, KnockoutTypeBinding.Dec, 60, 60, null);
        }
        public static MvcHtmlString KoTextBoxBolFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression) where TModel : class
        {
            return KoTextBoxFor(htmlHelper, expression, KnockoutTypeBinding.Bol, 60, 60, null);
        }



        public static MvcHtmlString KoTextBoxFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, int size) where TModel : class
        {
            return KoTextBoxFor(htmlHelper, expression, KnockoutTypeBinding.None, size, size, null);
        }
        public static MvcHtmlString KoTextBoxStrFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, int size) where TModel : class
        {
            return KoTextBoxFor(htmlHelper, expression, KnockoutTypeBinding.Str, size, size, null);
        }
        public static MvcHtmlString KoTextBoxIntFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, int size) where TModel : class
        {
            return KoTextBoxFor(htmlHelper, expression, KnockoutTypeBinding.Int, size, size, null);
        }
        public static MvcHtmlString KoTextBoxDecFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, int size) where TModel : class
        {
            return KoTextBoxFor(htmlHelper, expression, KnockoutTypeBinding.Dec, size, size, null);
        }
        public static MvcHtmlString KoTextBoxBolFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, int size) where TModel : class
        {
            return KoTextBoxFor(htmlHelper, expression, KnockoutTypeBinding.Bol, size, size, null);
        } 



        public static MvcHtmlString KoTextBoxFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, KnockoutTypeBinding type, int size, int maxlength, Dictionary<string, object> htmlattr) where TModel : class
        {
            MvcHtmlString valret;
            Dictionary<string, object> param = null;
            string field = ExpressionHelper.GetExpressionText(expression);
            param = GetParam(field, type, size, maxlength, htmlattr);
            valret = htmlHelper.TextBoxFor<TModel, TProperty>(expression, param);
            return valret;
        }       



        private static Dictionary<string, object> GetParam(string field, KnockoutTypeBinding type, int size, int maxlength, Dictionary<string, object> htmlattr)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            if (type == KnockoutTypeBinding.None)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("value: ");
                sb.Append(field);
                param.Add("data-bind", sb.ToString());
            }
            else if (type == KnockoutTypeBinding.Str)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("valueStr: ");
                sb.Append(field);
                param.Add("data-bind", sb.ToString());
            }
            else if (type == KnockoutTypeBinding.Int)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("valueInt: ");
                sb.Append(field);
                param.Add("data-bind", sb.ToString());
            }
            else if (type == KnockoutTypeBinding.Dec)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("valueDec: ");
                sb.Append(field);
                param.Add("data-bind", sb.ToString());
            }
            else if (type == KnockoutTypeBinding.Bol)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("valueBol: ");
                sb.Append(field);
                param.Add("data-bind", sb.ToString());
            }
            param.Add("size", size.ToString());
            param.Add("maxlength", maxlength.ToString());
            if (htmlattr != null)
            {
                foreach (KeyValuePair<string, object> row in htmlattr)
                {
                    param.Add(row.Key, row.Value);
                }
            }
            return param;
        } 
    }
}
