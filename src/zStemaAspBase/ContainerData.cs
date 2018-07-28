using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using StemaCore;

namespace StemaAspBase
{
    public class ContainerData
    {
        public static IDataContext GetInstance1()
        {
            HttpContext context;
            context = HttpContext.Current;
            IDataContext dc = (IDataContext)context.Items["**contextEF01**"];
            return (IDataContext)dc;
        }

        public static void SetInstance1(IDataContext data)
        {
            HttpContext context;
            context = HttpContext.Current;
            context.Items["**contextEF01**"] = data;
        }

        public static IDataContext GetInstance2()
        {
            HttpContext context;
            context = HttpContext.Current;
            IDataContext dc = (IDataContext)context.Items["**contextEF02**"];
            return (IDataContext)dc;
        }

        public static void SetInstance2(IDataContext data)
        {
            HttpContext context;
            context = HttpContext.Current;
            context.Items["**contextEF02**"] = data;
        }
    }
}
