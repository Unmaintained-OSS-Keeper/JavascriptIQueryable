using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StemaCore
{
    public class BaseEventHandle<T> : IHandles<T> where T : IDomainEvent   
    {
        public BaseEventHandle()
        {
            
        }

        public void Handle(T args)
        {
           OnHandle(args);
        }

        public virtual void OnHandle(T args)
        {
            throw new Exception("Handle");
        }
    }
}
