using System;
using System.Web;
using System.Text;
using System.Collections.Generic;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Linq;
using System.IO;

namespace JQueryLinq
{
    public class ModelBinderLinqRequest : IModelBinder
    {
        public object BindModel(ControllerContext context, ModelBindingContext bindingContext)
        {
            try
            {
                RequestLinq linq = null;
                HttpRequestBase request = context.HttpContext.Request;
                string message = (string)request["message"] ?? "";
                string token1 = ("\"typeresult\":\"client\"");
                string token2 = ("\"typeresult\":\"server\"");
                string token3 = (  "\"typeresult\":\"10\""  );
                string token4 = (  "\"typeresult\":\"20\""  );
                message = message.Replace(token1, token3);
                message = message.Replace(token2, token4);
                if (string.IsNullOrEmpty(message) == false)
                    linq = RequestLinq.Create(message);
                return linq;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}