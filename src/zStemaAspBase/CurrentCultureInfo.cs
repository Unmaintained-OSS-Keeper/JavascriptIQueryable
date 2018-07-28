using System;
using System.Web;
using System.Globalization;
using System.Web.Script.Serialization;
using System.Collections.Generic;
using System.Linq;

namespace StemaAspBase
{
    public class ClientCultureInfo
    {
        public string name;
        public DateTimeFormatInfo dateTimeFormat;
        public NumberFormatInfo numberFormat;

        public ClientCultureInfo(CultureInfo cultureInfo)
        {
            name = cultureInfo.Name;
            dateTimeFormat = cultureInfo.DateTimeFormat;
            numberFormat = cultureInfo.NumberFormat;
        }

        public static string SerializedCulture(ClientCultureInfo info)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(info);
        }
    }
}
