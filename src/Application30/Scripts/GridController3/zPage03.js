
/// <reference path="jquery-1.5.1.min.js" />

var context = null;
$(document).ready(function () {
    context = new PagingBase();
    method1();
});

function method1() {
    context.linqEnabled = false;
    context.container = "jpa";

    context.from("/Grid3/GetDataJson").pagingWithSize(10).
             applyTempServer("view1").loadData();

    $("#gpane2").show();
}
