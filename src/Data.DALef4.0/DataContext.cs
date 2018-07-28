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
    public class DataContextEF : ObjectContext, IDataContext
    {
        public const string ConnectionString = "name=NorthwindEntities";
        public const string ContainerName = "NorthwindEntities";

        public DataContextEF()
            : base(ConnectionString, ContainerName)
        {
            this.ContextOptions.ProxyCreationEnabled = false;
            this.ContextOptions.LazyLoadingEnabled = false;
        }
    
        //public DataContextEF(string connectionString)
        //    : base(connectionString, ContainerName)
        //{
        //    this.ContextOptions.ProxyCreationEnabled = false;
        //    this.ContextOptions.LazyLoadingEnabled = false;
        //}

        //public DataContextEF(EntityConnection connection)
        //    : base(connection, ContainerName)
        //{
        //    this.ContextOptions.ProxyCreationEnabled = false;
        //    this.ContextOptions.LazyLoadingEnabled = false;
        //}

        public bool LazyLoadingEnabled
        {
            get { return this.ContextOptions.LazyLoadingEnabled; }
            set { this.ContextOptions.LazyLoadingEnabled = value; }
        }

        public bool ProxyCreationEnabled
        {
            get { return this.ContextOptions.ProxyCreationEnabled; }
            set { this.ContextOptions.ProxyCreationEnabled = value; }
        }

        public ObjectSet<Category> Category
        {
            get
            {
                return _Category ?? (_Category = CreateObjectSet<Category>());
            }
        }
        private ObjectSet<Category> _Category;

        public ObjectSet<Customer> Customer
        {
            get
            {
                return _Customer ?? (_Customer = CreateObjectSet<Customer>());
            }
        }
        private ObjectSet<Customer> _Customer;

        public ObjectSet<CustomerDemographic> CustomerDemographic
        {
            get
            {
                return _CustomerDemographic ?? (_CustomerDemographic = CreateObjectSet<CustomerDemographic>());
            }
        }
        private ObjectSet<CustomerDemographic> _CustomerDemographic;

        public ObjectSet<Employee> Employee
        {
            get
            {
                return _Employee ?? (_Employee = CreateObjectSet<Employee>());
            }
        }
        private ObjectSet<Employee> _Employee;

        public ObjectSet<T> GetObjectSet<T>() where T : BaseEntity
        {
            ObjectSet<T> valret = null;          
            if (typeof(T) == typeof(Category))
            {
                valret = CreateObjectSet<T>();
                return valret;
            }
            if (typeof(T) == typeof(Customer))
            {
                valret = CreateObjectSet<T>();
                return valret;
            }
            if (typeof(T) == typeof(CustomerDemographic))
            {
                valret = CreateObjectSet<T>();
                return valret;
            }
            if (typeof(T) == typeof(Employee))
            {
                valret = CreateObjectSet<T>();
                return valret;
            }
            if (typeof(T) == typeof(Order))
            {
                valret = CreateObjectSet<T>();
                return valret;
            }
            if (typeof(T) == typeof(OrderDetail))
            {
                valret = CreateObjectSet<T>();
                return valret;
            }
            if (typeof(T) == typeof(Product))
            {
                valret = CreateObjectSet<T>();
                return valret;
            }
            if (typeof(T) == typeof(Region))
            {
                valret = CreateObjectSet<T>();
                return valret;
            }
            if (typeof(T) == typeof(Shipper))
            {
                valret = CreateObjectSet<T>();
                return valret;
            }
            if (typeof(T) == typeof(Supplier))
            {
                valret = CreateObjectSet<T>();
                return valret;
            }
            if (typeof(T) == typeof(Territory))
            {
                valret = CreateObjectSet<T>();
                return valret;
            }
            throw new Exception("error:GetObjectSet<T>() not set !!!");
        }

        public void Close()
        {
            this.Dispose();
        }
    }
}
