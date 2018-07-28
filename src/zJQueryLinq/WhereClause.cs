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
    public class WhereClause
    {
        private string _Field;
        private string _Op;
        private string _Param;

        public WhereClause()
        {

        }

        public string Field
        {
            get { return _Field; }
            set { _Field = value; }
        }

        public string Op
        {
            get { return _Op; }
            set { _Op = value; }
        }

        public string Param
        {
            get { return _Param; }
            set { _Param = value; }
        }
    }
}
