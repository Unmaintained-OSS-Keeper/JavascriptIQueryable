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
    public class Grid4Controller : BaseDataController
    {
        public Grid4Controller()
        {

        }

        public Grid4Controller(IWorkerContext wctx) : base(wctx)
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

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page05()
        {
            return View();
        }

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page06()
        {
            return View();
        }

        [HttpPost]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public JsonResult Update(Customer entity)
        {
            var message = "Update error: " + entity.CustomerID;
            if (ModelState.IsValid == true)
            {
                message = "Update ok: " + entity.CustomerID; 
            }
            return Json(message);
        }

        [HttpPost]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public JsonResult Delete(Customer entity)
        {
            var message = "Delete error: " + entity.CustomerID; 
            if (ModelState.IsValid == true)
            {
                message = "Delete ok: " + entity.CustomerID;
            }
            return Json(message);
        }

        // ---------------------------------

        [OutputCache(Duration = 0, VaryByParam = "*")]
        [FilterNoLinq(ReturnData = true, ReturnView = true, Views = "*")]
        public ActionResult GetDataJson1(RequestRest rest)
        {
            object result = null;
            //
            rest.Operator = WhereOperator.And;
            rest.AddWhereMapping("City", "=", "campo1");
            rest.AddWhereMapping("Country", "=", "campo2");
            var query = Repository.GetRepository<Customer>().Query();
            result = this.TryApplyView(rest, query.JQuery(rest));
            //
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [FilterLinqData()]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult GetDataJson2(RequestLinq linq)
        {
            linq.SetSecurity(true, true, true);
            var query = Repository.GetRepository<Customer>().Query();
            return Json(query.JQuery(linq), JsonRequestBehavior.AllowGet);
        }
    }
}
