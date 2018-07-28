using System;
using System.Collections.Generic;
using System.Linq;

using StemaCore;

namespace Commons
{
    public class DomainException : Exception
    {
        private string _Code;

        public DomainException(string code,string message) 
            : base(message)
        {
            _Code = code;
        }

        public string Code
        {
            get { return _Code; }
            set { _Code = value; }
        }
    }
}
