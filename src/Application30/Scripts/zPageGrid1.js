
/// <reference path="jquery-1.5.1.js" />
/// <reference path="knockout-2.0.0.js" />

//
// javascript-to-IQueryable-preview-8.0   
// (c) 2012 - Stefano Marchisio - http://javascriptiqueryable.codeplex.com/
//

Function.prototype.inherits = function (superclass) {
    this.prototype = new superclass(); 
}

// ---------------------------------------------------------

function PagingBase() {
    var undefined;
    var maxcache = 999;
    var cache = new Array(maxcache); 
    var that = this;

    this.mainpane = "";
    this.container = "";
    this.template = "";
    this.urlpath = "";
    this.cacheEnabled = false;
    this.linqEnabled = true;
    this.detailPanel = "";
    this.detailContainer = "";
    this.dlgdetail = { modal: true, width: 600 };
    this.createPanel = "";
    this.createContainer = "";
    this.dlgcreate = { modal: true, width: 600 };
    this.modifyPanel = "";
    this.modifyContainer = "";
    this.dlgmodify = { modal: true, width: 600 };
    this.knockoutValidation = false;   
    this.customCallBack = undefined;
    this.deleteCallBack = undefined;
    this.insertCallBack = undefined;
    this.updateCallBack = undefined;
    this.cancelCallBack = undefined;
    this.formViewModel = undefined;
    this.createViewModel = undefined;
    this.enableBackup = true;
    this.source = {};

    this._colorder;   
    this._owhere = {};
    this._swhere = "";
    this._sorder = "";
    this._typeview = "client";
    this._objectCall = undefined;
    this._bkdata = undefined;
    this._currentaction = "";
    this._koenabled = false;
    this._templatename = ""; 
    this._callBackTemplate = null;
    this._callBackContinue = null;
    this._callBackMapKnock = null;
    this._enablepaging = false;
    this._waitaction = false;
    this._waitschedule = false;
    this._lastaction = "";
    this._flagfirst = false;
    this._pagesize = 9999;
    this._pagemin = 1;
    this._pagemax = 1;
    this._records = -1;
    this._page = 1;

    this._message = {
        groupresult: false,
        enablepaging: false,
        select: { value: '', param: '' },
        order: { value: '', param: '' },
        where: { value: '', param: '' },
        skip: 0,
        take: 9999
    };  

    // ---------------------------------------------------------------

    this.initPagingBase = function () {
        this._dialogConfigure();
        this._sortConfigure();
    }

    this._setColumnOrder = function (col) {
        var ord = $(this).data("colorder");
        var scol = "";
        if (ord == "desc")
            ord = "asc";
        else ord = "desc";
        $(this).data("colorder", ord);
        scol = col + " " + ord;
        if (this.linqEnabled === false) {
            this._sorder = scol;
            return;
        }
        this._message.order.value = scol;
        this._message.order.param = null;
    }

    this._setGroup = function (pvalue) {      
        this._message.groupresult = pvalue;
    }

    this._setPageSize = function (pvalue) {
        this._enablepaging = true;
        this._pagesize = pvalue;
        this._message.take = pvalue;
        this._message.skip = 0;
    }

    this._setWhere = function (pvalue1, pvalue2) {
        if (this.linqEnabled === false) {
            this._swhere = pvalue1;
            return;
        }
        var pvalue2 = this._formatParam(pvalue2);
        this._message.where.value = pvalue1;
        this._message.where.param = pvalue2;
    }

    this._setOrder = function (pvalue1, pvalue2) {
        if (this.linqEnabled === false) {
            this._sorder = pvalue1;
            return;
        }
        this._message.order.value = pvalue1;
        this._message.order.param = pvalue2;
    }

    this._setSelect = function (pvalue1, pvalue2) {
        if (this.linqEnabled === false) {
            return;
        }
        this._message.select.value = pvalue1;
        this._message.select.param = pvalue2;
    }

    this._setTake = function (pvalue) {
        if (this.linqEnabled === false) {
            return;
        }
        this._enablepaging = false;
        this._message.take = pvalue;
        this._pagesize = 9999;
    }

    this._setSkip = function (pvalue) {
        if (this.linqEnabled === false) {
            return;
        }
        this._enablepaging = false;
        this._message.skip = pvalue;
        this._pagesize = 9999;
    }

    this._formatParam = function (param) {
        if (param) {
            for (var i = 0; i < param.length; i++)
                if (!param[i]) param[i] = "";
        }
        return param;
    }

    // ---------------------------------------------------------------

    this.closeCreateDialogFeilure = function () {
        this._closeDialog("feilure", 1);
    }

    this.closeCreateDialogSuccess = function () {
        this._closeDialog("success", 1);
    }

    this.closeModifyDialogFeilure = function () {
        this._closeDialog("feilure", 2);
    }

    this.closeModifyDialogSuccess = function () {
        this._closeDialog("success", 2);
    }

    this.koWhereObjectAnd = function () {
        if (!this.formViewModel)
            return;
        var vm = this.koWhereViewModel();
        this.beginWhere("and");
        for (name in vm) {
            var value = vm[name];
            value = jQuery.trim(value);
            if (value) {
                this.addWhereClause(name, "=", value);
            }
        }
        return this.endWhere();
    }

    this.koWhereObjectOr = function () {
        if (!this.formViewModel)
            return;
        var vm = this.koWhereViewModel();
        this.beginWhere("or");
        for (name in vm) {
            var value = vm[name];
            value = jQuery.trim(value);
            if (value) {
                this.addWhereClause(name, "=", value);
            }
        }
        return this.endWhere();
    }

    this.koWhereString = function () {
        if (!this.formViewModel)
            return;
        var vm = this.koWhereViewModel();
        var clause = "";
        for (name in vm) {
            var value = vm[name];
            value = jQuery.trim(value);
            if (value) {
                if (clause != "")
                   clause = clause + "&" + name + "=" + value;
                else clause = clause + name + "=" + value;
            }
        }
        return clause;
    }

    this.koWhereViewModel = function () {
        if (!this.formViewModel)
            return;
        var vm = ko.toJS(this.formViewModel);
        return vm;
    }

    this.beginWhere = function (op) {
        this._owhere = this._createWhere(op); 
        this._owhere.beginWhere();
    }

    this.addWhereClause = function (pvalue1, pvalue2, pvalue3) {
        this._owhere.addWhereClause(pvalue1, pvalue2, pvalue3);
    }

    this.endWhere = function () {
        return this._owhere.endWhere();
    }

    this.getCurrentTemplate = function () {
        return this._templatename;
    }

    this.clearSearch = function () {
        this._bkdata = undefined;
        this._owhere = {};
        this._swhere = "";
        this._typeview = "client";
        this._objectCall = undefined;
        this._bkdata = undefined;
        this._currentaction = "";
        this._koenabled = false;
        this._callBackTemplate = null;
        this._callBackContinue = null;
        this._callBackMapKnock = null;
        this._enablepaging = false;
        this._waitaction = false;
        this._waitschedule = false;
        this._lastaction = "";
        this._flagfirst = false;
        this._pagemin = +1;
        this._pagemax = +1;
        this._records = -1;
        this._pagesize = 9999;
        this._page = 1;
        this._templatename = this.template;
        this._callBackTemplate = this._renderTemplateClient;
        this._message = this._createMessage();
        this._resetColumnOrderStyle();
        this._colorder = undefined;
    }      

    this.hasWaitingRequest = function () {
        if (this._waitaction === true || this._waitschedule === true)
            return true;
        else return false;
    }

    this.loadData = function () {
        if (this._isCacheEnabled() === true)
            this._resetCache();
        this._pagemin = +1;
        this._pagemax = +1;
        this._records = -1;
        this._page = 1;
        this._pageIndex(1, true);
    }   

    this.goPage = function (page) {
        if (this._enablepaging === false) {
            alert("Paging is not enabled");
            return;
        }
        if (this._waitaction === true || this._waitschedule === true) {
            alert("WaitingRequest");
            return;
        }
        if (this._records == -1 || page <= this._pagemin || page >= this._pagemax)
            return;      
        this._pageIndex(page, false, "pageG");
    }

    this.pageF = function (enableprefetch) {
        if (this._enablepaging === false) {
            alert("Paging is not enabled");
            return;
        }
        if (this._waitaction === true || this._waitschedule === true) {
            alert("WaitingRequest"); 
            return;
        }
        if (this._records == -1)
            return;
        var npage = this._pagemin;
        var prefetch = true;
        if (enableprefetch === false)
            prefetch = false;
        this._pageIndex(npage, prefetch, "pageF");
    }

    this.pageP = function (enableprefetch) {
        if (this._enablepaging === false) {
            alert("Paging is not enabled");
            return;
        }
        if (this._waitaction === true || this._waitschedule === true) {
            alert("WaitingRequest"); 
            return;
        }
        if (this._records == -1 || this._page <= this._pagemin)
            return;
        var npage = this._page - 1;
        var prefetch = true;
        if (enableprefetch === false)
            prefetch = false;
        this._pageIndex(npage, prefetch, "pageP");
    }

    this.pageN = function (enableprefetch) {
        if (this._enablepaging === false) {
            alert("Paging is not enabled");
            return;
        }
        if (this._waitaction === true || this._waitschedule === true) {
            alert("WaitingRequest");      
            return;
        }
        if (this._records == -1 || this._page >= this._pagemax)
            return;
        var npage = this._page + 1;
        var prefetch = true;
        if (enableprefetch === false)
            prefetch = false;
        this._pageIndex(npage, prefetch, "pageN");
    }

    this.pageL = function (enableprefetch) {
        if (this._enablepaging === false) {
            alert("Paging is not enabled");
            return;
        }
        if (this._waitaction === true || this._waitschedule === true) { 
            alert("WaitingRequest"); 
            return;
        }
        if (this._records == -1)
            return;
        var npage = this._pagemax;
        var prefetch = true;
        if (enableprefetch === false)
            prefetch = false;
        this._pageIndex(npage, prefetch, "pageL");
    }

    this.refresh = function () {
        if (this._enablepaging === false)
            this._page = 1;
        var surl = this._createSearch(this._page);
        this._sendAjaxRequest(surl, false);
    }

    this._pageIndex = function (page, enableprefetch, actionlast) {
        if (this._enablepaging === false)
            page = 1;
        this._page = page;
        if (typeof actionlast == 'string')
            if (this._lastaction != "")
                this._lastaction = actionlast;
            else this._lastaction = "pageN";
        else this._lastaction = "pageN";
        if (this._isCacheEnabled() === true) {
            var entry = this._findCache(page);
            if (entry) {
                this.source = entry;
                if (this._koenabled == false)
                    this._renderTemplateClient(entry);
                else
                    this._renderTemplateKonock(entry);
                this._raiseDatabound(this, entry);
                if (enableprefetch === true)
                    this._prefetch1();
                return;
            }
        }
        var surl = this._createSearch(page);
        this._sendAjaxRequest(surl, enableprefetch);
        return surl;
    }

    this._createSearch = function (currpage) {
        var valret = ""; var surl = this.urlpath;
        var tkn1 = "?view"; var tkn2 = "?";
        if (this.linqEnabled === true) {
            this._message.enablepaging = this._enablepaging;
            if (this._enablepaging === true)
                this._message.skip = (currpage - 1) * this._message.take;
            valret = "message=" + JSON.stringify(this._message);
        }
        if (this.linqEnabled === false) {
            valret = "pagecurr=" + currpage + "&pagesize=" + this._pagesize;
            if (this._swhere != "")
                valret = valret + "&" + this._swhere;
            if (this._sorder != "")
                valret = valret + "&orderby=" + this._sorder;
        }
        if (this._typeview == "server") {
            surl = surl + "?view=" + this._templatename;
        }
        if (surl.indexOf(tkn1) != -1) {
            valret = "&" + valret;
            valret = surl + valret;
            return valret;
        }
        if (surl.indexOf(tkn2) == -1) {
            valret = "?" + valret;
            valret = surl + valret;
            return valret;
        }
        valret = surl + valret;
        return valret;
    }

    this._sendAjaxRequest = function (surl, enableprefetch) {
        this._waitaction = true;
        this._raiseIsloading(true, this.page);
        var arrsource = [];
        $.ajax(
        {
            url: surl, type: "GET", dataType: "json",
            error: function (request, state, error) {
                alert("Ajax error:" + error);
                that._raiseIsloading(false);
                that._waitaction = false;
            },
            success: function (result, state) {
                that._debugFetch1(that._page);
                arrsource = that._tryObservable(result.rows);
                if (that._isCacheEnabled() === true) {
                    if (result.records != that._records)
                        that._resetCache();
                    if (    result.total < maxcache    )
                        that._addCache1(arrsource);
                }
                that.source = arrsource;
                that._addIndex(that.source);
                that._records = (result.records);
                that._pagemax = ( result.total );
                that._callBackTemplate(arrsource);
                that._raiseDatabound(that, arrsource);
                if (that._flagfirst === true)
                    that._renderContinueWith();
                that._flagfirst = false;
                that._raiseIsloading(false, that.page);
                that._waitaction = false;
                if (enableprefetch === true)
                    that._prefetch1();
            }
        });
    }

    this._addIndex = function (array) {
        if (   typeof array == 'string'   )
            return array;
        if (ko.isObservable(array) == true)
            return array;
        for (var i = 0; i < array.length; i++) {
            array[i]._index = i;
        };
    }

    this._renderObjectCall = function (sdata) {
        var func = this._objectCall;
        func.object[method](func.elem, sdata, func.param);
    }

    this._renderTemplateKonock = function (sdata) {
        var ele = $("#" + this.container).get(0);
        ko.cleanNode(ele);
        $("#" + this.container).empty();
        ko.applyBindings(sdata, ele);
    }

    this._renderTemplateClient = function (sdata) { 
        $("#" + this.container).empty();
        var html = this._applayTemplate1(sdata);
        html.appendTo("#" + this.container);
    }

    this._renderTemplateServer = function (sdata) {
        $("#" + this.container).empty().html(sdata);
    }

    this._applayTemplate1 = function (sdata) {
        var html = $("#" + this._templatename).tmpl(sdata);
        return html;
    }

    this._applayTemplate2 = function (sdata) {
        var html = $("#" + this._templatename).tmpl(sdata);
        return html;
    }

    this._raiseIsloading = function (bstatus, npage) {
        var event = jQuery.Event("isloading");
        event.isloading = bstatus;
        event.npage = npage;
        $(this).trigger(event);
    }

    this._raiseDatabound = function (context, sdata) {
        var event = jQuery.Event("databound");
        event.context = context;
        event.sdata = sdata;
        $(this).trigger(event);
    }

    this._renderContinueWith = function () {
        if (!this._callBackContinue)
            return;
        var view = $("#" + this.container);
        this._callBackContinue(view);
    }

    this._dialogConfigure = function () {
        var dlgcurritem1 = undefined;
        var dlgcurritem2 = undefined; 
        var dlgcurritem3 = undefined;
        if (this.mainpane) {
            var $conf1 = $("#" + this.mainpane);
            $conf1.delegate("*[data-jdetailaction]", "click", function (event) {
                event.stopPropagation();
                dlgcurritem1 = this;
                that._detailAction(this);
            });
            $conf1.delegate("*[data-jcreateaction]", "click", function (event) {
                event.stopPropagation();
                dlgcurritem2 = this;
                that._createAction(this);
            });
            $conf1.delegate("*[data-jmodifyaction]", "click", function (event) {
                event.stopPropagation();
                dlgcurritem3 = this;
                that._modifyAction(this);
            });
            $conf1.delegate("*[data-jcustomaction]", "click", function (event) {
                event.stopPropagation();
                that._customAction(this);
            });
            $conf1.delegate("*[data-jdeleteaction]", "click", function (event) {
                event.stopPropagation();
                that._deleteAction(this);
            });
        }
        if (this.createPanel) {
            var $conf2 = $("#" + this.createPanel);
            $conf2.delegate("*[data-jinsertaction]", "click", function (event) {
                event.stopPropagation();
                that._insertAction(this);
            });
            $conf2.delegate("*[data-jcancelaction]", "click", function (event) {
                event.stopPropagation();
                $("#" + that.createPanel).dialog("close");
            });
        }
        if (this.modifyPanel) {
            var $conf3 = $("#" + this.modifyPanel);
            $conf3.delegate("*[data-jupdateaction]", "click", function (event) {
                event.stopPropagation();
                that._updateAction(this);
            });
            $conf3.delegate("*[data-jcancelaction]", "click", function (event) {
                event.stopPropagation();
                $("#" + that.modifyPanel).dialog("close");
            });
        }
        if (this.detailPanel) {
            var $conf4 = $("#" + this.detailPanel);
            $conf4.live("dialogopen", function () {
                if (!dlgcurritem1)
                    return;
                var parent = $(dlgcurritem1).parents(".pagingbase-ui-selected-ou");
                if (parent.length > 0) {
                    parent.eq(0).removeClass("pagingbase-ui-selected-ou");
                    parent.eq(0).addClass("pagingbase-ui-selected-in");
                }
            });
            $conf4.live("dialogclose", function () {
                if (!dlgcurritem1)
                    return;
                var parent = $(dlgcurritem1).parents(".pagingbase-ui-selected-in");
                if (parent.length > 0) {
                    parent.eq(0).removeClass("pagingbase-ui-selected-in");
                    parent.eq(0).addClass("pagingbase-ui-selected-ou");
                }
            });
        }
        if (this.createPanel) {
            var $conf5 = $("#" + this.createPanel);
            $conf5.live("dialogopen", function () {
                if (!dlgcurritem2)
                    return;
                var parent = $(dlgcurritem2).parents(".pagingbase-ui-selected-ou");
                if (parent.length > 0) {
                    parent.eq(0).removeClass("pagingbase-ui-selected-ou");
                    parent.eq(0).addClass("pagingbase-ui-selected-in");
                }
            });
            $conf5.live("dialogclose", function () {
                if (!dlgcurritem2)
                    return;
                var parent = $(dlgcurritem2).parents(".pagingbase-ui-selected-in");
                if (parent.length > 0) {
                    parent.eq(0).removeClass("pagingbase-ui-selected-in");
                    parent.eq(0).addClass("pagingbase-ui-selected-ou");
                }
                if (that._currentaction == "")
                    that._cancelAction(dlgcurritem2, 1);
            });
        }
        if (this.modifyPanel) {
            var $conf6 = $("#" + this.modifyPanel);
            $conf6.live("dialogopen", function () {
                if (!dlgcurritem3)
                    return;
                var parent = $(dlgcurritem3).parents(".pagingbase-ui-selected-ou");
                if (parent.length > 0) {
                    parent.eq(0).removeClass("pagingbase-ui-selected-ou");
                    parent.eq(0).addClass("pagingbase-ui-selected-in");
                }
            });
            $conf6.live("dialogclose", function () {
                if (!dlgcurritem3)
                    return;
                var parent = $(dlgcurritem3).parents(".pagingbase-ui-selected-in");
                if (parent.length > 0) {
                    parent.eq(0).removeClass("pagingbase-ui-selected-in");
                    parent.eq(0).addClass("pagingbase-ui-selected-ou");
                }
                if (that._currentaction == "")
                    that._cancelAction(dlgcurritem3, 2);
            });
        }
    }

    this._sortConfigure = function () {
        var $conf = $("#" + this.mainpane);
        $conf.delegate("*[data-sort]", "click", function (event) {
            event.stopPropagation();
            if (that.hasWaitingRequest() === false) {
                if (that._records < 1)
                    return;
                var colorder = "";
                var field = $(this).data();
                if (!field || !field.sort) 
                    return;
                colorder = field.sort;
                that._setColumnOrderStyle(this);
                that._setColumnOrder(colorder);
                that.loadData();
            }
            else alert("WaitingRequest");
        });
    }

    this._detailAction = function (sender) {
        var elem = $(sender);
        var field = elem.data();
        var jdetailtemplate = "";
        var dataitem = {};
        this._currentaction = "";
        if (field && field.jdetailtemplate) {
            jdetailtemplate = field.jdetailtemplate;
        }
        if (this._koenabled == false) {
            dataitem = $.tmplItem(elem).data;
            $("#" + this.detailContainer).empty();
            var html = $("#" + jdetailtemplate).tmpl(dataitem);
            html.appendTo("#" + this.detailContainer);
            $("#" + this.detailPanel).dialog(that.dlgdetail);
            this._raisePopupDetail(sender);
        }
        if (this._koenabled == true) {
            dataitem = ko.dataFor(sender);
            var ele = $("#" + this.detailContainer).get(0);
            ko.cleanNode(ele);
            $("#" + this.detailContainer).empty();
            ko.applyBindings(dataitem, ele);
            $("#" + this.detailPanel).dialog(that.dlgdetail);
            this._raisePopupDetail(sender); 
        }
    }

    this._createAction = function (sender) {
        var elem = $(sender);
        var field = elem.data();
        this._currentaction = "";
        this._koenabled = true;
        var dataitem = this.createViewModel(sender);
        var ele = $("#" + this.createContainer).get(0);
        ko.cleanNode(ele);
        $("#" + this.createContainer).empty();
        ko.applyBindings(dataitem, ele);
        $("#" + this.createPanel).dialog(that.dlgcreate);
        this._raisePopupCreate(ele);
        this._parseUnobtrusive(ele);
    }

    this._modifyAction = function (sender) {
        if (this._koenabled == false) {
            alert("modifyAction allowed if knockout")
            return;
        }
        var elem = $(sender);
        var field = elem.data();
        this._currentaction = "";
        var dataitem = ko.dataFor(sender);     
        var ele = $("#" + this.modifyContainer).get(0);
        ko.cleanNode(ele);
        $("#" + this.modifyContainer).empty();
        ko.applyBindings(dataitem, ele);
        $("#" + this.modifyPanel).dialog(that.dlgmodify);
        this._backupDataItem(dataitem);
        this._raisePopupModify(sender);
        this._parseUnobtrusive(ele);
    }

    this._customAction = function (sender) {
        if (this._koenabled == false) {
            alert("customAction allowed if knockout")
            return;
        }
        this._bkdata = undefined;
        var param = this._getActionParam(sender);
        this.customCallBack(param);
    } 

    this._deleteAction = function (sender) {
        if (this._koenabled == false) {
            alert("deleteAction allowed if knockout")
            return;
        }
        this._bkdata = undefined;
        var param = this._getActionParam(sender);
        this.deleteCallBack(param);
    }

    this._insertAction = function (sender) {
        if (this._koenabled == false) {
            alert("insertAction allowed if knockout")
            return;
        }
        var elem = this._getCreateContainer();
        var param = this._getActionParam(elem);
        if (this._jqueryValidateCreateForm() == true)
            this.insertCallBack(param);
    }

    this._updateAction = function (sender) {
        if (this._koenabled == false) {
            alert("updateAction allowed if knockout")
            return;
        }
        var elem = this._getModifyContainer();
        var param = this._getActionParam(elem);
        if (this._jqueryValidateModifyForm() == true)
            this.updateCallBack(param);
    }

    this._cancelAction = function (sender, type) {
        if (this._koenabled == false) {
            alert("cancelAction allowed if knockout")
            return;
        }
        var elem;
        if (type == 1)
            elem = this._getCreateContainer();
        if (type == 2)
            elem = this._getModifyContainer();
        var param = this._getActionParam(elem);
        this._restoreDataItem(param); 
        this.cancelCallBack(param);
        this._bkdata = undefined;
    }

    this._jqueryValidateCreateForm = function () {
        if (this._koenabled == false) {
            return true;
        }
        if (this.knockoutValidation == false) {
            return true;
        }
        var form = "#" + this.createPanel + " form";
        return $(form).valid();
    }

    this._jqueryValidateModifyForm = function () {
        if (    this._koenabled == false    ) {
            return true;
        }
        if (this.knockoutValidation == false) {
            return true;
        }
        var form = "#" + this.modifyPanel + " form";
        return $(form).valid();
    }

    this._parseUnobtrusive = function (sender) {
        jQuery.validator.unobtrusive.parse($("form", sender));
    }

    this._closeDialog = function (status, type) {
        if (type == 2 && status == "feilure" && this.enableBackup == true ) {
            if (this._koenabled == true && this._bkdata != undefined) {
                var elem = this._getModifyContainer();
                var param = this._getActionParam(elem); 
                this._restoreDataItem(param);
            }
        }           
        this._bkdata = undefined;
        this._currentaction = "closeDialog";
        if (type == 1)
            $("#" + that.createPanel).dialog("close");
        if (type == 2)
            $("#" + that.modifyPanel).dialog("close");
        this._currentaction = "";
    }

    this._restoreDataItem = function (param) {
        if (this._koenabled == false || this.enableBackup == false)
            return;
        if (              this._bkdata == undefined               )
            return;
        var dataitemKo = param.dataitemKo;
        for (name in this._bkdata) {
            var cmd = "";
            if (typeof this._bkdata[name] == "string" ) {
                cmd = "dataitemKo." + name + "('" + this._bkdata[name] + "')";
            }
            if (typeof this._bkdata[name] == "number" ) {
                cmd = "dataitemKo." + name + "("  + this._bkdata[name] +  ")";
            }
            if (typeof this._bkdata[name] == "boolean") {
                cmd = "dataitemKo." + name + "("  + this._bkdata[name] +  ")";
            }
            if (cmd != "") eval(cmd);
        }
        param.dataitemJs = ko.toJS(dataitemKo);
    }

    this._backupDataItem = function (dataitemKo) {
        if (this._koenabled == false || this.enableBackup == false) 
            return;
        this._bkdata = {};
        var dataitemJs = ko.toJS(dataitemKo);
        for (name in dataitemJs) {
            if (dataitemJs.hasOwnProperty(name) == false)
                continue;
            if (typeof dataitemJs[name] == "string" ) {
                this._bkdata[name] = dataitemJs[name];
            }
            if (typeof dataitemJs[name] == "number" ) { 
                this._bkdata[name] = dataitemJs[name];
            }
            if (typeof dataitemJs[name] == "boolean") {
                this._bkdata[name] = dataitemJs[name];
            }
        }
        return this._bkdata;
    } 

    this._getActionParam = function (elem) {
        var dataitemKo =  ko.dataFor(elem);
        var dataitemJs = ko.toJS(dataitemKo);
        var param = {
            context: that,
            dataitemJs: dataitemJs,
            dataitemKo: dataitemKo,
            removeCurrent: function () {
                return this.context.source.remove(dataitemKo);
            },
            currentIndex: function () {
                return this.context.source.indexOf(dataitemKo);
            },           
            getArrayJs: function () {
                return ko.toJS(this.context.source);
            },
            getArrayKo: function () {
                return this.context.source; 
            }         
        };
        return param;
    }

    this._getDetailContainer = function () {
        var elem = $("#" + this.detailContainer).get(0);
        return elem;
    }

    this._getCreateContainer = function () {
        var elem = $("#" + this.createContainer).get(0);
        return elem;
    }   

    this._getModifyContainer = function () {
        var elem = $("#" + this.modifyContainer).get(0);
        return elem;
    }

    this._raisePopupDetail = function (elem) {
        var event = jQuery.Event("popupdetail");
        event.elemitem = elem;
        $(this).trigger(event);
    }

    this._raisePopupCreate = function (elem) {
        var event = jQuery.Event("popupcreate");
        event.elemitem = elem;
        $(this).trigger(event);
    }  

    this._raisePopupModify = function (elem) {
        var event = jQuery.Event("popupmodify");
        event.elemitem = elem;
        $(this).trigger(event);
    }                                     

    // ---------------------------------------------------------------

    this._applayTransition = function () {
        var pane = $("#" + this.container);
        if (event.isloading ===  true)
            pane.css("opacity", 0.3);
        if (event.isloading === false)
            pane.css("opacity", 1.0);
    }

    this._resetColumnOrderStyle = function () {
        var class1 = "pagingbase-ui-ordercol-selected";
        if (this._colorder) {
            var $colorder = $(this._colorder);
            $colorder.removeClass(class1);
        }        
    }

    this._setColumnOrderStyle = function (col) {
        var class1 = "pagingbase-ui-ordercol-unselected";
        var class2 =  "pagingbase-ui-ordercol-selected";
        if (this._colorder) {
            var $colorder = $(this._colorder);
            $colorder.addClass(class1);
            $colorder.removeClass(class2);
        }
        $(col).addClass(class2);
        this._colorder = col;
    }

    // ---------------------------------------------------------------

    this._prefetch1 = function () {
        if (this._enablepaging === false)
            return;
        if (this._isCacheEnabled() === false)
            return;
        if (this._waitschedule === true)
            return;
        this._waitschedule = true;
        var page = this._getPrefethPage(1);
        if (page < this._pagemin || page > this._pagemax) {
            this._goNextAction();
            return;
        }
        var surl = this._createSearch(page);
        var entry = this._findCache(page);
        if (entry) {
            that._prefetch2();
            return;
        }
        $.ajax(
        {
            url: surl, type: "GET", dataType: "json",
            error: function (request, state, error) {
                alert("Ajax error1:" + error);
                that._goNextAction();
            },
            success: function (result, state) {
                that._debugFetch2(page);
                var arrsource = [];
                arrsource = that._tryObservable(result.rows);
                //if (result.records != that._records)
                //    that._resetCache();
                //if (    result.total < maxcache    )
                //    that._addCache2(page, result);
                //that._records = (result.records);
                //that._pagemax = ( result.total );
                that._addCache2(page, arrsource);
                that._prefetch2();
            }
        });
    }
    this._prefetch2 = function () {
        if (this._enablepaging === false)
            return;
        if (this._isCacheEnabled() === false)
            return;
        var page = this._getPrefethPage(2);
        if (page < this._pagemin || page > this._pagemax) {
            this._goNextAction();
            return;
        }
        var surl = this._createSearch(page);
        var entry = this._findCache(page);
        if (entry) {
            that._prefetch3();
            return;
        }
        $.ajax(
        {
            url: surl, type: "GET", dataType: "json",
            error: function (request, state, error) {
                alert("Ajax error2:" + error);
                that._goNextAction();
            },
            success: function (result, state) {
                that._debugFetch2(page);
                var arrsource = [];
                arrsource = that._tryObservable(result.rows);
                //if (result.records != that._records)
                //    that._resetCache();
                //if (    result.total < maxcache    )
                //    that._addCache2(page, result);
                //that._records = (result.records);
                //that._pagemax = ( result.total );
                that._addCache2(page, arrsource);
                that._prefetch3();
            }
        });
    }
    this._prefetch3 = function () {
        if (this._enablepaging === false)
            return;
        if (this._isCacheEnabled() === false)
            return;
        var page = this._getPrefethPage(3);
        if (page < this._pagemin || page > this._pagemax) {
            this._goNextAction();
            return;
        }
        var surl = this._createSearch(page);      
        var entry = this._findCache(page);
        if (entry) {
            this._goNextAction();
            return;
        }
        $.ajax(
        {
            url: surl, type: "GET", dataType: "json",
            error: function (request, state, error) {
                alert("Ajax error3:" + error);
                that._goNextAction();
            },
            success: function (result, state) {
                that._debugFetch2(page);
                var arrsource = [];
                arrsource = that._tryObservable(result.rows);
                //if (result.records != that._records)
                //    that._resetCache();
                //if (    result.total < maxcache    )
                //    that._addCache2(page, result);
                //that._records = (result.records);
                //that._pagemax = ( result.total );
                that._addCache2(page, arrsource);
                that._goNextAction();
            }
        });
    }

    this._getPrefethPage = function (offset) {
        var page = 0;
        if (this._lastaction == "pageF") {
            page = this._pagemin;
            page = page + offset;
        }
        if (this._lastaction == "pageP") {
            page = this._page - (1 * offset);
        }
        if (this._lastaction == "pageN") {
            page = this._page + (1 * offset); 
        }
        if (this._lastaction == "pageL") {
            page = this._pagemax;
            page = page - offset;
        }
        return page;
    }

    this._goNextAction = function () {
        this._waitschedule = false;
        this._scheduleaction = "";
    }

    this._debugFetch1 = function (page) {
        //alert("ajax-req:" + page);
    }

    this._debugFetch2 = function (page) {
        //alert("prefetch:" + page);
    }

    // ---------------------------------------------------------------

    this.showGridKo = function (value1, value2, value3) {     
        this._callBackTemplate = this._renderTemplateKonock;
        if (   typeof value2 == 'function'   )
            this._callBackMapKnock = value2;
        if (   typeof value3 == 'function'   )
            this._callBackTemplate = value3;
        this._typeview = "client";
        this._koenabled = true;
        var arrsource = this._tryObservable(value1);       
        that.source = arrsource;
        that._callBackTemplate(arrsource);
        that._raiseDatabound(this, arrsource);
        return arrsource;
    }

    this.from = function (resturl, group) {
        this.clearSearch();
        if (typeof resturl == 'string') {
            this.urlpath = resturl;
        }
        if (typeof group == 'boolean' ) {
            this._setGroup(group);
        }
        return this;
    }

    this.pagingWithSize = function (value) {
        if (typeof value == 'number') {
            this._setPageSize(value);
        }
        return this;
    }

    this.where = function (expression, param) {
        if (typeof expression == 'string') {
            //if (expression == "")
            //    return this;
            this._setWhere(expression, param);
        }
        return this;
    }

    this.orderBy = function (expression) {
        if (typeof expression == 'string') {
            //if (expression == "")
            //    return this;
            this._setOrder(expression, null);
        }
        return this;
    }

    this.select = function (expression) {       
        if (typeof expression == 'string') {
            if (expression == "")
                return this;
            this._setSelect(expression, null);
        }
        return this;
    }   

    this.take = function (value) {
        if (this.linqEnabled === false) {
            alert("Linq not enabled");
            return this;
        }
        if (typeof value == 'number') {
            this._setTake(value);
        }
        return this;
    }

    this.skip = function (value) {
        if (this.linqEnabled === false) {
            alert("Linq not enabled");
            return this;
        }
        if (typeof value == 'number') {
            this._setSkip(value);
        }
        return this;
    }   

    this.applyTempClient = function (value) {
        this._templatename = this.template;
        this._callBackTemplate = this._renderTemplateClient;
        if (   typeof value == 'string'   )
            this._templatename = value;
        if (  typeof value == 'function'  )
            this._callBackTemplate = value;
        this._typeview = "client";
        this._koenabled = false;
        return this;
    }

    this.applyTempServer = function (value) {
        this._templatename = "";
        this._callBackTemplate = this._renderTemplateServer;
        if (   typeof value == 'string'   )
            this._templatename = value;
        if (  typeof value == 'function'  )
            this._callBackTemplate = value;
        this._typeview = "server";
        this._koenabled = false;
        return this;
    }

    this.applyTempKo = function (value1,value2) {
        this._templatename = "";
        this._callBackTemplate = this._renderTemplateKonock;   
        if (   typeof value1 == 'function'   )
            this._callBackMapKnock = value1;
        if (   typeof value2 == 'function'   )
            this._callBackTemplate = value2;
        this._typeview = "client";
        this._koenabled = true;
        return this;
    }

    this.render = function (elem, object, method, param) {
        this._objectCall = this._createObjectCall();
        this._callBackTemplate = this._renderObjectCall; 
        if (typeof elem == 'string') {
            this._objectCall.elem = elem;
        }
        if (typeof object == 'object') {
            this._objectCall.object = object;
        }
        if (typeof method == 'string') {
            this._objectCall.method = method;
        }
        if (typeof param == 'object') {
            this._objectCall.param = param;
        }
        return this;
    }

    this.continueWith = function (funcontinue) {       
        if (typeof funcontinue == 'function') {
            this._callBackContinue = funcontinue;
            this._flagfirst = true;
        }       
        return this;
    }

    this.exec = function () {      
        this.loadData();
        return this;
    }    

    // ---------------------------------------------------------------   

    this._isCacheEnabled = function () {
        var valret = false;
        if (this.cacheEnabled === true && this._typeview == "client")
            valret = true;
        return valret;
    }

    this._findCache = function (page) {
        if (this._pagemax >= maxcache)
            return;
        if (    page >= maxcache    ) 
            return;
        return cache[page];
    }

    this._addCache1 = function (result) {
        cache[this._page] = result;
    }

    this._addCache2 = function (index, result) {
        cache[index] = result;
    }

    this._tryObservable = function (result) {
        var viewmodel = result;
        if (this._koenabled == false) {
            return viewmodel;
        }
        if (this._callBackMapKnock) {
            viewmodel = this._callBackMapKnock(result);
            return viewmodel;
        }
        viewmodel = ko.mapping.fromJS(result);
        return viewmodel;
    }  

    this._resetCache = function () {
        cache = new Array(maxcache);
    }

    // ---------------------------------------------------------------

    this._createWhere = function (op) {
        //var pippo = 123; closure
        var owhere = {
            operator: op,
            _tab1: new Array(20),
            _tab2: new Array(20),
            _tab3: new Array(20),
            _index: 0,

            beginWhere: function () {
                this._tab1 = new Array(20);
                this._tab2 = new Array(20);
                this._tab3 = new Array(20);
                this._index = 0;
            },

            endWhere: function () {
                var temp1 = ""; var temp2 = new Array(this._index);
                for (var i = 0; i < this._index; i++) {
                    if (i != 0) temp1 = temp1 + " " + this.operator + " ";
                    temp1 = temp1 + this._tab1[i] + this._tab2[i] + "@" + i;
                    temp2[i] = this._tab3[i];
                }
                return { value: temp1, param: temp2 };
            },

            addWhereClause: function (pvalue1, pvalue2, pvalue3) {
                if (!jQuery.trim(pvalue3))
                    return;
                this._tab1[this._index] = jQuery.trim(pvalue1);
                this._tab2[this._index] = jQuery.trim(pvalue2);
                this._tab3[this._index] = jQuery.trim(pvalue3);
                this._index = this._index + 1;
            },

            addWhereClauseEq: function (pvalue1, pvalue2) {
                addWhereClause(pvalue1, "=", pvalue2);
            },

            addWhereClauseNq: function (pvalue1, pvalue2) {
                addWhereClause(pvalue1, "<>", pvalue2);
            }
        }
        return owhere;
    }

    // ---------------------------------------------------------------   

    this._createObjectCall = function () {
        var call = {
            elem: undefined,
            object: undefined,
            method: undefined,
            param: undefined
        }
        return call;
    }

    this._createMessage = function () {
        var msg = {
            groupresult: false,
            enablepaging: false,
            select: { value: '', param: '' },
            order: { value: '', param: '' },
            where: { value: '', param: '' },
            skip: 0,
            take: 9999
        }
        return msg;
    }
}

