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
    public class Grid1Controller : BaseDataController
    {
        public Grid1Controller()
        {

        }

        public Grid1Controller(IWorkerContext wctx) : base(wctx)
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

        [FilterLinqData()]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult GetDataJson(RequestLinq linq)
        {
            linq.SetSecurity(true, true, true);
            var query = Repository.GetRepository<Customer>().Query();
            return Json(query.JQuery(linq), JsonRequestBehavior.AllowGet);
            //Thread.Sleep(1000);
        }
    }
}
