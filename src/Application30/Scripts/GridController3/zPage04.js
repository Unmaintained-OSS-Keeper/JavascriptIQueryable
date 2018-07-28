
/// <reference path="jquery-1.5.1.min.js" />

var context = null;
$(document).ready(function () {
    context = new PagingBase();
    method1();
});

function method1() {
    context.linqEnabled = false;
    context.mainpane = "gpane2";
    context.container = "jpa";

    context.from("/Grid3/GetDataJson").pagingWithSize(10).orderBy(
  "Country,City desc").applyTempClient("jtableTemplate").loadData();

    $("#gpane2").show();
}
