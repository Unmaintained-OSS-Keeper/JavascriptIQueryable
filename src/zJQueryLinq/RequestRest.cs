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
    [ModelBinder(typeof(ModelBinderRestRequest))]
    public class RequestRest : IRequestQuery
    {
        private int pagecurr = -1;
        private int pagesize = -1;
        private WhereOperator _Operator;
        private bool _HasGroupResult;
        private string _Select = "";
        private string _DefaultOrderBy = "";
        private Dictionary<string, WhereClause> where = new Dictionary<string, WhereClause>();
        protected Dictionary<string, string> qstring;

        private RequestRest()
        {
            
        }

        public static RequestRest Create(int pcurr, int psize,  Dictionary<string, string> value)
        {
            RequestRest rest = new RequestRest();
            rest.pagecurr = pcurr;
            rest.pagesize = psize;         
            rest.qstring = value;
            return rest;
        }

        public WhereOperator Operator
        {
            get { return _Operator; }
            set { _Operator = value; }
        }

        public void SetSelect(string value)
        {
            _Select = value;
        }

        public void DefaultOrderBy(string value)
        {
            _DefaultOrderBy = value;
        }

        public void AddWhereMapping(string field, string op, string param)
        {
            WhereClause clause = new WhereClause();
            clause.Field = field.Trim();
            clause.Op = " " + op + " ";
            clause.Param = param.Trim();
            where.Add(param, clause);
        }

        public void AddWhereMappingEq(string field, string param)
        {
            AddWhereMapping(field, "=", param);
        }

        public void AddWhereMappingNq(string field, string param)
        {
            AddWhereMapping(field, "<>", param);
        }

        // ---------------------------------------------------------------------

        public int GetSkip()
        {
            return ((pagecurr - 1) * pagesize);
        }

        public int GetTake()
        {
            return (         pagesize        );
        }

        public bool HasPaging
        {
            get
            {
                bool valret = true;
                if (pagecurr == -1 || pagesize == -1)
                    valret = false;
                return valret;
            }
        }     

        public bool HasSelect
        {
            get
            {
                bool valret = false;
                if (String.IsNullOrEmpty(_Select) == false)
                    valret = true;
                return valret;
            }
        }

        public bool HasOrderBy
        {
            get
            {
                bool valret = false;
                string param = "orderby";
                if (String.IsNullOrEmpty(param) == false)
                    valret = true;
                return valret;
            }
        }

        public bool HasWhere
        {
            get
            {
                bool valret = false;
                if ( where != null && where.Count > 0 )
                    valret = true;
                return valret;
            }
        }

        public bool HasGroupResult
        {
            get { return _HasGroupResult; }
            set { _HasGroupResult = value; }
        }     

        public PredicateExpr GetSelect()
        {
            PredicateExpr predicate = new PredicateExpr();
            predicate.value = _Select;
            return predicate;
        }

        public PredicateExpr GetOrderBy()
        {
            string param = "orderby";
            PredicateExpr predicate = new PredicateExpr();
            if (qstring.ContainsKey(param) == false)
            {
                predicate.value = _DefaultOrderBy;
                return predicate;
            }
            predicate.value = qstring[param].Trim(); 
            return predicate;
        }

        public PredicateExpr GetWhere()
        {
            List<string> param = new List<string>();
            string swhere = "", oper = ""; int index = 0;
            PredicateExpr predicate = new PredicateExpr();          
            foreach(KeyValuePair<string, WhereClause> row1 in where)
            {
                WhereClause row2 = row1.Value;
                if (qstring.ContainsKey(row1.Key) == false)
                    continue;
                if (index > 0) oper = " " + Operator.ToString() + " ";
                swhere = swhere + oper + row2.Field + row2.Op + "@" + index.ToString();
                param.Add(qstring[row1.Key].Trim());
                index = index + 1;
            }
            predicate.value =  swhere.Trim();
            predicate.param = param.ToArray();
            return predicate;
        }

        public string GetGroupResult()
        {
            //char[] sep = { ' ' };
            //string temp = _OrderBy.Trim();
            //temp = temp.Replace(",", " , ");
            //string[] array1 = temp.Split(sep);
            //return array1[0];
            return "";
        }

        public object CreateResult(int count, object data)
        {
            object result = null;
            result = new
            {
                total = ((int)Math.Ceiling((double)count / pagesize)),
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