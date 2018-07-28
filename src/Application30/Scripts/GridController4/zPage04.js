
/// <reference path="jquery-1.5.1.js" />
/// <reference path="knockout-2.0.0.js" />

$(document).ready(function () {
    var settings = {
        tpane1: 'gpane1',
        tpane2: 'gpane2',
        tcontainer: "jlist",
        tformViewModel: function () {
            return {
                campo1: ko.observable(""),
                campo2: ko.observable("")
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
        tlinqEnabled: false,
        ttype: "2"
    };
    $("#gpane2").gridTemplate(settings, searchfrm).
         bind('databound', function (obj, evt) {
             //alert("databound");
         }
    );
});

function searchfrm(context) {
    context.clearSearch();

    var swhere = context.koWhereString();

    context.from("/Grid4/GetDataJson1").pagingWithSize(10).where(swhere).
                orderBy("Country,City desc ").applyTempKo();
};

function deletefrm(obj) {
    //var ret1 = obj.currentIndex();
    //var ret2 = obj.removeCurrent();
    //var ret3 = obj.getArrayJs();
    $.ajax({url:"/Grid4/Delete/", type:'post',
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
    //var ret1 = obj.currentIndex();
    //var ret2 = obj.removeCurrent();
    //var ret3 = obj.getArrayJs(); 
    $.ajax({url:"/Grid4/Update/", type:'post',
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

function customfrm(obj) {
    //alert("custom:" + obj.dataitemJs.CustomerID);
};

function cancelfrm(obj) {
    //alert("cancel:" + obj.dataitemJs.CustomerID);
};
