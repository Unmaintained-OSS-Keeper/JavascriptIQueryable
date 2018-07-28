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
    public class Grid5Controller : BaseDataController
    {
        public Grid5Controller()
        {
           
        }

        public Grid5Controller(IWorkerContext wctx) : base(wctx)
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

        // ---------------------------------

        [HttpPost]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public JsonResult UpdateViewModel(Customer entity)
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
        public JsonResult DeleteViewModel(Customer entity)
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

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult GetDataJson()
        {       
            var query = Repository.GetRepository<Customer>().Query();
            return Json(query.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}
