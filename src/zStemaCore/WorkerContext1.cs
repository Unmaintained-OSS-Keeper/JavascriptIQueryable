using System;
using Microsoft.Practices.Unity;
using System.Collections.Generic;
using System.Linq;

namespace StemaCore
{
    public class WorkerContext1 : IWorkerContext
    {
        private IIocContext container = null;
        private IServiceFactory service = null;
        private IRepositoryFactory repository = null;
        private IDataContext context = null;

        public WorkerContext1()
        {
            container = IocContext.Current;
            service = container.Resolve<IServiceFactory>();
            repository = service.Repository;
            context = service.Repository.DataContext;
            Initialize();
        }

        public WorkerContext1(IServiceFactory srv)
        {
            service = (IServiceFactory)srv;
            repository = service.Repository;
            context = service.Repository.DataContext;
            Initialize();
        }

        protected virtual void Initialize()
        {
           
        }

        public IServiceFactory Service
        {
            get { return service; }
        }

        public IRepositoryFactory Repository
        {
            get { return repository; }
        }

        public IDataContext DataContext
        {
            get { return context; }
        }

        public void Close()
        {
            context.Close();
        }
    }
}
