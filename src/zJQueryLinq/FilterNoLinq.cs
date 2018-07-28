using System;
using System.Web;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Linq;
using System.IO;

namespace JQueryLinq
{
    public class FilterNoLinq : ActionFilterAttribute
    {
        private bool _ReturnData;
        private bool _ReturnView;
        private string _Views;

        public FilterNoLinq()
        {
            ReturnData = true;
            ReturnView = true;
            Views = "*";
        }

        public bool ReturnData
        {
            get { return _ReturnData; }
            set { _ReturnData = value; }
        }

        public bool ReturnView
        {
            get { return _ReturnView; }
            set { _ReturnView = value; }
        }

        public string Views
        {
            get { return _Views; }
            set { _Views = value; }
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            CheckSecurity(filterContext);
            base.OnActionExecuting(filterContext);
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
        }

        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            base.OnResultExecuting(filterContext);
        }

        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            base.OnResultExecuted(filterContext);
        }

        private void CheckSecurity(ActionExecutingContext fc)
        {
            HttpRequestBase req = fc.HttpContext.Request;
            string viewname = (string)req.QueryString["view"];
            IEnumerable<RequestLinq> list = fc.ActionParameters.Values.OfType<RequestLinq>();
            RequestLinq grid = (RequestLinq)list.SingleOrDefault();

            //if ( ReturnData == false && string.IsNullOrEmpty(view) == true )
            //    RaiseError(fc, new Exception("JGrid - security 002"));

            //if ( ReturnView == false && string.IsNullOrEmpty(view) == true )
            //    RaiseError(fc, new Exception("JGrid - security 003"));

            if (string.IsNullOrEmpty(viewname) == false && Views != "*")
                if (Views.ToLower().IndexOf(viewname.ToLower()) == -1)
                    RaiseError(fc, new Exception("JGrid - security 004"));
        }

        private void RaiseError(ActionExecutingContext fc, Exception ex)
        {
            //ContentResult content = new ContentResult();
            //content.Content = ex.Message;
            //fc.Result = content;
            throw ex;
        }
    }
}

