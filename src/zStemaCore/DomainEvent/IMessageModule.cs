using System;
using System.Collections.Generic;
using System.Linq;

namespace StemaCore
{
    public interface IMessageModule
    {
        void HandleBeginMessage();
        void  HandleEndMessage();
    }
}
