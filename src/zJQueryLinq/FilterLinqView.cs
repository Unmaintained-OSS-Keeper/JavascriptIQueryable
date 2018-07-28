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
    public class FilterLinqView : FilterLinq
    {
        public FilterLinqView()
        {
            ReturnData = false;
        }
    }
}
