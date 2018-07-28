using System;
using System.Collections.Generic;
using System.Linq;

namespace StemaCore
{
    public interface IHandles<T> where T : IDomainEvent
    { 
        void Handle(T args);  
    }
}
