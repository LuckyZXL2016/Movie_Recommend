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
function _1(_2){
var _3=$.data(_2,"dialog").options;
_3.inited=false;
$(_2).window($.extend({},_3,{onResize:function(w,h){
if(_3.inited){
_a(this);
_3.onResize.call(this,w,h);
}
}}));
var _4=$(_2).window("window");
if(_3.toolbar){
if($.isArray(_3.toolbar)){
$(_2).siblings("div.dialog-toolbar").remove();
var _5=$("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").appendTo(_4);
var tr=_5.find("tr");
for(var i=0;i<_3.toolbar.length;i++){
var _6=_3.toolbar[i];
if(_6=="-"){
$("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var _7=$("<a href=\"javascript:void(0)\"></a>").appendTo(td);
_7[0].onclick=eval(_6.handler||function(){
});
_7.linkbutton($.extend({},_6,{plain:true}));
}
}
}else{
$(_3.toolbar).addClass("dialog-toolbar").appendTo(_4);
$(_3.toolbar).show();
}
}else{
$(_2).siblings("div.dialog-toolbar").remove();
}
if(_3.buttons){
if($.isArray(_3.buttons)){
$(_2).siblings("div.dialog-button").remove();
var _8=$("<div class=\"dialog-button\"></div>").appendTo(_4);
for(var i=0;i<_3.buttons.length;i++){
var p=_3.buttons[i];
var _9=$("<a href=\"javascript:void(0)\"></a>").appendTo(_8);
if(p.handler){
_9[0].onclick=p.handler;
}
_9.linkbutton(p);
}
}else{
$(_3.buttons).addClass("dialog-button").appendTo(_4);
$(_3.buttons).show();
}
}else{
$(_2).siblings("div.dialog-button").remove();
}
_3.inited=true;
_4.show();
$(_2).window("resize");
if(_3.closed){
_4.hide();
}
};
function _a(_b,_c){
var t=$(_b);
var _d=t.dialog("options");
var _e=_d.noheader;
var tb=t.siblings(".dialog-toolbar");
var bb=t.siblings(".dialog-button");
tb.insertBefore(_b).css({position:"relative",borderTopWidth:(_e?1:0),top:(_e?tb.length:0)});
bb.insertAfter(_b).css({position:"relative",top:-1});
if(!isNaN(parseInt(_d.height))){
t._outerHeight(t._outerHeight()-tb._outerHeight()-bb._outerHeight());
}
tb.add(bb)._outerWidth(t._outerWidth());
var _f=$.data(_b,"window").shadow;
if(_f){
var cc=t.panel("panel");
_f.css({width:cc._outerWidth(),height:cc._outerHeight()});
}
};
$.fn.dialog=function(_10,_11){
if(typeof _10=="string"){
var _12=$.fn.dialog.methods[_10];
if(_12){
return _12(this,_11);
}else{
return this.window(_10,_11);
}
}
_10=_10||{};
return this.each(function(){
var _13=$.data(this,"dialog");
if(_13){
$.extend(_13.options,_10);
}else{
$.data(this,"dialog",{options:$.extend({},$.fn.dialog.defaults,$.fn.dialog.parseOptions(this),_10)});
}
_1(this);
});
};
$.fn.dialog.methods={options:function(jq){
var _14=$.data(jq[0],"dialog").options;
var _15=jq.panel("options");
$.extend(_14,{width:_15.width,height:_15.height,left:_15.left,top:_15.top,closed:_15.closed,collapsed:_15.collapsed,minimized:_15.minimized,maximized:_15.maximized});
return _14;
},dialog:function(jq){
return jq.window("window");
}};
$.fn.dialog.parseOptions=function(_16){
return $.extend({},$.fn.window.parseOptions(_16),$.parser.parseOptions(_16,["toolbar","buttons"]));
};
$.fn.dialog.defaults=$.extend({},$.fn.window.defaults,{title:"New Dialog",collapsible:false,minimizable:false,maximizable:false,resizable:false,toolbar:null,buttons:null});
})(jQuery);

