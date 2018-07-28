using System;
using System.Text;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using System.Web;

namespace StemaAspMvc
{
    public class ParamObject
    {
        private Dictionary<string, string> _Data;

        public ParamObject()
        {
            _Data = new Dictionary<string, string>();
        }       

        public Dictionary<string, string> Data
        {
            get { return _Data; }
            set { _Data = value; }
        }

        public static ParamObject GetInstance(string param)
        {
            ParamObject oparam = new ParamObject();
            if ( String.IsNullOrEmpty(param) == true )
                return oparam;
            oparam.SetParam(param);
            return oparam;
        }

        public string GetParam()
        {
            string valret = "";
            StringBuilder sb = new StringBuilder();
            foreach (KeyValuePair<string , string> row in _Data)
            {
                if ( sb.Length != 0 )
                    sb.Append("&");
                sb.Append( row.Key );
                sb.Append("=");
                sb.Append(row.Value);
            }
            valret = sb.ToString();
            byte[] array = ToByte(valret.ToCharArray());            
            valret = Convert.ToBase64String(array);
            return valret;
        }

        public void SetParam(string value)
        {
            char[] opz1 = { '=' }; char[] opz2 = { '&' };
            char[] array = ToChar(Convert.FromBase64String(value));           
            string[] array1 = SplitChar(array, opz2);
            foreach(string row in array1)
            {
                string[] array2 = row.Split(opz1);
                if (_Data.ContainsKey(array2[0]) == true)
                    continue;
                _Data.Add(array2[0], array2[1]);
            }
        }

        private char[] ToChar(byte[] array1)
        {
            int index = 0;
            char[] array2 = new char[array1.Length];
            foreach (char row in array1)
            {
                array2[index] = (char)row;
                index = index + 1;
            }
            return array2;
        }

        private byte[] ToByte(char[] array1)
        {
            int index = 0;
            byte[] array2 = new byte[array1.Length];
            foreach (char row in array1)
            {
                array2[index] = (byte)row;
                index = index + 1;
            }
            return array2;
        }

        private string[] SplitChar(char[] array1, char[] opz)
        {
            string[] array2 = new String(array1).Split(opz);
            return array2;
        }       
    }
}