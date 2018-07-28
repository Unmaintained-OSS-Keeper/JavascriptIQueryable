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
    public interface IRequestQuery
    {
        int GetSkip();
        int GetTake();
        bool HasPaging { get; }
        bool HasGroupResult { get; }
        bool HasSelect { get; }
        bool HasOrderBy { get; }
        bool HasWhere { get; }    
        PredicateExpr GetSelect();
        PredicateExpr GetOrderBy();
        PredicateExpr GetWhere();
        string GetGroupResult();
        object CreateResult(int count, object data);
        object ApplyView(dynamic data, string buffer);
    }
}
