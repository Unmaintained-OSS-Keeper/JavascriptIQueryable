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
    public class MobileController : BaseDataController
    {
        public MobileController()
        {

        }

        public MobileController(IWorkerContext wctx) : base(wctx)
        {

        }

        public ActionResult Index()
        {
            return View();
        }

        // ------------------------------------------------

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
        public ActionResult Page05a()
        {
            return View();
        }

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page05b()
        {
            return View();
        }

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page06()
        {
            return View();
        }

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page06a()
        {
            return View();
        }

        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult Page06b()
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

        // ------------------------------------------------

        [OutputCache(Duration = 0, VaryByParam = "*")]
        [FilterNoLinq(ReturnData = true, ReturnView = true, Views = "*")]
        public ActionResult GetData1(RequestRest rest)
        {
            object result = null;
            //
            try
            {
                rest.Operator = WhereOperator.And;
                rest.AddWhereMapping("City", "=", "param01");
                rest.AddWhereMapping("Country", "=", "param02");
                rest.DefaultOrderBy("CustomerID");
                var query = Repository.GetRepository<Customer>().Query();
                result = this.TryApplyView(rest, query.JQuery(rest));
            }
            catch (Exception ex)
            { 
            
            }
            //
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [FilterLinqData()]
        [OutputCache(Duration = 0, VaryByParam = "*")]
        public ActionResult GetData2(RequestLinq linq)
        {
            object result = null;
            //
            try
            {
                linq.SetSecurity(true, true, true);
                var query = Repository.GetRepository<Customer>().Query();
                result = query.JQuery(linq);
            }
            catch (Exception ex)
            {

            }
            //
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