ko.bindingHandlers.valueStr = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var underlyingObservable = valueAccessor();
        var interceptor = ko.dependentObservable({
            read: underlyingObservable,
            write: function (value) {
                underlyingObservable(jQuery.trim(value));
            }
        });
        ko.bindingHandlers.value.init(element, function () {
            return interceptor
        }, allBindingsAccessor);
    },
    update: ko.bindingHandlers.value.update
};

ko.bindingHandlers.valueInt = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var underlyingObservable = valueAccessor();
        var interceptor = ko.dependentObservable({
            read: underlyingObservable,
            write: function (value) {
                if (!isNaN(value)) {
                    underlyingObservable(parseInt(value));
                }
            }
        });
        ko.bindingHandlers.value.init(element, function () {
            return interceptor
        }, allBindingsAccessor);
    },
    update: ko.bindingHandlers.value.update
};

ko.bindingHandlers.valueDec = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var underlyingObservable = valueAccessor();
        var interceptor = ko.dependentObservable({
            read: underlyingObservable,
            write: function (value) {
                if (!isNaN(value)) {
                    underlyingObservable(parseFloat(value));
                }
            }
        });
        ko.bindingHandlers.value.init(element, function () {
            return interceptor }, allBindingsAccessor);
    },
    update: ko.bindingHandlers.value.update
};

ko.bindingHandlers.valueBol = { 
    init: function (element, valueAccessor, allBindingsAccessor) {
        var underlyingObservable = valueAccessor();
        var interceptor = ko.dependentObservable({
            read: underlyingObservable,
            write: function (value) {
                underlyingObservable(Boolean(value));
            }
        });
        ko.bindingHandlers.value.init(element, function () {
            return interceptor
        }, allBindingsAccessor);
    },
    update: ko.bindingHandlers.value.update
};
