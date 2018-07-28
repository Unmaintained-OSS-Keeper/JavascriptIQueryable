using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StemaCore
{
    public class BaseService : IBaseService
    {
        private IRepositoryFactory _Repository;

        public BaseService(IRepositoryFactory repository)
        {
            _Repository = repository;           
        }

        public IRepositoryFactory Repository
        {
            get { return _Repository; }
        }
    }
}
