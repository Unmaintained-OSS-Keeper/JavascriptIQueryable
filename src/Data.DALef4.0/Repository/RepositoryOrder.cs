﻿using System;
using System.Data;
using System.Data.Objects;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Commons;
using StemaCore;

namespace Data.DALef40
{
    public class RepositoryOrder : BaseRepository<Order>, IRepositoryOrder
    {
        public RepositoryOrder(IDataContext ctx) : base(ctx)
        {
            
        }
    }
}
