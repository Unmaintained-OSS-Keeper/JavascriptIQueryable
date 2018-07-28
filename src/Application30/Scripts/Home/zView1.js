

/// <reference path="jquery-1.5.1.min.js" />

var div1 = { }
$(document).ready(function () {
    div1 = new DivPage1();
    div1.container = "jlist";
    div1.template = "jtableTemplate";
    div1.urlpath = "/Studenti/GetDataView1";
    $(div1).bind('search1', function (event) {
        $("#text1").val("");
        $("#text2").val("");
        //alert("search1");
    });
    $(div1).bind('search2', function (event) {
        search(event.context);
        //alert("search2");
    });
    div1.initialize();
});

function search(context) {
    context.clearSearch();
    var text1 = $("#text1").val();
    var text2 = $("#text2").val();

    context.from().orderBy("cognome").pagingWithSize(4).applyTempClient();
    //context.from().orderBy("cognome").take(4).applyTempClient();
}
