
/// <reference path="jquery-1.5.1.min.js" />

$(document).ready(function () {
    var settings = {
        tpane2: 'gpane2',
        tcontainer: "jlist",
        tlinqEnabled: false,      
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

    var swhere = "";

    var text1 = $("#text1").val();
    text1 = jQuery.trim(text1);
    if (text1!= "") {
        if (swhere == "")
            swhere = swhere + "campo1=" + text1;
        else swhere = swhere + "&campo1=" + text1;
    }   
    var text2 = $("#text2").val(); 
    text2 = jQuery.trim(text2); 
    if (text2 != "") {
        if (swhere == "")
            swhere = swhere + "campo2=" + text2;
        else swhere = swhere + "&campo2=" + text2;
    } 

    context.from("/Grid3/GetDataJson").pagingWithSize(10).where(swhere).
      orderBy("Country,City desc ").applyTempClient("jtableTemplate");
}
