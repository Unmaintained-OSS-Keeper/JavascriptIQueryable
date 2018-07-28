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

