using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StemaCore
{
    public class StringUtil
    {
        public static string SkipNull(string value)
        {
            string valret = value;
            if (  value == null  )
                valret =  "";
            else
                valret = value;
            return valret.Trim();
        }
    }
}
