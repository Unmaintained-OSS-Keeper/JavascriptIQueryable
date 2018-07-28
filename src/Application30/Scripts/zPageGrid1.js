
/// <reference path="jquery-1.5.1.min.js" />

Function.prototype.inherits = function (superclass) {
    this.prototype = new superclass();
}

// ---------------------------------------------------------

function PagingBase() {
    var undefined;
    var maxcache = 999;
    var cache = new Array(maxcache);
    var that = this;

    this.container = "";
    this.template = "";
    this.urlpath = "";
    this.cacheEnabled = false;
    this.linqEnabled = true;
    this.dlgdetail = { modal: true, width: 600 };
    this.source = {};
      
    this._owhere = {};
    this._swhere = "";
    this._sorder = "";
    this._typeview = "client"; 
    this.templatename = ""; // *
    this._callBackTemplate = null; // *
    this._callBackContinue = null;
    this._enablepaging = false;
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
        $("*[data-jdetailaction]").live("click", function (event) {
            that._detailAction(this);
        });             
    }

    this._setColumnOrder = function (col) {
        var ord = $(this).data("colorder");
        var scol = "";
        if (ord == "desc") 
            ord = "asc";
        else ord = "desc";
        $(this).data("colorder", ord);
        scol = col + " " + ord
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
        if (this.linqEnabled == false) {
            this._swhere = pvalue1;
            return;
        }
        var pvalue2 = this._formatParam(pvalue2);
        this._message.where.value = pvalue1;
        this._message.where.param = pvalue2;
    }

    this._setOrder = function (pvalue1, pvalue2) {
        if (this.linqEnabled == false) {
            this._sorder = pvalue1;
            return;
        }
        this._message.order.value = pvalue1;
        this._message.order.param = pvalue2;
    }

    this._setSelect = function (pvalue1, pvalue2) {
        if (this.linqEnabled == false) {
            return;
        }
        this._message.select.value = pvalue1;
        this._message.select.param = pvalue2;
    }

    this._setTake = function (pvalue) {
        if (this.linqEnabled == false) {
            return;
        }
        this._enablepaging = false;
        this._message.take = pvalue;
        this._pagesize = 9999;
    }

    this._setSkip = function (pvalue) {
        if (this.linqEnabled == false) {
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

    this.loadData = function () {
        if (this._isCacheEnabled() == true)
            this._resetCache();
        this._pagemin = +1;
        this._pagemax = +1;
        this._records = -1;
        this._page = 1;
        this.pageIndex(1);
    }

    this.refresh = function () {
        if (this._isCacheEnabled() == true)
            this._resetCache();
        this.pageIndex(this._page);
    }

    this.clearSearch = function () {
        this._owhere = {};
        this._swhere = "";
        this._typeview = "client";
        this._callBackTemplate = null;
        this._callBackContinue = null;
        this._enablepaging = false;
        this._flagfirst = false;
        this._pagemin = +1;
        this._pagemax = +1;
        this._records = -1;
        this._pagesize = 9999;
        this._page = 1;
        this.templatename = this.template;
        this._callBackTemplate = this._renderTemplateClient;
        this._message = this._createMessage();
    }

    this.pageF = function () {
        if (this._enablepaging == false) {
            alert("Paging is not enabled");
            return;
        }
        if (this._records == -1)
            return;
        var npage = this._pagemin;
        this.pageIndex(npage);
    }

    this.pageP = function () {
        if (this._enablepaging == false) {
            alert("Paging is not enabled");
            return;
        }
        if (this._records == -1 || this._page <= this._pagemin)
            return;
        var npage = this._page - 1;
        this.pageIndex(npage);
    }

    this.pageN = function () {
        if (this._enablepaging == false) {
            alert("Paging is not enabled");
            return;
        }
        if (this._records == -1 || this._page >= this._pagemax)
            return;
        var npage = this._page + 1;
        this.pageIndex(npage);
    }

    this.pageL = function () {
        if (this._enablepaging == false) {
            alert("Paging is not enabled");
            return;
        }
        if (this._records == -1)
            return;
        var npage = this._pagemax;
        this.pageIndex(npage);
    }

    this.pageIndex = function (page) {
        if (this._enablepaging == false) 
            page = 1;
        this._page = page;
        if (this._isCacheEnabled() == true) 
        {
            var entry = this._findCache(page);
            if ( entry ) {
                this._renderTemplateClient(entry);
                this.source = entry;
                return;
            }          
        }
        this._raiseIsloading(true);
        var surl = this._createSearch();   
        this._sendAjaxRequest(surl);
    }

    this._createSearch = function () {
        var valret = ""; var surl = this.urlpath;
        var tkn1 = "?view"; var tkn2 = "?";
        if (this.linqEnabled == true ) {
            this._message.enablepaging = this._enablepaging;
            if (this._enablepaging == true)
                this._message.skip = (this._page - 1) * this._message.take;
            valret = "message=" + JSON.stringify(this._message);
        }
        if (this.linqEnabled == false) {
            valret = "pagecurr=" + this._page + "&pagesize=" + this._pagesize;
            if (this._swhere != "")
                valret = valret + "&" + this._swhere;
            if (this._sorder != "")
                valret = valret + "&orderby=" + this._sorder;
        }
        if (this._typeview == "server") {
            surl = surl + "?view=" + this.templatename;
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

    this._sendAjaxRequest = function (surl) {
        $.ajax(
        {
            url: surl, type: "GET", dataType: "json",
            error: function (request, state, error) {
                alert("Ajax error:" + error);
                that._raiseIsloading(false);
            },
            success: function (result, state) {
                if (that._isCacheEnabled() == true) {
                    if (result.records != that._records)
                        that._resetCache();
                    if (    result.total < maxcache    )
                        that._addCache(result);
                }
                that.source = result.rows;
                that._addIndex(that.source);
                that._records = (result.records);
                that._pagemax = ( result.total );
                that._callBackTemplate(result.rows);
                that._raiseDatabound(that, result.rows);
                if (that._flagfirst == true)
                    that._renderContinueWith();
                that._raiseIsloading(false);
                that._flagfirst = false;
            }
        });
    }

    this._addIndex = function (array) {
        if (typeof array == 'string')
            return array;
        for (var i = 0; i < array.length; i++) {
            array[i]._index = i;
        };
    }

    this._renderTemplateClient = function (sdata) {
        $("#" + this.container).empty();
        var html = this._applayTemplate(sdata);
        html.appendTo("#" + this.container);
    }

    this._renderTemplateServer = function (sdata) {
        $("#" + this.container).empty();
        $("#" + this.container).html(sdata);
    }

    this._applayTemplate = function (sdata) {
        var html = "";
        html = $("#" + this.templatename).tmpl(sdata);
        return html;
    }

    this._raiseIsloading = function (value) {
        var event = jQuery.Event("isloading");
        event.isloading = value;
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

    this._detailAction = function (sender) {
        var elem = $(sender);
        var field = elem.data();
        var jdetailpanel = "";
        var jdetailcontainer = "";
        var jdetailtemplate = "";
        var jdetailcallback = undefined;
        if (field && field.jdetailpanel) {
            jdetailpanel = field.jdetailpanel;
        }
        if (field && field.jdetailcontainer) {
            jdetailcontainer = field.jdetailcontainer;
        }
        if (field && field.jdetailtemplate) {
            jdetailtemplate = field.jdetailtemplate;
        }
        if (field && field.jdetailcallback) {
            jdetailcallback = field.jdetailcallback;
        }
        var item = $.tmplItem(elem);
        var dataitem = item.data;      
        if (!jdetailpanel || !jdetailcontainer || !jdetailtemplate) {
            if (jdetailcallback) {

                (eval(field.jdetailcallback))(dataitem);
                return;
            }
            return; 
        }    
        $("#" + jdetailcontainer).empty();
        var html = $("#" + jdetailtemplate).tmpl(dataitem);
        html.appendTo("#" + jdetailcontainer);
        $("#" + jdetailpanel).dialog(that.dlgdetail);
    }

    // ---------------------------------------------------------------

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
            if (expression == "")
                return this;
            this._setWhere(expression, param);
        }
        return this;
    }

    this.orderBy = function (expression) {
        if (typeof expression == 'string') {
            if (expression == "")
                return this;
            this._setOrder(expression, null);
        }
        return this;
    }

    this.select = function (expression) {
        if (this.linqEnabled == false) {
            alert("Linq is not enabled");
            return this;
        }
        if (typeof expression == 'string') {
            if (expression == "")
                return this;
            this._setSelect(expression, null);
        }
        return this;
    }   

    this.take = function (value) {
        if (this.linqEnabled == false) {
            alert("Linq is not enabled");
            return this;
        }
        if (typeof value == 'number') {
            this._setTake(value);
        }
        return this;
    }

    this.skip = function (value) {
        if (this.linqEnabled == false) {
            alert("Linq is not enabled");
            return this;
        }
        if (typeof value == 'number') {
            this._setSkip(value);
        }
        return this;
    }

    this.applyTempClient = function (value) {
        this.templatename = this.template;
        this._callBackTemplate = this._renderTemplateClient;
        if (   typeof value == 'string'   )
            this.templatename = value;
        if (  typeof value == 'function'  )
            this._callBackTemplate = value;
        this._typeview = "client";
        return this;
    }

    this.applyTempServer = function (value) {
        this.templatename = "";
        this._callBackTemplate = this._renderTemplateServer;
        if (   typeof value == 'string'   )
            this.templatename = value;
        if (  typeof value == 'function'  )
            this._callBackTemplate = value;
        this._typeview = "server";
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
        if (this.cacheEnabled == true && this._typeview == "client")
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

    this._addCache = function (result) {
        cache[this._page] = result.rows;
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
