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
    public class ModelBinderRestRequest : IModelBinder
    {
        public object BindModel(ControllerContext context, ModelBindingContext bindingContext)
        {
            try
            {
                RequestRest rest = null;
                HttpRequestBase request = context.HttpContext.Request;
                int pcurr = Convert.ToInt32(request["pagecurr"] ?? "-1");
                int psize = Convert.ToInt32(request["pagesize"] ?? "-1");
                Dictionary<string, string> qstring = new Dictionary<string, string>();
                foreach (string  key in request.QueryString.Keys)
                {
                    string value = request.QueryString[key];
                    qstring.Add(key, value);
                }
                rest = RequestRest.Create(pcurr, psize, qstring);
                return rest;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}