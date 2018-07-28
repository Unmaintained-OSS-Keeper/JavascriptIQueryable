using System;
using Microsoft.Practices.Unity;
using System.Collections.Generic;
using System.Linq;


namespace StemaCore
{
    public class IocContext
    {
        private static IIocContext _Container;

        public static IIocContext Current
        {
            get { return _Container; }
            set { _Container = value; }
        }
    }
}
