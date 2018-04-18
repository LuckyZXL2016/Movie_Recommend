/**
 * jQuery EasyUI 1.4.1
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
$.fn._remove=function(){
return this.each(function(){
$(this).remove();
try{
this.outerHTML="";
}
catch(err){
}
});
};
function _1(_2){
_2._remove();
};
function _3(_4,_5){
var _6=$.data(_4,"panel");
var _7=_6.options;
var _8=_6.panel;
var _9=_8.children("div.panel-header");
var _a=_8.children("div.panel-body");
var _b=_8.children("div.panel-footer");
if(_5){
$.extend(_7,{width:_5.width,height:_5.height,minWidth:_5.minWidth,maxWidth:_5.maxWidth,minHeight:_5.minHeight,maxHeight:_5.maxHeight,left:_5.left,top:_5.top});
}
_8._size(_7);
_9.add(_a)._outerWidth(_8.width());
if(!isNaN(parseInt(_7.height))){
_a._outerHeight(_8.height()-_9._outerHeight()-_b._outerHeight());
}else{
_a.css("height","");
var _c=$.parser.parseValue("minHeight",_7.minHeight,_8.parent());
var _d=$.parser.parseValue("maxHeight",_7.maxHeight,_8.parent());
var _e=_9._outerHeight()+_b._outerHeight()+_8._outerHeight()-_8.height();
_a._size("minHeight",_c?(_c-_e):"");
_a._size("maxHeight",_d?(_d-_e):"");
}
_8.css({height:"",minHeight:"",maxHeight:"",left:_7.left,top:_7.top});
_7.onResize.apply(_4,[_7.width,_7.height]);
$(_4).panel("doLayout");
};
function _f(_10,_11){
var _12=$.data(_10,"panel").options;
var _13=$.data(_10,"panel").panel;
if(_11){
if(_11.left!=null){
_12.left=_11.left;
}
if(_11.top!=null){
_12.top=_11.top;
}
}
_13.css({left:_12.left,top:_12.top});
_12.onMove.apply(_10,[_12.left,_12.top]);
};
function _14(_15){
$(_15).addClass("panel-body")._size("clear");
var _16=$("<div class=\"panel\"></div>").insertBefore(_15);
_16[0].appendChild(_15);
_16.bind("_resize",function(e,_17){
if($(this).hasClass("easyui-fluid")||_17){
_3(_15);
}
return false;
});
return _16;
};
function _18(_19){
var _1a=$.data(_19,"panel");
var _1b=_1a.options;
var _1c=_1a.panel;
_1c.css(_1b.style);
_1c.addClass(_1b.cls);
_1d();
_1e();
var _1f=$(_19).panel("header");
var _20=$(_19).panel("body");
var _21=$(_19).siblings("div.panel-footer");
if(_1b.border){
_1f.removeClass("panel-header-noborder");
_20.removeClass("panel-body-noborder");
_21.removeClass("panel-footer-noborder");
}else{
_1f.addClass("panel-header-noborder");
_20.addClass("panel-body-noborder");
_21.addClass("panel-footer-noborder");
}
_1f.addClass(_1b.headerCls);
_20.addClass(_1b.bodyCls);
$(_19).attr("id",_1b.id||"");
if(_1b.content){
$(_19).panel("clear");
$(_19).html(_1b.content);
$.parser.parse($(_19));
}
function _1d(){
if(_1b.tools&&typeof _1b.tools=="string"){
_1c.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(_1b.tools);
}
_1(_1c.children("div.panel-header"));
if(_1b.title&&!_1b.noheader){
var _22=$("<div class=\"panel-header\"></div>").prependTo(_1c);
var _23=$("<div class=\"panel-title\"></div>").html(_1b.title).appendTo(_22);
if(_1b.iconCls){
_23.addClass("panel-with-icon");
$("<div class=\"panel-icon\"></div>").addClass(_1b.iconCls).appendTo(_22);
}
var _24=$("<div class=\"panel-tool\"></div>").appendTo(_22);
_24.bind("click",function(e){
e.stopPropagation();
});
if(_1b.tools){
if($.isArray(_1b.tools)){
for(var i=0;i<_1b.tools.length;i++){
var t=$("<a href=\"javascript:void(0)\"></a>").addClass(_1b.tools[i].iconCls).appendTo(_24);
if(_1b.tools[i].handler){
t.bind("click",eval(_1b.tools[i].handler));
}
}
}else{
$(_1b.tools).children().each(function(){
$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(_24);
});
}
}
if(_1b.collapsible){
$("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>").appendTo(_24).bind("click",function(){
if(_1b.collapsed==true){
_4a(_19,true);
}else{
_38(_19,true);
}
return false;
});
}
if(_1b.minimizable){
$("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(_24).bind("click",function(){
_55(_19);
return false;
});
}
if(_1b.maximizable){
$("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>").appendTo(_24).bind("click",function(){
if(_1b.maximized==true){
_59(_19);
}else{
_37(_19);
}
return false;
});
}
if(_1b.closable){
$("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>").appendTo(_24).bind("click",function(){
_39(_19);
return false;
});
}
_1c.children("div.panel-body").removeClass("panel-body-noheader");
}else{
_1c.children("div.panel-body").addClass("panel-body-noheader");
}
};
function _1e(){
if(_1b.footer){
$(_1b.footer).addClass("panel-footer").appendTo(_1c);
$(_19).addClass("panel-body-nobottom");
}else{
_1c.children("div.panel-footer").remove();
$(_19).removeClass("panel-body-nobottom");
}
};
};
function _25(_26,_27){
var _28=$.data(_26,"panel");
var _29=_28.options;
if(_2a){
_29.queryParams=_27;
}
if(!_29.href){
return;
}
if(!_28.isLoaded||!_29.cache){
var _2a=$.extend({},_29.queryParams);
if(_29.onBeforeLoad.call(_26,_2a)==false){
return;
}
_28.isLoaded=false;
$(_26).panel("clear");
if(_29.loadingMessage){
$(_26).html($("<div class=\"panel-loading\"></div>").html(_29.loadingMessage));
}
_29.loader.call(_26,_2a,function(_2b){
var _2c=_29.extractor.call(_26,_2b);
$(_26).html(_2c);
$.parser.parse($(_26));
_29.onLoad.apply(_26,arguments);
_28.isLoaded=true;
},function(){
_29.onLoadError.apply(_26,arguments);
});
}
};
function _2d(_2e){
var t=$(_2e);
t.find(".combo-f").each(function(){
$(this).combo("destroy");
});
t.find(".m-btn").each(function(){
$(this).menubutton("destroy");
});
t.find(".s-btn").each(function(){
$(this).splitbutton("destroy");
});
t.find(".tooltip-f").each(function(){
$(this).tooltip("destroy");
});
t.children("div").each(function(){
$(this)._size("unfit");
});
t.empty();
};
function _2f(_30){
$(_30).panel("doLayout",true);
};
function _31(_32,_33){
var _34=$.data(_32,"panel").options;
var _35=$.data(_32,"panel").panel;
if(_33!=true){
if(_34.onBeforeOpen.call(_32)==false){
return;
}
}
_35.stop(true,true);
if($.isFunction(_34.openAnimation)){
_34.openAnimation.call(_32,cb);
}else{
switch(_34.openAnimation){
case "slide":
_35.slideDown(_34.openDuration,cb);
break;
case "fade":
_35.fadeIn(_34.openDuration,cb);
break;
case "show":
_35.show(_34.openDuration,cb);
break;
default:
_35.show();
cb();
}
}
function cb(){
_34.closed=false;
_34.minimized=false;
var _36=_35.children("div.panel-header").find("a.panel-tool-restore");
if(_36.length){
_34.maximized=true;
}
_34.onOpen.call(_32);
if(_34.maximized==true){
_34.maximized=false;
_37(_32);
}
if(_34.collapsed==true){
_34.collapsed=false;
_38(_32);
}
if(!_34.collapsed){
_25(_32);
_2f(_32);
}
};
};
function _39(_3a,_3b){
var _3c=$.data(_3a,"panel").options;
var _3d=$.data(_3a,"panel").panel;
if(_3b!=true){
if(_3c.onBeforeClose.call(_3a)==false){
return;
}
}
_3d.stop(true,true);
_3d._size("unfit");
if($.isFunction(_3c.closeAnimation)){
_3c.closeAnimation.call(_3a,cb);
}else{
switch(_3c.closeAnimation){
case "slide":
_3d.slideUp(_3c.closeDuration,cb);
break;
case "fade":
_3d.fadeOut(_3c.closeDuration,cb);
break;
case "hide":
_3d.hide(_3c.closeDuration,cb);
break;
default:
_3d.hide();
cb();
}
}
function cb(){
_3c.closed=true;
_3c.onClose.call(_3a);
};
};
function _3e(_3f,_40){
var _41=$.data(_3f,"panel");
var _42=_41.options;
var _43=_41.panel;
if(_40!=true){
if(_42.onBeforeDestroy.call(_3f)==false){
return;
}
}
$(_3f).panel("clear").panel("clear","footer");
_1(_43);
_42.onDestroy.call(_3f);
};
function _38(_44,_45){
var _46=$.data(_44,"panel").options;
var _47=$.data(_44,"panel").panel;
var _48=_47.children("div.panel-body");
var _49=_47.children("div.panel-header").find("a.panel-tool-collapse");
if(_46.collapsed==true){
return;
}
_48.stop(true,true);
if(_46.onBeforeCollapse.call(_44)==false){
return;
}
_49.addClass("panel-tool-expand");
if(_45==true){
_48.slideUp("normal",function(){
_46.collapsed=true;
_46.onCollapse.call(_44);
});
}else{
_48.hide();
_46.collapsed=true;
_46.onCollapse.call(_44);
}
};
function _4a(_4b,_4c){
var _4d=$.data(_4b,"panel").options;
var _4e=$.data(_4b,"panel").panel;
var _4f=_4e.children("div.panel-body");
var _50=_4e.children("div.panel-header").find("a.panel-tool-collapse");
if(_4d.collapsed==false){
return;
}
_4f.stop(true,true);
if(_4d.onBeforeExpand.call(_4b)==false){
return;
}
_50.removeClass("panel-tool-expand");
if(_4c==true){
_4f.slideDown("normal",function(){
_4d.collapsed=false;
_4d.onExpand.call(_4b);
_25(_4b);
_2f(_4b);
});
}else{
_4f.show();
_4d.collapsed=false;
_4d.onExpand.call(_4b);
_25(_4b);
_2f(_4b);
}
};
function _37(_51){
var _52=$.data(_51,"panel").options;
var _53=$.data(_51,"panel").panel;
var _54=_53.children("div.panel-header").find("a.panel-tool-max");
if(_52.maximized==true){
return;
}
_54.addClass("panel-tool-restore");
if(!$.data(_51,"panel").original){
$.data(_51,"panel").original={width:_52.width,height:_52.height,left:_52.left,top:_52.top,fit:_52.fit};
}
_52.left=0;
_52.top=0;
_52.fit=true;
_3(_51);
_52.minimized=false;
_52.maximized=true;
_52.onMaximize.call(_51);
};
function _55(_56){
var _57=$.data(_56,"panel").options;
var _58=$.data(_56,"panel").panel;
_58._size("unfit");
_58.hide();
_57.minimized=true;
_57.maximized=false;
_57.onMinimize.call(_56);
};
function _59(_5a){
var _5b=$.data(_5a,"panel").options;
var _5c=$.data(_5a,"panel").panel;
var _5d=_5c.children("div.panel-header").find("a.panel-tool-max");
if(_5b.maximized==false){
return;
}
_5c.show();
_5d.removeClass("panel-tool-restore");
$.extend(_5b,$.data(_5a,"panel").original);
_3(_5a);
_5b.minimized=false;
_5b.maximized=false;
$.data(_5a,"panel").original=null;
_5b.onRestore.call(_5a);
};
function _5e(_5f,_60){
$.data(_5f,"panel").options.title=_60;
$(_5f).panel("header").find("div.panel-title").html(_60);
};
var _61=null;
$(window).unbind(".panel").bind("resize.panel",function(){
if(_61){
clearTimeout(_61);
}
_61=setTimeout(function(){
var _62=$("body.layout");
if(_62.length){
_62.layout("resize");
$("body").children(".easyui-fluid:visible").trigger("_resize");
}else{
$("body").panel("doLayout");
}
_61=null;
},100);
});
$.fn.panel=function(_63,_64){
if(typeof _63=="string"){
return $.fn.panel.methods[_63](this,_64);
}
_63=_63||{};
return this.each(function(){
var _65=$.data(this,"panel");
var _66;
if(_65){
_66=$.extend(_65.options,_63);
_65.isLoaded=false;
}else{
_66=$.extend({},$.fn.panel.defaults,$.fn.panel.parseOptions(this),_63);
$(this).attr("title","");
_65=$.data(this,"panel",{options:_66,panel:_14(this),isLoaded:false});
}
_18(this);
if(_66.doSize==true){
_65.panel.css("display","block");
_3(this);
}
if(_66.closed==true||_66.minimized==true){
_65.panel.hide();
}else{
_31(this);
}
});
};
$.fn.panel.methods={options:function(jq){
return $.data(jq[0],"panel").options;
},panel:function(jq){
return $.data(jq[0],"panel").panel;
},header:function(jq){
return $.data(jq[0],"panel").panel.find(">div.panel-header");
},footer:function(jq){
return jq.panel("panel").children(".panel-footer");
},body:function(jq){
return $.data(jq[0],"panel").panel.find(">div.panel-body");
},setTitle:function(jq,_67){
return jq.each(function(){
_5e(this,_67);
});
},open:function(jq,_68){
return jq.each(function(){
_31(this,_68);
});
},close:function(jq,_69){
return jq.each(function(){
_39(this,_69);
});
},destroy:function(jq,_6a){
return jq.each(function(){
_3e(this,_6a);
});
},clear:function(jq,_6b){
return jq.each(function(){
_2d(_6b=="footer"?$(this).panel("footer"):this);
});
},refresh:function(jq,_6c){
return jq.each(function(){
var _6d=$.data(this,"panel");
_6d.isLoaded=false;
if(_6c){
if(typeof _6c=="string"){
_6d.options.href=_6c;
}else{
_6d.options.queryParams=_6c;
}
}
_25(this);
});
},resize:function(jq,_6e){
return jq.each(function(){
_3(this,_6e);
});
},doLayout:function(jq,all){
return jq.each(function(){
_6f(this,"body");
_6f($(this).siblings("div.panel-footer")[0],"footer");
function _6f(_70,_71){
if(!_70){
return;
}
var _72=_70==$("body")[0];
var s=$(_70).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.easyui-fluid:visible").filter(function(_73,el){
var p=$(el).parents("div.panel-"+_71+":first");
return _72?p.length==0:p[0]==_70;
});
s.trigger("_resize",[all||false]);
};
});
},move:function(jq,_74){
return jq.each(function(){
_f(this,_74);
});
},maximize:function(jq){
return jq.each(function(){
_37(this);
});
},minimize:function(jq){
return jq.each(function(){
_55(this);
});
},restore:function(jq){
return jq.each(function(){
_59(this);
});
},collapse:function(jq,_75){
return jq.each(function(){
_38(this,_75);
});
},expand:function(jq,_76){
return jq.each(function(){
_4a(this,_76);
});
}};
$.fn.panel.parseOptions=function(_77){
var t=$(_77);
return $.extend({},$.parser.parseOptions(_77,["id","width","height","left","top","title","iconCls","cls","headerCls","bodyCls","tools","href","method",{cache:"boolean",fit:"boolean",border:"boolean",noheader:"boolean"},{collapsible:"boolean",minimizable:"boolean",maximizable:"boolean"},{closable:"boolean",collapsed:"boolean",minimized:"boolean",maximized:"boolean",closed:"boolean"},"openAnimation","closeAnimation",{openDuration:"number",closeDuration:"number"},]),{loadingMessage:(t.attr("loadingMessage")!=undefined?t.attr("loadingMessage"):undefined)});
};
$.fn.panel.defaults={id:null,title:null,iconCls:null,width:"auto",height:"auto",left:null,top:null,cls:null,headerCls:null,bodyCls:null,style:{},href:null,cache:true,fit:false,border:true,doSize:true,noheader:false,content:null,collapsible:false,minimizable:false,maximizable:false,closable:false,collapsed:false,minimized:false,maximized:false,closed:false,openAnimation:false,openDuration:400,closeAnimation:false,closeDuration:400,tools:null,footer:null,queryParams:{},method:"get",href:null,loadingMessage:"Loading...",loader:function(_78,_79,_7a){
var _7b=$(this).panel("options");
if(!_7b.href){
return false;
}
$.ajax({type:_7b.method,url:_7b.href,cache:false,data:_78,dataType:"html",success:function(_7c){
_79(_7c);
},error:function(){
_7a.apply(this,arguments);
}});
},extractor:function(_7d){
var _7e=/<body[^>]*>((.|[\n\r])*)<\/body>/im;
var _7f=_7e.exec(_7d);
if(_7f){
return _7f[1];
}else{
return _7d;
}
},onBeforeLoad:function(_80){
},onLoad:function(){
},onLoadError:function(){
},onBeforeOpen:function(){
},onOpen:function(){
},onBeforeClose:function(){
},onClose:function(){
},onBeforeDestroy:function(){
},onDestroy:function(){
},onResize:function(_81,_82){
},onMove:function(_83,top){
},onMaximize:function(){
},onRestore:function(){
},onMinimize:function(){
},onBeforeCollapse:function(){
},onBeforeExpand:function(){
},onCollapse:function(){
},onExpand:function(){
}};
})(jQuery);

