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
    public class JsonView
    {
        public JsonView()
        {
            HasError = false;
            Message = "";
            TotalCount = 0;
        }

        public JsonView(object data)
        {
            HasError = false;
            Message = "";
            TotalCount = 0;
            Data = data;
        }

        public bool HasError { get; set; }

        public string Message { get; set; }

        public int TotalCount { get; set; }

        public object Data { get; set; }
    }
}