using System;
using System.Collections.Generic;
using System.Linq;

namespace StemaCore
{
    public interface IDomainEvent 
    {
        Exception Exception { get; set; }
        DomainMessageState State { get; set; }
    }
}
