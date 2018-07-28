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
    public static class LinqExtensions
    {
        // linq extension root    

        public static object JQuery(this IQueryable query, IRequestQuery req)
        {
            int count = 0; object result;
            query = query.Where(req).OrderBy(req);
            if (req.HasPaging ==  true)
                count = query.Count1();
            query = query.ReadData(req);
            if (req.HasPaging == false)
                count = query.Count1();
            query = query.Select(req);
            if (req.HasGroupResult == true)
            {
                var query1 = query.GroupBy(req);
                var data1 = query1.ToArray1();
                result = req.CreateResult(count, data1);
            }
            else
            {
                var query2 = (IQueryable)query;
                var data2 = query2.ToArray1();
                result = req.CreateResult(count, data2);
            }
            return result;
        }

        public static object JQueryToArray(this IQueryable query, IRequestQuery req)
        {
            int count = 0; object result;
            query = query.Where(req).OrderBy(req);
            if (req.HasPaging == true)
                count = query.Count1();
            query = query.ReadData(req);
            if (req.HasPaging == false)
                count = query.Count1();
            query = query.Select(req);
            if (req.HasGroupResult == true)
            {
                var query1 = query.GroupBy(req);
                result = query1.ToArray1();
            }
            else
            {
                var query2 = (IQueryable)query;
                result = query2.ToArray1();
            }
            return result;
        }

        // ---------------  

        // linq extension hight level

        public static IQueryable ReadData(this IQueryable query, IRequestQuery req)
        {
            if (req.GetSkip() < 1 && req.GetTake() >= 9999)
                return query;
            query = query.Skip1(req.GetSkip()).Take1(req.GetTake());
            return query;
        }

        public static IQueryable Select(this IQueryable query, IRequestQuery req)
        {
            if (req.HasSelect == true)
            {
                PredicateExpr predicate = req.GetSelect();
                if (!string.IsNullOrEmpty(predicate.value))
                    query = query.Select(predicate);
                return query;
            }
            return query;
        }

        public static IQueryable Where(this IQueryable query, IRequestQuery req)
        {
            if (req.HasWhere == true)
            {
                PredicateExpr predicate = req.GetWhere();
                if (!string.IsNullOrEmpty(predicate.value))
                    query = query.Where(predicate);
                return query;
            }
            return query;
        }

        public static IQueryable OrderBy(this IQueryable query, IRequestQuery req)
        {
            if (req.HasOrderBy == true)
            {
                PredicateExpr predicate = req.GetOrderBy();
                if (!string.IsNullOrEmpty(predicate.value))
                    query = query.OrderBy(predicate);
                return query;
            }
            return query;
        }

        public static IQueryable GroupBy(this IQueryable query1, IRequestQuery req)
        {
            if (req.HasGroupResult == false)
                return null;
            string group = req.GetGroupResult();
            if (string.IsNullOrEmpty(group) == true)
                return query1;
            var query2 = query1.GroupBy(group);
            return query2;
        }

        public static int Count1(this IQueryable query)
        {
            return (int)query.Provider.Execute(Expression.Call(typeof(Queryable),
               "Count", new Type[] { query.ElementType }, query.Expression));
        }

        public static IQueryable Take1(this IQueryable query, int count)
        {
            return query.Provider.CreateQuery(Expression.Call(typeof(Queryable), 
                "Take", new Type[] { query.ElementType }, query.Expression, 
                             Expression.Constant(count)));
        }

        public static IQueryable Skip1(this IQueryable query, int count)
        {
            return query.Provider.CreateQuery(Expression.Call(typeof(Queryable),
                "Skip", new Type[] { query.ElementType }, query.Expression,
                             Expression.Constant(count)));
        }       

        public static object ToArray1(this IQueryable query)
        {
            List<object> list = new List<object>();
            foreach (object row in query)
            {
                list.Add(row);
            }
            return list.ToArray();
        }

        // ---------------

        // linq extension low level

        public static IQueryable Select(this IQueryable query, PredicateExpr predicate)
        {
            if (string.IsNullOrEmpty(predicate.value))
                return query;

            LambdaExpression lambda = DynamicExpression.ParseLambda(query.ElementType,
                           null, predicate.value, predicate.param);             

            MethodCallExpression result = Expression.Call(typeof(Queryable), "Select", new[] 
          { query.ElementType, lambda.Body.Type }, query.Expression, Expression.Quote(lambda));

            return query.Provider.CreateQuery(result);
        }

        public static IQueryable Where(this IQueryable query, PredicateExpr predicate)
        {
            if (string.IsNullOrEmpty(predicate.value))
                return query;

            LambdaExpression lambda = DynamicExpression.ParseLambda(query.ElementType,
                        typeof(bool), predicate.value, predicate.GetParam());

            MethodCallExpression result = Expression.Call(typeof(Queryable), "Where", new[] 
                 { query.ElementType }, query.Expression, Expression.Quote(lambda));

            return query.Provider.CreateQuery(result);
        }

        public static IQueryable OrderBy(this IQueryable query, PredicateExpr predicate)
        {
            if (string.IsNullOrEmpty(predicate.value))
                return query;

            bool flagfirst = true;
            string methodAsc1 = "OrderBy";
            string methodDesc1 = "OrderByDescending";
            string methodAsc2 = "ThenBy ";
            string methodDesc2 = "ThenByDescending ";

            ParameterExpression[] parameters = new ParameterExpression[] {
                    Expression.Parameter(query.ElementType, "") };

            ExpressionParser parser = new ExpressionParser(parameters, predicate.value, null);
            IEnumerable<DynamicOrdering> orderings = parser.ParseOrdering();
            Expression queryExpr = query.Expression;          

            foreach (DynamicOrdering o in orderings)
            {
                if (flagfirst == true)
                {
                    queryExpr = Expression.Call(typeof(Queryable), o.Ascending ? methodAsc1 :
                   methodDesc1, new Type[] { query.ElementType, o.Selector.Type }, queryExpr,
                          Expression.Quote(Expression.Lambda(o.Selector, parameters)));
                }
                else
                {
                    queryExpr = Expression.Call(typeof(Queryable), o.Ascending ? methodAsc2 :
                   methodDesc2, new Type[] { query.ElementType, o.Selector.Type }, queryExpr,
                          Expression.Quote(Expression.Lambda(o.Selector, parameters)));
                }
                flagfirst = false;
            }

            return query.Provider.CreateQuery(queryExpr); 
        }

        public static IQueryable GroupBy(this IQueryable query, string group)
        {
            string methodName = "GroupBy ";

            ParameterExpression parameter = Expression.Parameter(query.ElementType, "p");
            MemberExpression memberAccess = null;

            memberAccess = MemberExpression.Property(memberAccess ??
                       (parameter as Expression), group);

            LambdaExpression groupByLambda = Expression.Lambda(memberAccess, parameter);

            MethodCallExpression result = Expression.Call(typeof(Queryable), methodName,
                 new[] { query.ElementType, memberAccess.Type }, query.Expression,
                                 Expression.Quote(groupByLambda));

            return query.Provider.CreateQuery(result);
        }
    }
}
