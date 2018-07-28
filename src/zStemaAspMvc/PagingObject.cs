using System;
using System.Text;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using System.Web;

namespace StemaAspMvc
{
    public class PagingObject
    {
        private int _NumPage;
        private int _TotalCount;
        private int _Size = 10;

        public PagingObject(int numpage, int size)
        {
            _NumPage = numpage;
            _Size = size;
        }

        public int NumPage
        {
            get { return _NumPage;  }
            set { _NumPage = value;  }        
        }

        public int TotalCount
        {
            get { return _TotalCount; }
            set { _TotalCount = value; }
        }

        public int Size
        {
            get { return _Size; }
            set { _Size = value; }
        }

        public bool HasPrev
        {
            get 
            {
                bool valret = true;
                if (NumPage <= GetMinPage())
                    return false;
                return valret;           
            }
        }

        public bool HasNext
        {
            get
            {
                bool valret = true;
                if (NumPage >= GetMaxPage())
                    return false;
                return valret;
            }
        }

        public int GetMinPage()
        {
            double value = (    0 / Size     );
            value = (Math.Ceiling(value) + 1);
            return Convert.ToInt32(value);
        }

        public int GetMaxPage()
        {
            double value = (TotalCount / Size);
            value = (Math.Ceiling(value) + 1);
            return Convert.ToInt32(value);
        }
    }
}