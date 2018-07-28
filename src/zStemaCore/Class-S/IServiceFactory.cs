using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StemaCore
{
    public interface IServiceFactory
    {
        T GetService<T>() where T : IBaseService;
        IRepositoryFactory Repository { get; set; }
    }
}
