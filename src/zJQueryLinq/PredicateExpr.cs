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
    [DataContract]
    public class PredicateExpr
    {
        [DataMember]
        public string value { get; set; }
        [DataMember]
        public string[] param { get; set; }
        [DataMember]
        public string[] ptype { get; set; }

        public static PredicateExpr Create(string jsonData)
        {
            try
            {
                var serializer = new DataContractJsonSerializer(typeof(PredicateExpr));
                StringReader reader = new System.IO.StringReader(jsonData);
                MemoryStream ms = new System.IO.MemoryStream(Encoding.Default.GetBytes(jsonData));
                return serializer.ReadObject(ms) as PredicateExpr;
            }
            catch
            {
                return null;
            }
        }

        public object[] GetParam()
        {
            if (param == null)
                return null;
            if (ptype == null)
                return param;
            if (param.Length != ptype.Length)
                throw new Exception("Bad message/contract type");
            object[] ret = new object[param.Length];
            for (int i = 0; i < param.Length; i++)
            {               
                if (ptype[i].ToLower() == "str")
                    ret[i] = param[i];
                if (ptype[i].ToLower() == "int")
                    ret[i] = Convert.ToInt32(param[i]);
                if (ptype[i].ToLower() == "dbl")
                    ret[i] = Convert.ToDouble(param[i]);
                if (ptype[i].ToLower() == "dec")
                    ret[i] = Convert.ToDecimal(param[i]);
                if (ptype[i].ToLower() == "dat")
                    ret[i] = Convert.ToDateTime(param[i]);
                if (ptype[i].ToLower() == "bol")
                    ret[i] = Convert.ToBoolean(param[i]);
            }
            return ret;
        }

        public void SkipBlak()
        {
            if (param == null)
                return;
            for (int i=0; i<param.Length; i++)
            {
                param[i] = param[i].Trim();
            }
        }
    }
}

