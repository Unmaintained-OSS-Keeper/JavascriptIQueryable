using System;
using System.Data;
using System.Data.Objects;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Commons;
using StemaCore;

namespace Data.DALef40
{
    public class RepositoryCategory : BaseRepository<Category>, IRepositoryCategory
    {
        public RepositoryCategory(IDataContext ctx) : base(ctx)
        {
            
        }
    }
}
