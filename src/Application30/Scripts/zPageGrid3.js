
/// <reference path="../JQueryMobile/jquery-1.6.2.min.js" />
/// <reference path="../JQueryMobile/jquery-1.6.2-vsdoc.js" />
/// <reference path="knockout-2.0.0.js" /> 

//
// javascript-to-IQueryable-beta-0.81 
// (c) 2012 - Stefano Marchisio - http://javascriptiqueryable.codeplex.com/  
//

(function ($, undefined) {
    $.fn.mobileTemplate = function (options) {

        var that = this;

        var backflag = false;

        var requestcurr = {};

        var arraysource = [];

        var settings = {
            tscope: undefined,
            ttype: '1'
        };

        //
        // pageinit,pagebeforeshow,jsavecurritem,pagechange
        // [data-rel='back'],pageinit,pagebeforeshow,pagechange
        //

        var omethods1 = {
            initialize: function (args) {
                var st = settings;
                //
                $(document).bind("pageinit", function (event) {
                    if (omethods1._isPage(event.target.id) == false)
                        return;
                    omethods1._pageInit(event);
                });
                $(document).bind("pagebeforeshow", function (event) {
                    if (omethods1._isPage(event.target.id) == false)
                        return;
                    if (backflag == true)
                        return;
                    omethods1._hideContainer(event);
                });
                $(document).bind("pagechange", function (event, data) {
                    if (omethods1._isPage(data.toPage.get(0).id) == false)
                        return;
                    var origin = data.options.fromPage;
                    omethods1._pageChange(event, data.toPage, origin);
                    omethods1._checkRefreshOnback(); 
                    backflag = false;
                });
                $("*[data-jsavecurritem]").live("click", function (event) {
                    event.stopPropagation();
                    omethods1._saveCurritem(this);
                });
                $("*[data-jnavbaraction]").live("click", function (event) {
                    event.stopPropagation();
                    omethods1._navbarAction(this);
                });
                $("*[data-jtouchaction]").live("swipeleft" , function (event) {
                    omethods1._swipeAction(this, "L");
                });
                $("*[data-jtouchaction]").live("swiperight", function (event) {
                    omethods1._swipeAction(this, "R");
                });
                $("*[data-jselectaction]").live("click", function (event) {
                    event.stopPropagation();
                    omethods1._execRestCall();
                });
                $("*[data-rel='back']").live("click", function (event) {
                    var field = $(this).data();
                    if (field && field.jbackcurrpage === true)
                        backflag = true;
                    else backflag = false;
                });
                $(document).bind("pageremove", function (event) {
                    omethods1._pageRemove(event);
                });
            },

            _pageInit: function (event) {
                var sid1 = event.target.id; var cobj = {};
                var cds = $("#" + sid1 + "[data-jresturl]");
                if (cds.length == 0)
                    return;
                var elem = cds.get(0);
                var sid2 = elem.id;
                if (arraysource[sid2] != undefined)
                    return;
                cobj = omethods1._createDatasource(elem);
                arraysource[sid2] = cobj;
                var field = $("#" + sid2).data();
                if (field && field.jinitialize)
                    (this._resolveScope(field.jinitialize))(cobj.source);
            },

            _pageChange: function (event, target, origin) {
                var field = target.data();
                var tcontext = (omethods1._getContextByPage(target));
                var fcontext = (omethods1._getContextByPage(origin));
                if (tcontext && tcontext.curritem)
                    tcontext.curritem = undefined;
                requestcurr = { field: field, tcontext: tcontext, fcontext: fcontext };
                if (backflag === true || !field || !tcontext || !tcontext.source)
                    return;
                if (tcontext.autorun === true)
                    omethods1._execRestCall();
            },

            _createDatasource: function (sender) {
                var elem = $(sender);
                var sid = sender.id;
                var context = {};
                var autorun = true;
                var hidebeforeajaxcall = true;
                var field = elem.data();
                var ds = new PagingBase();
                ds.mainpane = sender.id;
                ds.linqEnabled = false;
                ds.initPagingBase();
                ds.clearSearch();
                if (field && field.jautorun === false) {
                    autorun = field.jautorun;
                }
                if (field && field.jresturl) {
                    ds.urlpath = field.jresturl;
                }
                if (field && field.jtypetemplate) {
                    ds._typeview = field.jtypetemplate;
                }
                if (field && field.jcontainer) {
                    ds.container = field.jcontainer;
                }
                if (field && field.jnametemplate) {
                    ds._templatename = field.jnametemplate;
                }
                if (field && field.jfselecting) {
                    ds.xselecting = omethods1._resolveScope(field.jfselecting);
                }
                if (field && field.jfisloading) {
                    $(ds).bind("isloading.nmobile", function (event) {
                        (omethods1._resolveScope(field.jfisloading))(event);
                    });
                }
                if (field && field.jfdatabound) {
                    $(ds).bind("databound.nmobile", function (event) {
                        (omethods1._resolveScope(field.jfdatabound))(event);
                        omethods1._recreateStyle(field);
                    });
                }
                if (field && field.jhidebeforeajaxcall !== undefined)
                    hidebeforeajaxcall = field.jhidebeforeajaxcall;
                $(ds).bind("isloading.nmobile", function (event) {
                    if (hidebeforeajaxcall === true)
                        omethods1._isloading(ds, event.isloading);
                });
                if (field && field.jorderby) {
                    ds.orderBy(field.jorderby);
                }
                if (field && ds._typeview == "client" && field.jenableko ===  true) {
                    ds._callBackTemplate = ds._renderTemplateKonock;
                    ds._koenabled = true;
                }
                if (field && ds._typeview == "server" && field.jenableko === false) {
                    ds._callBackTemplate = ds._renderTemplateServer;
                    ds._koenabled = false;
                }
                if (field && field.jpagesize) {
                    ds._setPageSize(field.jpagesize);
                }
                context = omethods1._createContext(sid, ds);
                context.autorun = autorun;
                return context;
            },

            _saveCurritem: function (sender) {
                var elem = $(sender);
                var parent = elem.parents("div[data-role='page']");
                if (!parent)
                    return;
                var sid = parent.get(0).id;
                var context = omethods1._getContextByName(sid);
                if (!context)
                    return;
                var item = {};
                if (context.source._koenabled === false)
                    item = $.tmplItem(elem).data;
                else item = ko.dataFor(elem.get(0));
                context.curritem = item;
            },

            _navbarAction: function (sender) {
                var elem = $(sender);
                var parent = elem.parents("div[data-role='page']");
                if (!parent)
                    return;
                var sid = parent.get(0).id;
                var context = omethods1._getContextByName(sid);
                if (!context)
                    return;
                var field = elem.data();
                if (field && field.jnavbaraction) {
                    if (field.jnavbaraction == "refresh") {
                        context.source.refresh();
                    };
                    if (field.jnavbaraction == "pageF") {
                        context.source.pageF();
                    };
                    if (field.jnavbaraction == "pageP") {
                        context.source.pageP();
                    };
                    if (field.jnavbaraction == "pageN") {
                        context.source.pageN();
                    };
                    if (field.jnavbaraction == "pageL") {
                        context.source.pageL();
                    };
                }
            },

            _swipeAction: function (sender, type) {
                var elem = $(sender);
                var sid = elem.get(0).id;
                var context = omethods1._getContextByName(sid);
                if (!context)
                    return;
                if (type == "L") {
                    context.source.pageP();
                }
                if (type == "R") {
                    context.source.pageN();
                }
            },

            _execRestCall: function () {
                if (!requestcurr)
                    return;
                var field = requestcurr.field;
                var tcontext = requestcurr.tcontext;
                var fcontext = requestcurr.fcontext;
                var ds = tcontext.source;
                var eventargs = this._createEventArgs(fcontext, tcontext);
                if (omethods1._hasRestCall(field, tcontext, fcontext, eventargs) === false) {
                    return;
                }
                var param = ""; var where = "";
                if (field && this._isAutocompose(field) === true && ds.linqEnabled === false) {
                    if (field && field.jparam01 && field.jparam01 != "") {
                        param = omethods1._getParam(fcontext, field.jparam01);
                        if (param != "") {
                            if (where == "")
                                where = where + "param01=" + param;
                            else where = where + "&param01=" + param;
                        }
                    }
                    if (field && field.jparam02 && field.jparam02 != "") {
                        param = omethods1._getParam(fcontext, field.jparam02);
                        if (param != "") {
                            if (where == "")
                                where = where + "param02=" + param;
                            else where = where + "&param02=" + param;
                        }
                    }
                    if (field && field.jparam03 && field.jparam03 != "") {
                        param = omethods1._getParam(fcontext, field.jparam03);
                        if (param != "") {
                            if (where == "")
                                where = where + "param03=" + param;
                            else where = where + "&param03=" + param;
                        }
                    }
                    if (field && field.jparam04 && field.jparam04 != "") {
                        param = omethods1._getParam(fcontext, field.jparam04);
                        if (param != "") {
                            if (where == "")
                                where = where + "param04=" + param;
                            else where = where + "&param04=" + param;
                        }
                    }
                    if (field && field.jparam05 && field.jparam05 != "") {
                        param = omethods1._getParam(fcontext, field.jparam05);
                        if (param != "") {
                            if (where == "")
                                where = where + "param05=" + param;
                            else where = where + "&param05=" + param;
                        }
                    }
                }
                ds._swhere = where;
                if (ds.xselecting) {
                    if (ds.xselecting(eventargs) === false)
                        return;
                }
                ds.loadData();
            },

            _hasRestCall: function (field, tcontext, fcontext, eventargs) {
                var ds = tcontext.source;
                if ((!fcontext || !fcontext.curritem) && field.jresturl == "none") {
                    if (ds.xselecting)
                        ds.xselecting(eventargs);
                    return false;
                }
                if (!fcontext || !fcontext.curritem)
                    return true;
                if (    field.jresturl != "none"   )
                    return true;
                var entry = fcontext.curritem;
                if (ds.xselecting)
                    ds.xselecting(eventargs);
                ds._callBackTemplate(entry);
                ds._raiseDatabound(ds, entry);
                ds.source = entry;
                return false;
            },

            _getParam: function (context, name) {
                var valret = ""; var sfield = "";
                name = jQuery.trim(name);
                if (name.indexOf("#") != -1) {
                    sfield = $(name).val();
                    valret = jQuery.trim(sfield);
                    return valret;
                }
                if (name.indexOf("*") != -1) {
                    if (context && context.curritem) {
                        sfield = name.replace("*", "");
                        valret = context.curritem[sfield];
                        if (ko.isObservable(valret) === true)
                            valret = valret();
                        valret = jQuery.trim(valret);
                        return valret;
                    } else return valret;
                }
                if (name.indexOf(".") != -1) {
                    if (context && context.curritem) {
                        sfield = name.replace(".", "");
                        sfield = parseInt(sfield);
                        valret = context.curritem[sfield];
                        if (ko.isObservable(valret) === true)
                            valret = valret();
                        valret = jQuery.trim(valret);
                        return valret;
                    } else return valret;
                }
                valret = jQuery.trim(name);
                return valret;
            },

            _getContextByName: function (name) {
                var context = undefined;
                if (!name)
                    return context;
                name = jQuery.trim(name);
                if (arraysource[name] == undefined)
                    return context;
                context = arraysource[name]
                if (context) {
                    if (context.sid && name != context.sid)
                        alert("context name error");
                }
                return context;
            },

            _getContextByPage: function (page) {
                var context = undefined;
                if (!page || page.length == 0)
                    return context;
                var name = jQuery.trim(page.get(0).id);
                if (arraysource[name] == undefined)
                    return context;
                context = arraysource[name]
                if (context) {
                    if (context.sid && name != context.sid)
                        alert("context name error");
                }
                return context;
            },

            _hideContainer: function (event) {
                var sid = event.target.id;
                var context = omethods1._getContextByName(sid);
                var field = $(event.target).data();
                if (!context || !context.source.container)
                    return;
                if (!field || field.jresturl === "none")
                    return;
                if (!field || field.jhidebeforeajaxcall === false)
                    return;
                $("#" + context.source.container).hide();
            },

            _isloading: function (ds, status) {
                if (ds.container && status ===  true) {
                    $.mobile.showPageLoadingMsg();
                    $("#" + ds.container).hide();
                }
                if (ds.container && status === false) {
                    $.mobile.hidePageLoadingMsg();
                    $("#" + ds.container).show();
                }
            },

            _isAutocompose: function (field) {
                if (field.jautocompose === undefined)
                    return true;
                if (   field.jautocompose === true  )
                    return true;
                return false;
            },

            _isPage: function (sid) {
                if (sid || $("#" + sid).filter("div[data-role='page']").length != 0)
                    return true;
                else return false;
            },

            _createContext: function (sid, ds) {
                var context = { id: sid, source: ds, autorun: true, curritem: undefined };
                return context;
            },

            _createEventArgs: function (fcontext, tcontext) {
                var curr = undefined;
                var fctx = undefined;
                var tctx = undefined;
                if (fcontext) fctx = { id: fcontext.id, context: fcontext.source };
                if (tcontext) tctx = { id: tcontext.id, context: tcontext.source };
                if (fcontext) curr = { item: fcontext.curritem };
                var eventargs = { fromPage: fctx, toPage: tctx, curritem: curr };
                return eventargs;
            },

            _checkRefreshOnback: function () {
                var field = requestcurr.field;
                var context = requestcurr.tcontext;
                if (backflag === true && field && context && context.source) {
                    if (field.jrefreshonback === true) {
                        context.source.refresh();
                    }
                }
            },

            _resolveScope: function (func) {
                if (   settings.tscope === undefined   ) {
                    return eval(func);
                }
                if (typeof settings.tscope !== "object") {
                    return eval(func);
                }
                return settings.tscope[func];
            },

            _pageRemove: function (event) {
                var sid = event.target.id;
                var context = omethods1._getContextByName(sid);
                arraysource[sid] = undefined;
                $(context.source).unbind(".nmobile");
                context.source._dispose();
            },

            _recreateStyle: function (field) {
                if (field && field.jrecreatestyle !== true)
                    return;
                try {
                    $(".ui-page-active").page("destroy").page();
                }
                catch (e) {
                    $(".ui-page-active").page();
                }
            },

            styleActivePage: function () {
                try {
                    $(".ui-page-active").page("destroy").page();
                }
                catch (e) {
                    $(".ui-page-active").page();
                }
            }
        };

        if (!omethods1[options]) {
            //$(this).data("__mobileTemplate__", this);
            return this.each(function (i, el) {
                if (options) {
                    $.extend(settings, options);
                }
                arguments[0] = settings;
                omethods1.initialize.apply(this, arguments);
            });
        }
        else {
            omethods1[options].apply(this, arguments);
        }

    };
})(jQuery);

ko.bindingHandlers.jqmRefreshList = {
    init: ko.bindingHandlers.template.init,
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
        ko.bindingHandlers.template.update(element, valueAccessor, 
                allBindingsAccessor, viewModel, context);
        try {
            $(element).listview('refresh');
        } catch (e) {
            $(element).listview();
        }
    }
};
