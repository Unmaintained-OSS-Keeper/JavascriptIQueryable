using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StemaCore
{
    public class BaseEntity
    {
        public void ValidateEntity(IStrategy role)
        {
            Validate();
            Validate(role);
        }

        public virtual void Validate()
        {
            //throw new Exception("Not implementd !!!");
        }

        public virtual void Validate(IStrategy role)
        {
            role.ValidateRole(this, role);
        }
    }
}
