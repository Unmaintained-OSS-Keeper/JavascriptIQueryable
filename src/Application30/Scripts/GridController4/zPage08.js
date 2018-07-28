
/// <reference path="jquery-1.5.1.js" />
/// <reference path="knockout-2.0.0.js" />

$(document).ready(function () {
    var settings = {
        tpane1: 'gpane1',
        tpane2: 'gpane2',
        tcontainer: "jlist",
        tformViewModel: function () {
            return {
                city: ko.observable(""),
                country: ko.observable("")
            };
        },
        tcustomCallBack: function (obj) {
            customfrm(obj);
        },
        tdeleteCallBack: function (obj) {
            deletefrm(obj);
        },
        tupdateCallBack: function (obj) {
            updatefrm(obj);
        },
        tcancelCallBack: function (obj) {
            cancelfrm(obj);
        },
        tcacheEnabled: false,
        tdetailPanel: "gdialog1",
        tdetailContainer: "jlist1",
        tmodifyPanel: "gdialog2",
        tmodifyContainer: "jlist2",
        tknockoutValidation: true,
        tlinqEnabled: true,
        ttype: "2"
    };
    $("#gpane2").gridTemplate(settings, searchfrm).
      bind('popupdetail', function (event) {
          //alert("databound");
      }).
      bind('popupmodify', function (event) {
          //alert("databound");
      }).
      bind('databound', function (event) {
          //alert("databound");
      });
});

function searchfrm(context) {
    context.clearSearch();

    var r = context.koWhereObjectAnd();

    context.from("/Grid4/GetDataJson2").skip(0).take(8).where(r.value,r.param).
               orderBy("Country,City desc").applyTempKo(mapKnock);
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
    this.Address = ko.observable(item.Address);
    this.City = ko.observable(item.City);
    this.Value1 = ko.observable(0);
    this.Value2 = ko.observable(0);
    this.Total = ko.observable(0);

    this.Value1.subscribe(function (value) {
        var ret = that.Value1() + that.Value2();
        that.Total(ret);
    });

    this.Value2.subscribe(function (value) {
        var ret = that.Value1() + that.Value2();
        that.Total(ret);
    });
};

function deletefrm(obj) {
    $.ajax({ url: "/Grid4/DeleteViewModel2/", type: 'post',
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
    $.ajax({ url: "/Grid4/UpdateViewModel2/", type: 'post',
        data: ko.toJSON(obj.dataitemJs),
        contentType: 'application/json',
        error: function (request, state, error) {
            obj.context.closeModifyDialogFeilure();
            alert("Ajax error:" + error);
        },
        success: function (result) {
            //obj.context.refresh();
            obj.context.closeModifyDialogSuccess();
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
