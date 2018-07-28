using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StemaCore
{
    public interface IRepository<T> : IRepository where T : BaseEntity
    {
        IQueryable<T> Query();
        IQueryable<T> Query(bool trak);
        IQueryable<T> Query(bool trak, string[] include);
        void InsertOnSubmit(T item);
        void DeleteOnSubmit(T item);
        void UpdateOnSubmit(T item);
        void Attach(T current,T original);
        void AttachOrig(T item);
        void AttachCurr(T item);
    }
}
