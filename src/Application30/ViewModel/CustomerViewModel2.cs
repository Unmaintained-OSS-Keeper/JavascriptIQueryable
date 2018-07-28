using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;
using System.Collections.Specialized;

namespace Application1
{
    public class CustomerViewModel2
    {
        public CustomerViewModel2() 
        { 
        
        }

        [Required()]
        public string CustomerID { get; set; }

        [Required()]
        public string CompanyName { get; set; }

        //[Required()]
        public string ContactName { get; set; }       

        //[Required()]
        public string City { get; set; }      

        //[Required()]
        public string Country { get; set; }

        //[Required()]
        public int Value1 { get; set; }

        //[Required()]
        public int Value2 { get; set; }

        //[Required()]
        public int Total { get; set; }
    }
}
