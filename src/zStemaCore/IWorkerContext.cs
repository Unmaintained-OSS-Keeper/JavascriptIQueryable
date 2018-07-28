using System;
using Microsoft.Practices.Unity;
using System.Collections.Generic;
using System.Linq;

namespace StemaCore
{
    public interface IWorkerContext
    {
        void Close();
        IDataContext DataContext { get; }
        IRepositoryFactory Repository { get; }
        IServiceFactory Service { get; }
    }
}
