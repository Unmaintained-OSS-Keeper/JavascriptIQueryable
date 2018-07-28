
/// <reference path="jquery-1.5.1.js" />

(function ($) {
    $.fn.gridTemplate = function (options, fsearch2,  fsearch1) {    

        var that = this;

        var basegrid = new PagingBase();   

        var settings = { 
          ttype: '1', 
          tpane1: 'gpane1',
          tpane2: 'gpane2',
          tpane3: 'gpane3',
          tsearch1: 'gbutton1',
          tpageF: 'gbutton2',
          tpageP: 'gbutton3',
          tpageN: 'gbutton4',
          tpageL: 'gbutton5',
          tsearch2: 'gbutton6',    
          //
          tcontainer: "",
          ttemplate: "",
          turlpath: "",
          tcacheEnabled: false,   
          tlinqEnabled: true,
          tpage: 1,   
          tdlg: { modal: true, width: 600 }
        };           

        var omethods = {
            initialize: function (args) {
               var st = settings; 
               var jfldsort = " thead td[data-sort] "; 
               basegrid.container = st.tcontainer;
               basegrid.template = st.ttemplate;
               basegrid.urlpath = st.turlpath;
               basegrid.cacheEnabled = st.tcacheEnabled;
               basegrid.linqEnabled = st.tlinqEnabled;
               //
               $("#" + st.tsearch1).click(function (e) {
                   if (fsearch1) fsearch1(basegrid);
                   omethods.setupPanel(2);
               });
               $("#" + st.tsearch2).click(function (e) {
                   //basegrid.clearSearch();
                   if (fsearch2) fsearch2(basegrid);  
                   basegrid.loadData();
                   omethods.setupPanel(3);
               });
               $("#" + st.tpageF).click(function (e) {
                   basegrid.pageF();
               });
               $("#" + st.tpageP).click(function (e) {
                   basegrid.pageP();
               });
               $("#" + st.tpageN).click(function (e) {
                   basegrid.pageN();
               });
               $("#" + st.tpageL).click(function (e) {
                   basegrid.pageL();
               });
               //
               $("#" + st.tpane2 + jfldsort).click(function (e) {
                   if (basegrid.records < 1)
                       return;
                   var colorder = $(this).data().sort;   
                   basegrid._setColumnOrder(colorder);             
                   basegrid.loadData();
               });
               $(basegrid).bind('isloading', function (event) {
                   if ($("#" + settings.tpane3).length != 0)
                   {
                      if (event.isloading == true)
                         $("#" + settings.tpane3).show();
                      else
                         $("#" + settings.tpane3).hide();
                   }
               });               
               $(basegrid).bind('databound', function (event) {
                   $(that).trigger(event);
               });             
               //
               omethods.setupPanel(1);
            },

            setupPanel: function (value) {
               var st = settings;
               if (value == 1)
               {
                  if (st.ttype == "1")
                  {
                     $("#" + st.tpane1).hide();
                     $("#" + st.tpane2).hide();
                  }
                  else
                  {
                     $("#" + st.tpane1).hide();
                     $("#" + st.tpane2).show();
                  }
               }
               if (value == 2)
               {
                  if (st.ttype == "1")
                  {
                     $("#" + st.tpane1).show();
                     $("#" + st.tpane2).hide();
                  }
                  else $("#" + st.tpane1).dialog(st.tdlg);
               }
               if (value == 3) 
               {
                  if (st.ttype == "1")
                  {
                     $("#" + st.tpane1).hide();
                     $("#" + st.tpane2).show();
                  }
                  else $("#" + st.tpane1).dialog("close");
               }
            },
        };
                
        if (!omethods[options]) {
            return this.each(function (i, el) {
                if (options) {
                    $.extend(settings, options);
                }
                arguments[0] = settings;
                omethods.initialize.apply(this, arguments);
            });
        }
        else {
            omethods[options].apply(this, arguments);
        }

    };
})(jQuery);
