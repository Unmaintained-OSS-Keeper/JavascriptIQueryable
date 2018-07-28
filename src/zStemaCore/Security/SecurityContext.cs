using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Linq;
using System.Text;

namespace StemaCore
{
    public class SecurityContext
    {
        [ThreadStatic]
        private static ServiceToken _Container;

        public static ServiceToken Current
        {
            get { return _Container; }
            set { _Container = value; }
        }
    }
}
