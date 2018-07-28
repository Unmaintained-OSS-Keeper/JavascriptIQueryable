using System;
using System.Web.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace StemaAspMvc
{
    public class SelectModel
    {   
        private string _value;  
        private List<SelectListItem> _Items; 
            
        public SelectModel(string value, IEnumerable<SelectListItem> items) 
        {     
            _value = value;
            _Items = new List<SelectListItem>(items);    
            _Select();  
        }

        public string Value
        {
            get { return _value; }
            set
            {
                _value = value;
                _Select();
            }
        }       
        
        public List<SelectListItem> Items 
        {
            get { return _Items; }  
        }

        private void _Select()
        {
            Items.ForEach(x => x.Selected = (
           Value != null && x.Value == Value));
        } 
    }
}
