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
    public class RepositoryShipper : BaseRepository<Shipper>, IRepositoryShipper
    {
        public RepositoryShipper(IDataContext ctx) : base(ctx)
        {
            
        }
    }
}
