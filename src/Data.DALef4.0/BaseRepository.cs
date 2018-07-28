using System;
using System.Data;
using System.Collections.Generic;
using System.Security.Principal;
using System.Data.EntityClient;
using System.Data.Objects;
using System.Linq;

using Commons;
using StemaCore;

namespace Data.DALef40
{
    public abstract class BaseRepository<T> : IRepository<T> where T : BaseEntity
    {
        protected DataContextEF context;
        protected ObjectStateManager manager;
        protected ServiceToken Token;

        public BaseRepository(IDataContext ctx)
        {
            context = (DataContextEF)ctx;
            manager = context.ObjectStateManager;          
        }

        public virtual IQueryable<T> Query()
        {
            return context.GetObjectSet<T>();
        }

        public virtual IQueryable<T> Query(bool trak)
        {
            ObjectSet<T> obj = context.GetObjectSet<T>();
            if ( trak == false )
               obj.MergeOption = MergeOption.NoTracking;
            return obj;
        }

        public virtual IQueryable<T> Query(bool trak, string[] include)
        {
            ObjectSet<T> obj = context.GetObjectSet<T>();
            if ( trak == false )
               obj.MergeOption = MergeOption.NoTracking;
            if (include != null)
            {
                ObjectQuery<T> tmp = (ObjectQuery<T>)obj;
                foreach(string row in include)
                {
                    tmp = tmp.Include(row);
                }
                return tmp;
            }
            return obj;
        }

        public virtual void InsertOnSubmit(T item)
        {  
            ObjectSet<T> obj = context.GetObjectSet<T>();
            obj.AddObject(item);
        }

        public virtual void DeleteOnSubmit(T item)
        {
            ObjectSet<T> obj = context.GetObjectSet<T>();
            obj.Attach(item);
            obj.DeleteObject(item);
        }

        public virtual void UpdateOnSubmit(T item)
        {
            AttachCurr(item);
        }

        public virtual void AttachOrig(T item)
        {
            context.GetObjectSet<T>().Attach(item);
            manager.ChangeObjectState(item,
                EntityState.Unchanged);
        }

        public virtual void AttachCurr(T item)
        {
            context.GetObjectSet<T>().Attach(item);
            manager.ChangeObjectState(item,
                EntityState.Modified);
        }

        public virtual void Attach(T current, T original)
        {
            throw new Exception("Not implementd !!!");
        }

        protected void ThrowException(string message)
        {
            RepositoryException ex;
            ex = new RepositoryException(message);
            throw ex;
        }
    }
}
