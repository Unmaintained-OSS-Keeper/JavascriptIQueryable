using System;
using System.Text;
using System.Security.Principal;
using System.Collections.ObjectModel;
using System.Collections.Generic;
using System.Linq;

using Commons;
using Data.DALef40;
using StemaCore;

namespace Data.BLL
{
    public class SrvBase : BaseService
    {
        public SrvBase(IRepositoryFactory repository) : base(repository)
        {
           
        }  
    }
}
