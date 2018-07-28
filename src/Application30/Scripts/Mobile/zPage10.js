
//var a = 1;
//$.mobile.changePage().

$(document).ready(function () {
    $("body").mobileTemplate();
});

//
// This event is raised before the request will be send to the server.
// In this case "jautocompose='false'" then the query will be defined here.
//
function selecting2(eventargs) {
    var context = eventargs.toPage.context;
    var swhere = "";
    var text1 = $("#text1").val();
    text1 = jQuery.trim(text1);
    if (text1 != "") {
        if (swhere == "")
            swhere = swhere + "param01=" + text1;
        else swhere = swhere + "&param01=" + text1;
    }
    var text2 = $("#text2").val();
    text2 = jQuery.trim(text2);
    if (text2 != "") {
        if (swhere == "")
            swhere = swhere + "param02=" + text2;
        else swhere = swhere + "&param02=" + text2;
    }
    context.pagingWithSize(10).where(swhere).orderBy(
       "Country,City desc").applyTempKo(mapKnock);
}
//
//  Callback function that create the viewmodel.
//
function mapKnock(data) {
    var viewmodel = ko.utils.arrayMap(data, function (item) {
        return new dataItem(item);
    });
    return ko.observableArray(viewmodel);
};
//
//  The viewmodel.
//
function dataItem(item) {
    var that = this;
    this.message = ko.observable("");
    this.CustomerID = ko.observable(item.CustomerID);
    this.CompanyName = ko.observable(item.CompanyName);
    this.ContactName = ko.observable(item.ContactName);
    this.City = ko.observable(item.City);
    this.Country = ko.observable(item.Country);
};
//
//  Databound event.
//
function databound2(event) {
    //$('.ui-page-active').page("destroy").page();
    var itemKo = event.context.source;
    var itemJs = ko.toJS(itemKo);
}
//
//  Databound event.
//
function databound3(event) {
    //$('.ui-page-active').page("destroy").page();
    var itemKo = event.context.source;
    var itemJs = ko.toJS(itemKo);
}
