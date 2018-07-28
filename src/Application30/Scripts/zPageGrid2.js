﻿
/// <reference path="jquery-1.5.1.js" />
/// <reference path="knockout-2.0.0.js" />

//
// javascript-to-IQueryable-preview-8.0  
// (c) 2012 - Stefano Marchisio - http://javascriptiqueryable.codeplex.com/ 
//

(function ($, undefined) {
    $.fn.gridTemplate = function (options, fsearch2, fsearch1) {

        var that = this;

        var basegrid = new PagingBase();  

        var undefined;

        var settings = {
            ttype: '1',
            tpane1: 'gpane1',
            tpane2: 'gpane2',
            tpane3: 'gpane3',
            tsearch1: 'gbutton1',
            tsearch2: 'gbutton6',
            tpageF: 'gbutton2',
            tpageP: 'gbutton3',
            tpageN: 'gbutton4',
            tpageL: 'gbutton5',
            //
            tcontainer: "",
            ttemplate: "",
            turlpath: "",
            tcacheEnabled: false,
            tlinqEnabled: true,
            tdetailPanel: "",
            tdetailContainer: "",
            tcreatePanel: "",
            tcreateContainer: "",
            tmodifyPanel: "",
            tmodifyContainer: "",
            tdlgparent: { modal: true, width: 600 },
            tdlgdetail: { modal: true, width: 600 },
            tdlgcreate: { modal: true, width: 600 },
            tdlgmodify: { modal: true, width: 600 },
            tknockoutValidation: false,
            tcustomCallBack: undefined,
            tdeleteCallBack: undefined,
            tinsertCallBack: undefined,
            tupdateCallBack: undefined,
            tcancelCallBack: undefined,
            tformViewModel: undefined,
            tcreateViewModel: undefined,
            tenableBackup: true,
            tpage: 1
        };

        var omethods = {
            initialize: function (args) {
                var st = settings;
                basegrid.mainpane = st.tpane2;
                basegrid.container = st.tcontainer; 
                basegrid.container = st.tcontainer;
                basegrid.template = st.ttemplate;
                basegrid.urlpath = st.turlpath;
                basegrid.cacheEnabled = st.tcacheEnabled;
                basegrid.linqEnabled = st.tlinqEnabled;
                basegrid.detailPanel = st.tdetailPanel;
                basegrid.detailContainer = st.tdetailContainer;
                basegrid.dlgdetail = st.tdlgdetail;
                basegrid.createPanel = st.tcreatePanel;
                basegrid.createContainer = st.tcreateContainer;
                basegrid.dlgcreate = st.tdlgcreate;
                basegrid.modifyPanel = st.tmodifyPanel;
                basegrid.modifyContainer = st.tmodifyContainer;
                basegrid.dlgmodify = st.tdlgmodify;
                basegrid.knockoutValidation = st.tknockoutValidation;
                basegrid.customCallBack = st.tcustomCallBack;
                basegrid.deleteCallBack = st.tdeleteCallBack;
                basegrid.insertCallBack = st.tinsertCallBack;
                basegrid.updateCallBack = st.tupdateCallBack;
                basegrid.cancelCallBack = st.tcancelCallBack;
                basegrid.createViewModel = st.tcreateViewModel;
                basegrid.enableBackup = st.tenableBackup;
                basegrid.initPagingBase(); 
                //
                if (settings.tformViewModel) {
                    var formpanel = $("#" + st.tpane1 + " .viewmodel").get(0);
                    omethods._confKnockoutForm(formpanel);
                }
                $("#" + st.tsearch1).click(function (e) {
                    e.stopPropagation();
                    if (basegrid.hasWaitingRequest() === false) {
                        if (fsearch1) fsearch1(basegrid);
                        omethods._setupPanel(2);
                    }
                    else alert("WaitingRequest");
                });
                $("#" + st.tsearch2).click(function (e) {
                    e.stopPropagation();
                    if (basegrid.hasWaitingRequest() === false) {
                        if (fsearch2) fsearch2(basegrid);
                        basegrid.loadData();
                        omethods._setupPanel(3);
                    }
                    else alert("WaitingRequest");
                });
                $("#" + st.tpageF).click(function (e) {
                    e.stopPropagation();
                    basegrid.pageF();
                });
                $("#" + st.tpageP).click(function (e) {
                    e.stopPropagation();
                    basegrid.pageP();
                });
                $("#" + st.tpageN).click(function (e) {
                    e.stopPropagation();
                    basegrid.pageN();
                });
                $("#" + st.tpageL).click(function (e) {
                    e.stopPropagation();
                    basegrid.pageL();
                });
                //              
                $(basegrid).bind('isloading', function (event) {
                    $(that).trigger(event);
                    if ($("#" + settings.tpane3).length != 0) {
                        if (event.isloading == true)
                            $("#" + settings.tpane3).show();
                        else
                            $("#" + settings.tpane3).hide();  
                    };
                });
                $(basegrid).bind('popupdetail', function (event) {  
                    $(that).trigger(event);
                });
                $(basegrid).bind('popupcreate', function (event) {
                    $(that).trigger(event);
                });
                $(basegrid).bind('popupmodify', function (event) {
                    $(that).trigger(event); 
                });
                $(basegrid).bind('databound', function (event) {
                    $(that).trigger(event); 
                });              
                //
                omethods._setupPanel(1); 
            },

            _confKnockoutForm: function (formpanel) {
                ko.cleanNode(formpanel);
                var form = settings.tformViewModel();
                basegrid.formViewModel = form;
                ko.applyBindings(form, formpanel); 
            },

            _setupPanel: function (value) {
                var st = settings;
                if (value == 1) {
                    if (st.ttype == "1") {
                        $("#" + st.tpane1).hide();
                        $("#" + st.tpane2).hide();
                    }
                    else {
                        $("#" + st.tpane1).hide();
                        $("#" + st.tpane2).show();
                    }
                }
                if (value == 2) {
                    if (st.ttype == "1") {
                        $("#" + st.tpane1).show();
                        $("#" + st.tpane2).hide();
                    }
                    else $("#" + st.tpane1).dialog(st.tdlgparent);
                }
                if (value == 3) {
                    if (st.ttype == "1") {
                        $("#" + st.tpane1).hide();
                        $("#" + st.tpane2).show(); 
                    }
                    else $("#" + st.tpane1).dialog("close");
                }
            },

            getObjectInstance: function () {
                return $(this).data("__PagingBase__");
            },

            refresh: function () {
                var obj = $(this).data("__PagingBase__");
                return obj.refresh();
            },

            getSource: function () {
                var obj = $(this).data("__PagingBase__");
                return obj.source;
            },           

            closeCreateDialogFeilure: function () {
                var obj = $(this).data("__PagingBase__");
                obj._closeCreateDialogFeilure();
            },

            closeCreateDialogSuccess: function () {
                var obj = $(this).data("__PagingBase__");
                obj._closeCreateDialogSuccess();
            },

            closeModifyDialogFeilure: function () {
                var obj = $(this).data("__PagingBase__");
                obj._closeModifyDialogFeilure();
            },

            closeModifyDialogSuccess: function () {
                var obj = $(this).data("__PagingBase__");
                obj._closeModifyDialogSuccess();
            }
        };

        if (!omethods[options]) {
            $(this).data("__PagingBase__", basegrid);
            return this.each(function (i, el) {
                if (options) {
                    $.extend(settings, options);
                }
                arguments[0] = settings;
                omethods.initialize.apply(this, arguments);
            });
        }
        else {
            return omethods[options].apply(this, arguments);
        }

    };
})(jQuery);
