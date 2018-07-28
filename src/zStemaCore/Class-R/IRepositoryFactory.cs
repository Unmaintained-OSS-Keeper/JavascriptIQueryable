using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StemaCore
{
    public interface IRepositoryFactory
    {
        IDataContext DataContext { get; }
        bool LazyLoadingEnabled { get; set; }
        bool ProxyCreationEnabled { get; set; }
        T CreateObject<T>() where T : BaseEntity;
        IRepository<T> GetRepository<T>() where T : BaseEntity;
        T GetIRepository<T>() where T : IRepository;
        void DetectChanges();
        int Save();
    }
}
