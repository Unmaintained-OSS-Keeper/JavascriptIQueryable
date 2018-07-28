using System;
using System.Web.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Web;

using Commons;
using StemaAspMvc;

namespace Application30
{
    public static class JsonError
    {
        public static string GetMessage(Exception ex)
        {
            string message = ex.Message;
            if ( ex.InnerException != null )
                message = ex.InnerException.Message;
            return message;
        }
    }
}