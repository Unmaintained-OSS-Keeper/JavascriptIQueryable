
/// <reference path="jquery-1.5.1.min.js" />

var context = null;
$(document).ready(function () {
    context = new PagingBase();
    context.linqEnabled = false;
    context.mainpane = "gpane2";
    context.container = "jpa";
    context.initPagingBase();
    method1();
});

function method1() { 
    context.from("/Grid3/GetDataJson").pagingWithSize(10).orderBy(
      "Country,City desc").applyTempServer("view1").loadData();

    $("#gpane2").show();
}
