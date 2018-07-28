using System;
using System.Data;
using System.Collections.Generic;
using System.Data.EntityClient;
using System.Data.Objects;
using System.Linq;

using Commons;
using StemaCore;

namespace Data.DALef40
{
    public class FactoryRepositoryEF : IRepositoryFactory
    {
        private DataContextEF context;      

        public FactoryRepositoryEF(IDataContext ctx)
        {
            context = (DataContextEF)ctx;
        }

        public IDataContext DataContext
        {
            get { return context; }
        }

        public bool LazyLoadingEnabled
        {
            get { return context.LazyLoadingEnabled; }
            set { context.LazyLoadingEnabled = value; }
        }

        public bool ProxyCreationEnabled
        {
            get { return context.ProxyCreationEnabled; }
            set { context.ProxyCreationEnabled = value; }
        }

        public T CreateObject<T>() where T : BaseEntity
        {
            return context.CreateObject<T>();
        }       

        public IRepository<T> GetRepository<T>() where T : BaseEntity
        {
            if (typeof(T) == typeof(Category))
            {
                IRepositoryCategory data;
                data = new RepositoryCategory(context);
                return (IRepository<T>)data;
            }
            if (typeof(T) == typeof(Customer))
            {
                IRepositoryCustomer data;
                data = new RepositoryCustomer(context);
                return (IRepository<T>)data;
            }
            if (typeof(T) == typeof(CustomerDemographic))
            {
                IRepositoryCustomerDemographic data;
                data = new RepositoryCustomerDemographic(context);
                return (IRepository<T>)data;
            }
            if (typeof(T) == typeof(Employee))
            {
                IRepositoryEmployee data;
                data = new RepositoryEmployee(context);
                return (IRepository<T>)data;
            }
            if (typeof(T) == typeof(Order))
            {
                IRepositoryOrder data;
                data = new RepositoryOrder(context);
                return (IRepository<T>)data;
            }
            if (typeof(T) == typeof(OrderDetail))
            {
                IRepositoryOrderDetail data;
                data = new RepositoryOrderDetail(context);
                return (IRepository<T>)data;
            }
            if (typeof(T) == typeof(Product))
            {
                IRepositoryProduct data;
                data = new RepositoryProduct(context);
                return (IRepository<T>)data;
            }
            if (typeof(T) == typeof(Region))
            {
                IRepositoryRegion data;
                data = new RepositoryRegion(context);
                return (IRepository<T>)data;
            }
            if (typeof(T) == typeof(Shipper))
            {
                IRepositoryShipper data;
                data = new RepositoryShipper(context);
                return (IRepository<T>)data;
            }
            if (typeof(T) == typeof(Supplier))
            {
                IRepositorySupplier data;
                data = new RepositorySupplier(context);
                return (IRepository<T>)data;
            }
            if (typeof(T) == typeof(Territory))
            {
                IRepositoryTerritory data;
                data = new RepositoryTerritory(context);
                return (IRepository<T>)data;
            }
            throw new Exception("error:GetRepository<T>() not set !!!");
        }

        public T GetIRepository<T>() where T : IRepository
        {
            if (typeof(T) == typeof(IRepositoryCategory))
            {
                IRepositoryCategory data;
                data = new RepositoryCategory(context);
                return (T)data;
            }
            if (typeof(T) == typeof(IRepositoryCustomer))
            {
                IRepositoryCustomer data;
                data = new RepositoryCustomer(context);
                return (T)data;
            }
            if (typeof(T) == typeof(IRepositoryCustomerDemographic))
            {
                IRepositoryCustomerDemographic data;
                data = new RepositoryCustomerDemographic(context);
                return (T)data;
            }
            if (typeof(T) == typeof(IRepositoryEmployee))
            {
                IRepositoryEmployee data;
                data = new RepositoryEmployee(context);
                return (T)data;
            }
            if (typeof(T) == typeof(IRepositoryOrder))
            {
                IRepositoryOrder data;
                data = new RepositoryOrder(context);
                return (T)data;
            }
            if (typeof(T) == typeof(IRepositoryOrderDetail))
            {
                IRepositoryOrderDetail data;
                data = new RepositoryOrderDetail(context);
                return (T)data;
            }
            if (typeof(T) == typeof(IRepositoryProduct))
            {
                IRepositoryProduct data;
                data = new RepositoryProduct(context);
                return (T)data;
            }
            if (typeof(T) == typeof(IRepositoryRegion))
            {
                IRepositoryRegion data;
                data = new RepositoryRegion(context);
                return (T)data;
            }
            if (typeof(T) == typeof(IRepositoryShipper))
            {
                IRepositoryShipper data;
                data = new RepositoryShipper(context);
                return (T)data;
            }
            if (typeof(T) == typeof(IRepositorySupplier))
            {
                IRepositorySupplier data;
                data = new RepositorySupplier(context);
                return (T)data;
            }
            if (typeof(T) == typeof(IRepositoryTerritory))
            {
                IRepositoryTerritory data;
                data = new RepositoryTerritory(context);
                return (T)data;
            }
            throw new Exception("error:GetIRepository<T>() not set !!!");
        }

        public void DetectChanges()
        {
             context.DetectChanges();
        }

        public int Save()
        {
            int count = 0;
            count = context.SaveChanges();
            return count;
        }
    }
}
