
/// <reference path="jquery-1.5.1.js" />
/// <reference path="knockout-2.0.0.js" />

//
// javascript-to-IQueryable-preview-4.0
// (c) 2012 - Stefano Marchisio - http://javascriptiqueryable.codeplex.com/
//

(function ($, undefined) {
    $.fn.mobileTemplate = function (options) {

        var that = this;

        var backflag = false;  

        var requestcurr = {};

        var arraysource = [];

        var settings = {
            ttype: '1'
        };

        var omethods1 = {
            initialize: function (args) { 
                var st = settings;
                //            
                $(document).bind("pageinit", function (event) {
                    omethods1.pageInit(event);
                });
                $(document).bind("pagechange", function (event, data) {
                    omethods1.pageChange(event, data);
                });
                $("*[data-jsavecurritem]").live("click", function (event) {
                    event.stopPropagation();
                    omethods1.saveCurritem(this);
                });
                $("*[data-jnavbaraction]").live("click", function (event) {
                    event.stopPropagation();
                    omethods1.navbarAction(this);
                });
                $("*[data-jtouchaction]").live("swipeleft", function (event) {
                    omethods1.swipeAction(this, "L");
                });
                $("*[data-jtouchaction]").live("swiperight", function (event) {
                    omethods1.swipeAction(this, "R");
                });
                $("*[data-jselectaction]").live("click", function (event) {
                    event.stopPropagation();
                    omethods1.execRestCall();
                });
                $("*[data-rel='back']").live("click", function (event) {
                    var field = $(this).data();
                    if (field && field.jbackcurrpage)
                        backflag = true;
                });
            },

            pageInit: function (event) {
                var sid1 = event.target.id; var cobj = {};
                $("div[data-jresturl]").each(function (i, el) {
                    var sid2 = el.id;
                    if (arraysource[sid2] != undefined)
                        return;
                    cobj = omethods1.createDatasource(el);
                    arraysource[sid2] = cobj;
                    if (cobj.sid && sid2 != cobj.sid)
                        alert("context name error");
                });
            },

            pageChange: function (event, data) {
                var currbackflag = backflag;
                backflag = false;
                var field = data.toPage.data();
                var tcontext = (     omethods1.getContextByPage(data.toPage)     );
                var fcontext = (omethods1.getContextByPage(data.options.fromPage));
                if (tcontext && tcontext.curritem)
                    tcontext.curritem = undefined;
                requestcurr = { field: field, tcontext: tcontext, fcontext: fcontext };
                if (currbackflag == true || !field || !tcontext || !tcontext.source) {
                    return;
                }
                if (tcontext.autorun == true)
                    omethods1.execRestCall();
            },

            createDatasource: function (sender) {
                var elem = $(sender);
                var sid = sender.id;
                var context = {};
                var autorun = true;
                var field = elem.data();
                var ds = new PagingBase();
                ds.initPagingBase();
                ds.linqEnabled = false;
                ds.clearSearch();
                if (field && field.jlinqenabled) {
                    ds.linqEnabled = true;
                }
                if (field && field.jautorun == false) {
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
                    ds.xselecting = eval(field.jfselecting);
                }
                if (field && field.jfisloading) {
                    $(ds).bind('isloading', function (event) {
                        (eval(field.jfisloading))(event);
                    });
                }
                if (field && field.jfdatabound) {
                    $(ds).bind('databound', function (event) {
                        (eval(field.jfdatabound))(event);
                    });
                }
                if (field && field.jpagesize) {
                    ds._setPageSize(field.jpagesize);
                }
                context = omethods1.createContext(sid, ds);
                context.autorun = autorun;
                return context;
            },

            saveCurritem: function (sender) {
                var elem = $(sender);
                var parent = elem.parents("div[data-role='page']");
                if (!parent)
                    return;
                var sid = parent.get(0).id;
                var context = omethods1.getContextByName(sid);
                if (!context)
                    return;
                var field = elem.data();
                var item = $.tmplItem(elem);
                context.curritem = item.data;
            },

            navbarAction: function (sender) {
                var elem = $(sender);
                var parent = elem.parents("div[data-role='page']");
                if (!parent)
                    return;
                var sid = parent.get(0).id;
                var context = omethods1.getContextByName(sid);
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

            swipeAction: function (sender, type) {
                var elem = $(sender);
                var sid = elem.get(0).id;
                var context = omethods1.getContextByName(sid);
                if (!context)
                    return;
                if (type == "L") {
                    context.source.pageP();
                }
                if (type == "R") {
                    context.source.pageN();
                }
            },

            execRestCall: function () {
                if (!requestcurr)
                    return;
                var field = requestcurr.field;
                var tcontext = requestcurr.tcontext;
                var fcontext = requestcurr.fcontext;
                if (omethods1.hasRestCall(field, tcontext, fcontext) == false)
                    return;
                var ds = tcontext.source;
                var param = ""; var where = "";
                if (ds.linqEnabled == false) {
                    if (field && field.jparam01) {
                        if (field.jparam01 != "") { // *
                            param = omethods1.getParam(fcontext, field.jparam01);
                            if (param != "") {
                                if (where == "")
                                    where = where + "param01=" + param;
                                else where = where + "&param01=" + param;
                            }
                        }
                    }
                    if (field && field.jparam02) {
                        if (field.jparam02 != "") { // *
                            param = omethods1.getParam(fcontext, field.jparam02);
                            if (param != "") {
                                if (where == "")
                                    where = where + "param02=" + param;
                                else where = where + "&param02=" + param;
                            }
                        }
                    }
                    if (field && field.jparam03) {
                        if (field.jparam03 != "") { // *
                            param = omethods1.getParam(fcontext, field.jparam03);
                            if (param != "") {
                                if (where == "")
                                    where = where + "param03=" + param;
                                else where = where + "&param03=" + param;
                            }
                        }
                    }
                    if (field && field.jparam04) {
                        if (field.jparam04 != "") { // *
                            param = omethods1.getParam(fcontext, field.jparam04);
                            if (param != "") {
                                if (where == "")
                                    where = where + "param04=" + param;
                                else where = where + "&param04=" + param;
                            }
                        }
                    }
                    if (field && field.jparam05) {
                        if (field.jparam05 != "") { // *
                            param = omethods1.getParam(fcontext, field.jparam05);
                            if (param != "") {
                                if (where == "")
                                    where = where + "param05=" + param;
                                else where = where + "&param05=" + param;
                            }
                        }
                    }
                    ds._swhere = where;
                }
                if (ds.xselecting) {
                    if (ds.xselecting(ds) === false)
                        return;
                }
                ds.loadData();
            },

            hasRestCall: function (field, tcontext, fcontext) {
                if (!fcontext || !fcontext.curritem)
                    return true;
                var source = tcontext.source;
                var entry = fcontext.curritem;
                if (field.jresturl != "none")
                    return true;
                source._renderTemplateClient(entry);
                source.source = entry;
                return false;
            },

            getParam: function (context, name) {
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
                        valret = jQuery.trim(valret);
                        return valret;
                    } else return valret;
                }
                if (name.indexOf(".") != -1) {
                    if (context && context.curritem) {
                        sfield = name.replace(".", "");
                        sfield = parseInt(sfield);
                        valret = context.curritem[sfield];
                        valret = jQuery.trim(valret);
                        return valret;
                    } else return valret;
                }
                valret = jQuery.trim(name);
                return valret;
            },

            getContextByName: function (name) {
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

            getContextByPage: function (page) {
                var context = undefined;
                if (!page)
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

            createContext: function (sid, ds) {
                var context = { id: sid, source: ds, autorun: true,
                    curritem: undefined
                }
                return context;
            }
        };

        if (!omethods1[options]) {
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
