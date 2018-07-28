
/// <reference path="jquery-1.5.1.js" />
/// <reference path="knockout-2.0.0.js" />

$(document).ready(function () {
    var settings = {
        tpane1: 'gpane1',
        tpane2: 'gpane2',
        ttemplate: "jtableTemplate",
        tcontainer: "jlist",
        tformViewModel: function () {
            return new formViewModel();
        },
        tlinqEnabled: false,       
        ttype: "1"
    };
    $("#gpane2").gridTemplate(settings, searchfrm).
         bind('databound', function (obj, evt) {
             //alert("databound");
         }
    );
});

function formViewModel() {
    this.campo1 = ko.observable("");
    this.campo2 = ko.observable("");
};

function searchfrm(context) {
    context.clearSearch();

    var swhere = context.koWhereString();

    context.from("/Grid4/GetDataJson1").pagingWithSize(10).where(swhere).
              orderBy("Country,City desc ").applyTempClient();
};
