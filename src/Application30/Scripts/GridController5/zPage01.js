
/// <reference path="jquery-1.5.1.js" />
/// <reference path="knockout-2.0.0.js" />

var undefined;
var key = "*key1*";
var data = undefined;
var context = {};

$(document).ready(function () {
    context = new PagingBase();
    context.container = "result1";
    context.mainpane = "panel1";
    context.customCallBack = function (obj) {
        customfrm(obj);
    };
    context.deleteCallBack = function (obj) {
        deletefrm(obj);
    };
    context.updateCallBack = function (obj) {
        updatefrm(obj);
    };
    context.cancelCallBack = function (obj) {
        cancelfrm(obj);
    };
    context.cacheEnabled = false;
    context.detailPanel = "gdialog1";
    context.detailContainer = "jlist1";
    context.modifyPanel = "gdialog2";
    context.modifyContainer = "jlist2";
    context.knockoutValidation = true;
    context.initPagingBase();
    //
    $("#button1").click(function (e) {
        startsearch1(context);
    });
    $("#button2").click(function (e) {
        startsearch2(context);
    });
    $("#button3").click(function (e) {
        startsearch3(context);
    });
    $("#button4").click(function (e) {
        startsearch4(context);
    });
    getPageData();
});

// ---------------------------------------------------------------

function startsearch1(context) {
    loadListData();
};

function startsearch2(context) {
    if (data == undefined) {
        alert("Data not found !!!");
        return;
    }
    context.clearSearch();
    context.showGridKo(data.ToArray());
};

function startsearch3(context) {
    if (data == undefined) {
        alert("Data not found !!!");
        return;
    }
    context.clearSearch();
    var result = data.Where("$.Country == 'Germany'");
    context.showGridKo(result.ToArray());
};

function startsearch4(context) {
    if (data == undefined) {
        alert("Data not found !!!");
        return;
    }
    context.clearSearch();
    var result = data.Where( "$.Country == 'Spain'" );
    context.showGridKo(result.ToArray());
};

function mapKnock(data) {
    return ko.observableArray(ko.utils.arrayMap(data, function (item) {
        return new dataItem(item);
    })
    );
};

function dataItem(item) {
    var that = this;
    this.CustomerID = ko.observable(item.CustomerID);
    this.CompanyName = ko.observable(item.CompanyName);
    this.ContactName = ko.observable(item.ContactName);
    this.Address = ko.observable(item.Address);
    this.City = ko.observable(item.City);
    this.Country = ko.observable(item.Country);
};

// ---------------------------------------------------------------

function deletefrm(obj) {
    $.ajax({ url: "/Grid5/DeleteViewModel/", type: 'post',
        data: ko.toJSON(obj.dataitemJs),
        contentType: 'application/json',
        error: function (request, state, error) {
            alert("Ajax error:" + error);
        },
        success: function (result) {
            //obj.context.refresh();
            alert(result);
        }
    });
};

function updatefrm(obj) {
    $.ajax({ url: "/Grid5/UpdateViewModel/", type: 'post',
        data: ko.toJSON(obj.dataitemJs),
        contentType: 'application/json',
        error: function (request, state, error) {
            //context.refresh();
            context.closeModifyDialogFeilure();
            alert("Ajax error: " + error);
        },
        success: function (result) {
            //context.refresh();
            context.closeModifyDialogSuccess();
            alert(result);
        }
    });
};

function customfrm(obj) {
    alert("custom:" + obj.dataitemJs.CustomerID);
};

function cancelfrm(obj) {
    alert("cancel:" + obj.dataitemJs.CustomerID);
};

// ---------------------------------------------------------------

function loadListData() {
    $.ajax({ url: "/Grid5/GetDataJson/", type: 'get',
        contentType: 'application/json',
        error: function (request, state, error) {
            alert("Ajax error:" + error);
        },
        success: function (result) {
            data = Enumerable.From(result);
            sessionStorage.setItem(key, data);
        }
    });
};

function getPageData() {
    sessionStorage.storage.getItem(key)
};
