using System;
using System.Web;
using System.Web.Mvc;
using System.Collections.Generic;
using Microsoft.Practices.Unity;
using System.Linq;

namespace Application1
{
    public class UnityDependencyResolver : IDependencyResolver
    {
        private readonly IUnityContainer _container;

        public UnityDependencyResolver(IUnityContainer ctx)
        {
            this._container = ctx;
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                object ret = null;
                ret = _container.ResolveAll(serviceType);
                return (IEnumerable<object>)ret;
            }
            catch
            {
                return new List<object>();
            }
        }

        public object GetService(Type serviceType)
        {
            try
            {
                object ret = null;
                ret = _container.Resolve(serviceType);
                return ret;
            }
            catch
            {
                return null;
            }
        }
    }
}