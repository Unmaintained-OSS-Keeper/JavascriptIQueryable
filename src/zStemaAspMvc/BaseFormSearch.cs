using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace StemaAspMvc
{
    public class BaseFormSearch
    {
        protected bool hasrequest;

        public BaseFormSearch()
        {

        }

        public bool HasRequest
        {
            get { return hasrequest; }
        }

        public void SetParam(string param)
        {
            ParamObject oparam; hasrequest = false;
            oparam = ParamObject.GetInstance(param);
            if (oparam.Data.Count == 0)
                return;
            OnSetParam(oparam);
            hasrequest = true;
            return;
        }

        public string GetParam()
        {
            ParamObject oparam = new ParamObject();
            OnGetParam(oparam);
            return oparam.GetParam(); 
        }

        public virtual void OnSetParam(ParamObject oparam)
        {
            throw new NotImplementedException();
        }

        public virtual void OnGetParam(ParamObject oparam)
        {
            throw new NotImplementedException();
        }
    }
}