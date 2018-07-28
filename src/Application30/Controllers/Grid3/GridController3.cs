using System;
using System.Web.Mvc;
using System.Collections.ObjectModel;
using System.Web.Script.Serialization;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Commons;
using JQueryLinq;
using StemaAspMvc;
using StemaCore;

namespace Application30.Controllers
{
    public class Grid3Controller : BaseDataController
    {
        public Grid3Controller()
        {

        }

        public Grid3Controller(IWorkerContext wctx) : base(wctx)
        {

        }

        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page01()
        {
            return View();
        }

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page02()
        {
            return View();
        }

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page03()
        {
            return View();
        }

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page04()
        {
            return View();
        }

        // ---------------------------------

        [OutputCache(Duration = 0, VaryByParam = "*")]
        [FilterNoLinq(ReturnData = true, ReturnView = true, Views = "*")]
        public ActionResult GetDataJson(RequestRest rest)
        {
            object result = null;
            rest.Operator = WhereOperator.And;
            rest.AddWhereMapping("City", "=", "campo1");
            rest.AddWhereMapping("Country", "=", "campo2");
            var query = Repository.GetRepository<Customer>().Query();
            result = this.TryApplyView(rest, query.JQuery(rest));
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //[OutputCache(Duration = 0, VaryByParam = "*")]
        //[FilterNoLinq(ReturnData = true, ReturnView = true, Views = "*")]
        //public ActionResult GetDataJson(RequestRest rest)
        //{
        //    object result = null;
        //    //
        //    int pagecurr = (rest.PageCurr - 1) * rest.PageSize;
        //    IQueryable<Customer> query = Repository.GetRepository<Customer>().Query();
        //    int count = query.Count();
        //    query = query.OrderBy(c => c.CustomerID).Skip(pagecurr).Take(rest.PageSize);
        //    Customer[] array = query.ToArray<Customer>();
        //    //
        //    result = this.TryApplyView(rest, rest.CreateResult(count, array));
        //    return Json(result, JsonRequestBehavior.AllowGet);
        //}

        //[OutputCache(Duration = 0, VaryByParam = "*")]
        //[FilterNoLinq(ReturnData = true, ReturnView = true, Views = "*")]
        //public ActionResult GetDataJson(RequestRest rest)
        //{
        //    object result = null;
        //    //
        //    int pagecurr = (rest.PageCurr - 1) * rest.PageSize;
        //    IQueryable<Customer> query = Repository.GetRepository<Customer>().Query();
        //    int count = query.Count();
        //    query = query.OrderBy(c => c.CustomerID).Skip(pagecurr).Take(rest.PageSize);
        //    Customer[] array = query.ToArray<Customer>();
        //    //
        //    result = this.TryApplyView(rest, rest.CreateResult(count, array));
        //    return Json(result, JsonRequestBehavior.AllowGet);
        //}
    }
}
