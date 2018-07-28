using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StemaCore
{
    public interface IStrategy
    {
        void ValidateRole(BaseEntity entity, IStrategy role);
    }
}
