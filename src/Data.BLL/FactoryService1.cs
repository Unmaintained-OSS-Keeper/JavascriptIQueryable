using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Commons;
using Data.DALef40;
using StemaCore;

namespace Data.BLL
{
    public class FactoryService1 : IServiceFactory
    {
        private IRepositoryFactory _Repository;

        public FactoryService1(IRepositoryFactory _repository)
        {
            _Repository = _repository;
        }

        public T GetService<T>() where T : IBaseService
        {
            if (typeof(T) == typeof(IServiceCategory))
            {
                IServiceCategory data;
                data = new ServiceCategory(_Repository);
                return (T)data;
            }
            //
            // ???
            //
            throw new Exception("error:GetService<T>() not set !!!");
        }

        public IRepositoryFactory Repository
        { 
            get { return _Repository; }
            set { _Repository = value; } 
        }
    }
}
