
/// <reference path="jquery-1.5.1.js" />
/// <reference path="knockout-2.0.0.js" />

var context = {};
$(document).ready(function () {
    var search = $(".viewmodel").get(0);
    context = new PagingBase();
    context.mainpane = "result1";
    context.container = "result2";
    context.linqEnabled = false;
    var form = {
      campo1: ko.observable(""),
      campo2: ko.observable("")
    };
    context.formViewModel = form;
    ko.applyBindings(form, search);
    $("#button1").click(function (e) {
        startsearch1(context);
    });
    $("#button2").click(function (e) {
        startsearch2(context);
    });
    $("#button3").click(function (e) {
        startsearch3(context);
    });
});

function startsearch1(context) {
    context.clearSearch();
    var swhere = context.koWhereString();
    context.from("/Grid4/GetDataJson1").where(swhere).orderBy(
      "Country,City desc").applyTempKo(mapKnock).loadData();
};

function startsearch2(context) {
    context.clearSearch();
    var swhere = context.koWhereString();
    context.from("/Grid4/GetDataJson1").where(swhere).orderBy(
      "City,Country desc").applyTempKo(mapKnock).loadData();
};

function startsearch3(context) {
    context.clearSearch();
    var swhere = context.koWhereString();
    context.from("/Grid4/GetDataJson1").where(swhere).
       applyTempKo(mapKnock, tmpKnock).loadData();
};

//
// Apply manual knockout template
//

function tmpKnock(data) {
    var ele = $("#result2").get(0);
    ko.cleanNode(ele);
    $("#result2").empty();
    ko.applyBindings(data, ele);
};

//
// ViewModel - convert sample data to observable
//

function mapKnock(data) {
    var viewmodel = ko.utils.arrayMap(data, function (item) {
        return new dataItem(new dataSource(), item);
    });
    return ko.observableArray(viewmodel);
};

function dataItem(srv, item) {
    var that = this;

    this.message = ko.observable("");
    this.CustomerID = ko.observable(item.CustomerID);
    this.CompanyName = ko.observable(item.CompanyName);
    this.ContactTitle = ko.observable(item.ContactTitle);
    this.Address = ko.observable(item.Address);
    this.City = ko.observable(item.City);

    this.fullData = ko.computed(function () {
        return this.CompanyName() + " - " + this.ContactTitle();
    }, this);

    $(srv).bind("updated", function (event) {
        var result = event.eventargs.result;
        //obj.context.refresh();
        that.message(result);
    });

    $(srv).bind("deleted", function (event) {
        var result = event.eventargs.result;
        //obj.context.refresh();
        that.message(result);
    });

    this.updateItem = function () {
        var itemreq = ko.toJSON(this);
        srv.updateItem(itemreq);
    }.bind(this);

    this.deleteItem = function () {
        var itemreq = ko.toJSON(this);
        srv.deleteItem(itemreq);      
    }.bind(this);
};

//
// Model
//

function dataSource() {
    var that = this;

    this.updateItem = function (itemreq) {
        $.ajax({ url: "/Grid4/Update/", type: 'post',
            data: itemreq,
            contentType: 'application/json',
            error: function (request, state, error) {
                alert("Ajax error:" + error);
            },
            success: function (result) {
                that.reiseCompleted("updated", result);
            }
        });
    };

    this.deleteItem = function (itemreq) {
        $.ajax({ url: "/Grid4/Delete/", type: 'post',
            data: itemreq,
            contentType: 'application/json',
            error: function (request, state, error) {
                alert("Ajax error:" + error);
            },
            success: function (result) {
                that.reiseCompleted("deleted", result);
            }
        });
    };

    this.reiseCompleted = function (event, result) {
        var event = jQuery.Event(event);
        var argevent = { result: result };
        event.eventargs = argevent;
        $(this).trigger(event);
    };
};
