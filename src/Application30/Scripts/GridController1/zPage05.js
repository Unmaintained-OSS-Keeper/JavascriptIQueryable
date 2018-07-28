
/// <reference path="jquery-1.5.1.js" />

$(document).ready(function () {
    var settings = {
        tpane2: 'gpane2',
        tpane3: 'gpane3',
        tdetailPanel: "gdialog",
        tdetailContainer: "jdialog",
        tcacheEnabled: false,        
        ttype: "2"
    };
    $("#gpane2").gridTemplate(settings, searchfrm1);

    $("#gpane2").bind('isloading', function (event) {
        //alert("isloading");
    });

    $("#gpane2").bind('databound', function (event) {
        //alert("databound");
    });  
});

function searchfrm1(context) {
    context.clearSearch();

    var text1 = $("#text1").val();
    var text2 = $("#text2").val();

    //var index = 0;    
    //var param = new Array();      
    //var where = "";
    //if (text1!= "") {
    //    if (where != "")
    //        where = where + " and City = @" + index;
    //    else where = where + " City = @" + index ;
    //    param[index] = text1;
    //    index++;
    //}      
    //if (text2 != "") {
    //    if (where != "")
    //        where = where + " and Country = @" + index;
    //    else where = where + " Country = @" + index;
    //    param[index] = text2;
    //    index++;
    //} 

    context.beginWhere("and");
    if (text1!= "") {
        context.addWhereClause( "City"  , "=", text1);
    }      
    if (text2 != "") {
        context.addWhereClause("Country", "=", text2);
    }
    var r = context.endWhere();

    context.from("/Grid1/GetDataJson").where(r.value, r.param).orderBy("CustomerID").
                    pagingWithSize(10).applyTempClient(renderTemplate);  
}

function renderTemplate(source) {
    $("#jlist1").empty();
    var html = $("#jtableTemplate").tmpl(source);
    html.appendTo("#jlist1");
}
