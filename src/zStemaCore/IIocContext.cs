using System;
using System.Collections.Generic;
using System.Linq;


namespace StemaCore
{
    public interface IIocContext
    {
        T Resolve<T>();
    }
}
