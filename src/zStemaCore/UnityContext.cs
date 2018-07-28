using System;
using Microsoft.Practices.Unity;
using System.Collections.Generic;
using System.Linq;

namespace StemaCore
{
    public class UnityContext : IIocContext
    {
        private IUnityContainer _Container;

        public UnityContext(IUnityContainer cont)
        {
            _Container = cont;
        }

        public IUnityContainer Container
        {
            get { return _Container; }
            set { _Container = value; }
        }

        public T Resolve<T>()
        {
            return _Container.Resolve<T>();
        }
    }
}
