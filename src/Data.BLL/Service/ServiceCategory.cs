using System;
using System.Text;
using System.Collections.ObjectModel;
using System.Collections.Generic;
using System.Linq;

using Commons;
using Data.DALef40;
using StemaCore;

namespace Data.BLL
{
    public class ServiceCategory : SrvBase, IServiceCategory
    {
        public ServiceCategory(IRepositoryFactory repository) : base(repository)
        {
           
        }

        //public IQueryable<Category> GetQuery()
        //{
        //    try
        //    {
        //        IRepository<Category> srv;
        //        srv = Repository.GetRepository<Category>();
        //        return srv.Query(false);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }          
        //}
    }
}
