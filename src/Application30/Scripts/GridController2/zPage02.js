/// <reference path="jquery-1.5.1.min.js" />

$(document).ready(function () {
    var settings = {
        tpane2: 'gpane2',
        tcontainer: "jlist",  
        ttemplate: "jtableTemplate",   
        ttype: "2",
    };
    $("#gpane2").gridTemplate(settings, searchfrm).
         bind('databound', function (event) {
           //alert("databound");
         }
    );
});

function searchfrm(context) {
    context.clearSearch();

    var index = 0;
    var where = "";
    var text1 = $("#text1").val();
    text1 = jQuery.trim(text1);
    var text2 = $("#text2").val();
    text2 = jQuery.trim(text2);
    var param = new Array();
   
    if (text1!= "") {
        if (where != "")
            where = where + " and City = @" + index;
        else where = where + " City = @" + index ;
        param[index] = text1;
        index++;
    }      
    if (text2 != "") {
        if (where != "")
            where = where + " and Country = @" + index;
        else where = where + " Country = @" + index;
        param[index] = text2;
        index++;
    }    

    context.from("/Grid2/GetDataJson").where(where,param).orderBy(
      "CustomerID").pagingWithSize(10).applyTempServer("View2");     
}
