
/// <reference path="jquery-1.6.1.js" />
/// <reference path="amplify-vsdoc.js" />

var sdomain = "http://192.168.1.2/Mobile/";

window.addEventListener('load', function () {
    document.addEventListener('deviceready', function () {
        //console.log("PhoneGap is now loaded/1");
        jQuery.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $("body").mobileTemplate({tdomain: sdomain});
        //console.log("PhoneGap is now loaded/2");
    }, false);
}, false);
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

    this.updateItem = function () {
        var itemreq = ko.toJSON(this);
        //if ($("#page4 form").valid() == false) {
        //    alert("Invalid form");
        //    return;
        //}
        var surl = sdomain + "UpdateViewModel1/";
        $.ajax({ url: surl, type: 'post',
            data: itemreq,
            contentType: 'application/json',
            error: function (request, state, error) {
                navigator.notification.alert("Ajax error:" + error);
            },
            success: function (result) {
                navigator.notification.alert("Success:" + result);
            }
        });
    } .bind(this);

    this.deleteItem = function () {
        var itemreq = ko.toJSON(this);
        //if ($("#page4 form").valid() == false) {
        //    alert("Invalid form");
        //    return;
        //}
        var surl = sdomain + "DeleteViewModel1/";
        $.ajax({ url: surl, type: 'post',
            data: itemreq,
            contentType: 'application/json',
            error: function (request, state, error) {
                navigator.notification.alert("Ajax error:" + error);
            },
            success: function (result) {
                navigator.notification.alert("Success:" + result);
            }
        });
    } .bind(this);
};
