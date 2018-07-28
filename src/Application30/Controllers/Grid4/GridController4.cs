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
using Application1;

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

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page07()
        {
            return View();
        }

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page08()
        {
            return View();
        }

        // ---------------------------------

        [HttpPost]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public JsonResult Update(Customer entity)
        {
            var message = "Update error: " + entity.CustomerID;
            if (ModelState.IsValid == true)
            {
                if (entity.City == "pippo")
                    throw new Exception("pippo");
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
                if (entity.City == "pippo")
                    throw new Exception("pippo");
                message = "Delete ok: " + entity.CustomerID;
            }
            return Json(message);
        }

        // ---------------------------------

        [HttpPost]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public JsonResult UpdateViewModel1(CustomerViewModel1 entity)
        {
            var message = "Update1 error: " + entity.CustomerID;
            if (ModelState.IsValid == true)
            {
                if (entity.City == "pippo")
                    throw new Exception("pippo");
                message = "Update1 ok: " + entity.CustomerID;
            }
            return Json(message);
        }

        [HttpPost]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public JsonResult DeleteViewModel1(CustomerViewModel1 entity)
        {
            var message = "Delete1 error: " + entity.CustomerID;
            if (ModelState.IsValid == true)
            {
                if (entity.City == "pippo")
                    throw new Exception("pippo");
                message = "Delete1 ok: " + entity.CustomerID;
            }
            return Json(message);
        }

        // ---------------------------------

        [HttpPost]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public JsonResult UpdateViewModel2(CustomerViewModel2 entity)
        {
            var message = "Update2 error: " + entity.CustomerID;
            if (ModelState.IsValid == true)
            {
                if (entity.City == "pippo")
                    throw new Exception("pippo");
                message = "Update2 ok: " + entity.CustomerID;
            }
            return Json(message);
        }

        [HttpPost]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public JsonResult DeleteViewModel2(CustomerViewModel2 entity)
        {
            var message = "Delete2 error: " + entity.CustomerID;
            if (ModelState.IsValid == true)
            {
                if (entity.City == "pippo")
                    throw new Exception("pippo");
                message = "Delete2 ok: " + entity.CustomerID;
            }
            return Json(message);
        }

        // ---------------------------------

        [OutputCache(Duration = 0, VaryByParam = "*")]
        [FilterNoLinq(ReturnData = true, ReturnView = true, Views = "*")]
        public ActionResult GetDataJson1(RequestRest rest)
        {
            rest.Operator = WhereOperator.And;
            rest.AddWhereMapping("City", "=", "campo1");
            rest.AddWhereMapping("Country", "=", "campo2");
            var query = Repository.GetRepository<Customer>().Query();
            var result = this.TryApplyView(rest, query.JQuery(rest));
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [FilterLinqData()]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult GetDataJson2(RequestLinq linq)
        {
            linq.SetSecurity(true, true, true);
            var query = Repository.GetRepository<Customer>().Query();
            var result = (object)query.JQuery(linq);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
