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
    public class Grid2Controller : BaseDataController
    {
        public Grid2Controller()
        {

        }

        public Grid2Controller(IWorkerContext wctx) : base(wctx)
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

        [FilterLinqView()]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult GetDataJson(RequestLinq linq)
        {
            linq.SetSecurity(true, true, true);
            var query = Repository.GetRepository<Customer>().Query();
            object data = this.TryApplyView(linq, query.JQuery(linq));
            return Json(data, JsonRequestBehavior.AllowGet);
            //Thread.Sleep(1000);
        }
    }
}
