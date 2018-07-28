using System;
using System.Collections.Generic;
using Microsoft.Practices.Unity;
using System.Linq;

using Commons;
using Data.BLL;
using Data.DALef40;
using StemaCore;

namespace Application1
{
    public class UnityFactory
    {
        private static IUnityContainer _Container;

        public static IUnityContainer GetInstance()
        {
            if ( _Container != null )
                return _Container;
            _Container = new UnityContainer();
            _Container.RegisterType<IWorkerContext, WorkerContext1>();         
            _Container.RegisterType<IServiceFactory, FactoryService1>();
            _Container.RegisterType<IRepositoryFactory, FactoryRepositoryEF>();
            _Container.RegisterType<IDataContext, DataContextEF>();
            return _Container;
        }
    }
}