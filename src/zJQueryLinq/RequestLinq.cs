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
    [DataContract]
    [ModelBinder(typeof(ModelBinderLinqRequest))]
    public class RequestLinq : IRequestQuery
    {
        [DataMember]
        protected bool groupresult { get; set; }
        [DataMember]
        protected bool enablepaging { get; set; }  
        [DataMember]
        protected PredicateExpr select { get; set; }
        [DataMember]
        protected PredicateExpr order { get; set; }
        [DataMember]
        protected PredicateExpr where { get; set; }
        [DataMember]
        protected int skip { get; set; }
        [DataMember]
        protected int take { get; set; }

        public bool EnableSelect { get; set; }
        public bool EnableOrderBy { get; set; }
        public bool EnableWhere { get; set; }

        private RequestLinq()
        {
            
        }

        public static RequestLinq Create(string jsonData)
        {
            var serializer = new DataContractJsonSerializer(typeof(RequestLinq));
            StringReader reader = new System.IO.StringReader(jsonData);
            MemoryStream ms = new System.IO.MemoryStream(Encoding.Default.GetBytes(jsonData));
            RequestLinq linq = (RequestLinq)serializer.ReadObject(ms);
            if (linq.select != null)
                linq.select.SkipBlak();
            if (linq.order != null)
                linq.order.SkipBlak();
            if (linq.where != null)
                linq.where.SkipBlak();
            return linq;   
        }      

        public void SetSecurity(bool bselect, bool bwhere, bool borderby)
        {
            EnableSelect = bselect;
            EnableOrderBy = borderby;
            EnableWhere = bwhere;
        }

        // ---------------------------------------------------------------------

        public int GetSkip()
        {
            return skip;
        }

        public int GetTake()
        {
            return take;
        }

        public bool HasPaging
        {
            get
            {
                return enablepaging;
            }
        }

        public bool HasSelect
        {
            get
            {
                bool valret = false;
                if (String.IsNullOrEmpty(select.value) == false)
                    valret = true;
                return valret;
            }
        }

        public bool HasOrderBy
        {
            get
            {
                bool valret = false;
                if (String.IsNullOrEmpty(order.value) == false)
                    valret = true;
                return valret;
            }
        }

        public bool HasWhere
        {
            get
            {
                bool valret = false;
                if (String.IsNullOrEmpty(where.value) == false)
                    valret = true;
                return valret;
            }
        }       

        public bool HasGroupResult
        {
            get
            {
                bool valret = false;
                if (string.IsNullOrEmpty(order.value) == false
                            && groupresult == true)
                    valret = true;
                return valret;
            }
        }

        public PredicateExpr GetSelect()
        {
            // Check security
            if (EnableSelect == false)
                new Exception("Operation not permitted: 001"); 
            return select;
        }

        public PredicateExpr GetOrderBy()
        {
            // Check security
            if (EnableOrderBy == false)
                new Exception("Operation not permitted: 002");
            return order;
        }

        public PredicateExpr GetWhere()
        {
            // Check security
            if (EnableWhere == false)
                new Exception("Operation not permitted: 003"); 
            return where;
        }      

        public string GetGroupResult()
        {
            char[] sep = { ' ' };
            string temp = order.value.Trim();
            temp = temp.Replace(",", " , ");
            string[] array1 = temp.Split(sep);
            return array1[0];
        }

        public object CreateResult(int count, object data)
        {
            object result = null;
            result = new
            {
                total = ((int)Math.Ceiling((double)count / take)),
                records = count,
                rows = data,
            };
            return result;
        }

        public object ApplyView(dynamic data, string buffer)
        {
            object result = new
            {
                total = data.total,
                records = data.records,
                rows = buffer,
            };
            return result;
        }
    }
}