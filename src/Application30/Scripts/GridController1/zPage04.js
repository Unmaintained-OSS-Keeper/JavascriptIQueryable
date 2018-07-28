
/// <reference path="jquery-1.5.1.min.js" />

$(document).ready(function () {
    var settings = {
        tpane2: 'gpane2',
        tcontainer: "jpane",
        tcacheEnabled: false,        
        ttype: "2",
    };
    $("#gpane2").gridTemplate(settings, searchfrm).
         bind('databound', function (obj, evt) {
            var plugin = obj.context;
            if (plugin.templatename == "jtableTemplate1")
                $(".identity").css("color","blue");
            if (plugin.templatename == "jtableTemplate2")
                $(".identity").css("color","aqua");  
         }
    );
});

function searchfrm(context) {
    context.clearSearch();

    var index = 0;
    var where = "";
    var text1 = $("#text1").val();
    var text2 = $("#text2").val();
    var param = new Array(1);   
    
    if (text2 != "") {
        if (where != "")
            where = where + " and Country = @" + index;
        else where = where + " Country = @" + index;
        param[index] = text2
        index++;
    }    
         
    if (text1 == "1") {
        context.from("/Grid1/GetDataJson").where(where,param).orderBy("CustomerID").
       pagingWithSize(10).applyTempClient("jtableTemplate1").continueWith(continue1);  
    }
    if (text1 == "2") {
        context.from("/Grid1/GetDataJson").where(where,param).orderBy("CustomerID").
       pagingWithSize(10).applyTempClient("jtableTemplate2").continueWith(continue2);  
    }
    if (text1 == "3") {
        context.from("/Grid1/GetDataJson").where(where,param).orderBy("CustomerID").
             pagingWithSize(10).select("new(CustomerID,City,Country,Orders)").
                         applyTempClient("jtableTemplate3");  
    }
}

function continue1(element) {
    alert("continue1"); 
}

function continue2(element) {
    alert("continue2"); 
}
