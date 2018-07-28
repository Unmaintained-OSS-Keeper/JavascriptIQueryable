using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Security.Principal;
using System.Linq;
using System.Text;

namespace StemaCore
{
    [Serializable]
    public class ServiceToken

    {
        private Dictionary<string,object> _Items =
             new Dictionary<string,object>();

        public ServiceToken()
        {
            
        }

        public Dictionary<string,object> Items
        {
            get { return _Items; }
            set { _Items = value; }
        }
    }
}
