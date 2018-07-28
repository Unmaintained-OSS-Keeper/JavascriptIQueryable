
//var a = 1;
//$.mobile.changePage().

$(document).ready(function () {
    $("body").mobileTemplate();
});

//
// This event is raised when the application start.
// In this case it regirter two callback.
//
function init2(context) {
    context.customCallBack = function (obj) {
        var item = obj.dataitemJs;
        alert("custom:" + item.CustomerID);
    };

    context.deleteCallBack = function (obj) {
        var item = obj.dataitemJs;
        alert("delete:" + item.CustomerID);
    };
}
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
// This event is raised before the request will be send to the server.
// In this case "jautocompose='true'" (default value) then I can add additional clause here.
//
function selecting3(eventargs) {
    var context = eventargs.toPage.context;
    //context.orderBy("ContactName");
}
//
//  The request will not be send to the server. The attribute "jresturl='none'".
//  Will be showed data from previous page.
//
function selecting4(eventargs) {
    var context = eventargs.toPage.context;
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

    this.fullData = ko.computed(function () {
        return this.CompanyName() + " - " + this.ContactName();
    }, this);

    this.updateItem = function () {
        var itemreq = ko.toJSON(this);
        if ($("#page4 form").valid() == false) {
            alert("Invalid form");
            return;
        }
        $.ajax({ url: "/Mobile/UpdateViewModel1/", type: 'post',
            data: itemreq,
            contentType: 'application/json',
            error: function (request, state, error) {
                alert("Ajax error:" + error);
            },
            success: function (result) {
                alert(result);
            }
        });
    } .bind(this);

    this.deleteItem = function () {
        var itemreq = ko.toJSON(this);
        //if ($("#page4 form").valid() == false) {
        //    alert("Invalid form");
        //    return;
        //}
        $.ajax({ url: "/Mobile/DeleteViewModel1/", type: 'post',
            data: itemreq,
            contentType: 'application/json',
            error: function (request, state, error) {
                alert("Ajax error:" + error);
            },
            success: function (result) {
                alert(result);
            }
        });
    }.bind(this);
};
//
//  Databound event.
//
function databound2(event) {
    var itemKo = event.context.source;
    var itemJs = ko.toJS(itemKo);
}
//
//  Databound event.
//
function databound3(event) {
    var itemKo = event.context.source;
    var itemJs = ko.toJS(itemKo);
}
//
//  Databound event.
//
function databound4(event) {
    $.validator.unobtrusive.parse($("#page4"));
}
