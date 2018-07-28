
//var a = 1;
//$.mobile.changePage().

$(document).ready(function () {
    $("body").mobileTemplate();
});

function selecting2(eventargs) {
    var context = eventargs.toPage.context;
    var text1 = $("#text1").val();
    var text2 = $("#text2").val();

    context.linqEnabled = true;
    context.beginWhere("and");
    if (text1 != "") {
        context.addWhereClause( "City"  , "=", text1);
    }
    if (text2 != "") {
        context.addWhereClause("Country", "=", text2);
    }
    var r = context.endWhere();

    context.where(r.value, r.param).orderBy("CustomerID"); 
}

function databound2(context) {

}
