using System;
using Microsoft.Practices.Unity;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;

using StemaAspBase;
using StemaCore;

namespace StemaAspMvc
{
    public class BaseDataController : BaseController
    {
        private IWorkerContext _WorkerContext;
        private IServiceFactory _Service;
        private IRepositoryFactory _Repository;

        public BaseDataController()
        {           
            _WorkerContext = new WorkerContext1();
            _Repository = _WorkerContext.Repository;
            _Service = _WorkerContext.Service;
        }

        public BaseDataController(IWorkerContext wcontext)
        {
            _WorkerContext = wcontext;
            _Repository = _WorkerContext.Repository;
            _Service = _WorkerContext.Service;
        }  

        public IServiceFactory Service
        {
            get { return _WorkerContext.Service; }
        }

        public IRepositoryFactory Repository
        {
            get { return _WorkerContext.Repository; }
        }

        public IWorkerContext WorkerContext
        {
            get { return _WorkerContext; }
        }

        protected override void Dispose(bool flag)
        {
            _WorkerContext.Close();
            base.Dispose(flag);
        }
    }
}
