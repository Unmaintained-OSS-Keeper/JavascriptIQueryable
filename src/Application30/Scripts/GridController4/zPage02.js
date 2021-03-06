﻿
/// <reference path="jquery-1.5.1.js" />
/// <reference path="knockout-2.0.0.js" />

$(document).ready(function () {
    var settings = {
        tpane1: 'gpane1',
        tpane2: 'gpane2',
        ttemplate: "jtableTemplate",
        tcontainer: "jlist",
        tformViewModel: function () {
            return {
              city: ko.observable(""),
              country: ko.observable("")
            };
        },
        tlinqEnabled: true,        
        ttype: "2"
    };
    $("#gpane2").gridTemplate(settings, searchfrm).
         bind('databound', function (event) {
             //alert("databound");
         }
    );
});

function searchfrm(context) {
    context.clearSearch();

    var r = context.koWhereObjectAnd();

    context.from("/Grid4/GetDataJson2").pagingWithSize(10).where(r.value,r.param,
              r.ptype).orderBy("Country,City desc ").applyTempClient();
};
