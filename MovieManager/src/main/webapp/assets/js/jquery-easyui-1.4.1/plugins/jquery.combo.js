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
$(function(){
$(document).unbind(".combo").bind("mousedown.combo mousewheel.combo",function(e){
var p=$(e.target).closest("span.combo,div.combo-p");
if(p.length){
_1(p);
return;
}
$("body>div.combo-p>div.combo-panel:visible").panel("close");
});
});
function _2(_3){
var _4=$.data(_3,"combo");
var _5=_4.options;
if(!_4.panel){
_4.panel=$("<div class=\"combo-panel\"></div>").appendTo("body");
_4.panel.panel({minWidth:_5.panelMinWidth,maxWidth:_5.panelMaxWidth,minHeight:_5.panelMinHeight,maxHeight:_5.panelMaxHeight,doSize:false,closed:true,cls:"combo-p",style:{position:"absolute",zIndex:10},onOpen:function(){
var _6=$(this).panel("options").comboTarget;
var _7=$.data(_6,"combo");
if(_7){
_7.options.onShowPanel.call(_6);
}
},onBeforeClose:function(){
_1(this);
},onClose:function(){
var _8=$(this).panel("options").comboTarget;
var _9=$.data(_8,"combo");
if(_9){
_9.options.onHidePanel.call(_8);
}
}});
}
var _a=$.extend(true,[],_5.icons);
if(_5.hasDownArrow){
_a.push({iconCls:"combo-arrow",handler:function(e){
_f(e.data.target);
}});
}
$(_3).addClass("combo-f").textbox($.extend({},_5,{icons:_a,onChange:function(){
}}));
$(_3).attr("comboName",$(_3).attr("textboxName"));
_4.combo=$(_3).next();
_4.combo.addClass("combo");
};
function _b(_c){
var _d=$.data(_c,"combo");
var _e=_d.options;
var p=_d.panel;
if(p.is(":visible")){
p.panel("close");
}
if(!_e.cloned){
p.panel("destroy");
}
$(_c).textbox("destroy");
};
function _f(_10){
var _11=$.data(_10,"combo").panel;
if(_11.is(":visible")){
_12(_10);
}else{
var p=$(_10).closest("div.combo-panel");
$("div.combo-panel:visible").not(_11).not(p).panel("close");
$(_10).combo("showPanel");
}
$(_10).combo("textbox").focus();
};
function _1(_13){
$(_13).find(".combo-f").each(function(){
var p=$(this).combo("panel");
if(p.is(":visible")){
p.panel("close");
}
});
};
function _14(e){
var _15=e.data.target;
var _16=$.data(_15,"combo");
var _17=_16.options;
var _18=_16.panel;
if(!_17.editable){
_f(_15);
}else{
var p=$(_15).closest("div.combo-panel");
$("div.combo-panel:visible").not(_18).not(p).panel("close");
}
};
function _19(e){
var _1a=e.data.target;
var t=$(_1a);
var _1b=t.data("combo");
var _1c=t.combo("options");
switch(e.keyCode){
case 38:
_1c.keyHandler.up.call(_1a,e);
break;
case 40:
_1c.keyHandler.down.call(_1a,e);
break;
case 37:
_1c.keyHandler.left.call(_1a,e);
break;
case 39:
_1c.keyHandler.right.call(_1a,e);
break;
case 13:
e.preventDefault();
_1c.keyHandler.enter.call(_1a,e);
return false;
case 9:
case 27:
_12(_1a);
break;
default:
if(_1c.editable){
if(_1b.timer){
clearTimeout(_1b.timer);
}
_1b.timer=setTimeout(function(){
var q=t.combo("getText");
if(_1b.previousText!=q){
_1b.previousText=q;
t.combo("showPanel");
_1c.keyHandler.query.call(_1a,q,e);
t.combo("validate");
}
},_1c.delay);
}
}
};
function _1d(_1e){
var _1f=$.data(_1e,"combo");
var _20=_1f.combo;
var _21=_1f.panel;
var _22=$(_1e).combo("options");
var _23=_21.panel("options");
_23.comboTarget=_1e;
if(_23.closed){
_21.panel("panel").show().css({zIndex:($.fn.menu?$.fn.menu.defaults.zIndex++:$.fn.window.defaults.zIndex++),left:-999999});
_21.panel("resize",{width:(_22.panelWidth?_22.panelWidth:_20._outerWidth()),height:_22.panelHeight});
_21.panel("panel").hide();
_21.panel("open");
}
(function(){
if(_21.is(":visible")){
_21.panel("move",{left:_24(),top:_25()});
setTimeout(arguments.callee,200);
}
})();
function _24(){
var _26=_20.offset().left;
if(_22.panelAlign=="right"){
_26+=_20._outerWidth()-_21._outerWidth();
}
if(_26+_21._outerWidth()>$(window)._outerWidth()+$(document).scrollLeft()){
_26=$(window)._outerWidth()+$(document).scrollLeft()-_21._outerWidth();
}
if(_26<0){
_26=0;
}
return _26;
};
function _25(){
var top=_20.offset().top+_20._outerHeight();
if(top+_21._outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=_20.offset().top-_21._outerHeight();
}
if(top<$(document).scrollTop()){
top=_20.offset().top+_20._outerHeight();
}
return top;
};
};
function _12(_27){
var _28=$.data(_27,"combo").panel;
_28.panel("close");
};
function _29(_2a){
var _2b=$.data(_2a,"combo");
var _2c=_2b.options;
var _2d=_2b.combo;
$(_2a).textbox("clear");
if(_2c.multiple){
_2d.find(".textbox-value").remove();
}else{
_2d.find(".textbox-value").val("");
}
};
function _2e(_2f,_30){
var _31=$.data(_2f,"combo");
var _32=$(_2f).textbox("getText");
if(_32!=_30){
$(_2f).textbox("setText",_30);
_31.previousText=_30;
}
};
function _33(_34){
var _35=[];
var _36=$.data(_34,"combo").combo;
_36.find(".textbox-value").each(function(){
_35.push($(this).val());
});
return _35;
};
function _37(_38,_39){
var _3a=$.data(_38,"combo");
var _3b=_3a.options;
var _3c=_3a.combo;
if(!$.isArray(_39)){
_39=_39.split(_3b.separator);
}
var _3d=_33(_38);
_3c.find(".textbox-value").remove();
var _3e=$(_38).attr("textboxName")||"";
for(var i=0;i<_39.length;i++){
var _3f=$("<input type=\"hidden\" class=\"textbox-value\">").appendTo(_3c);
_3f.attr("name",_3e);
if(_3b.disabled){
_3f.attr("disabled","disabled");
}
_3f.val(_39[i]);
}
var _40=(function(){
if(_3d.length!=_39.length){
return true;
}
var a1=$.extend(true,[],_3d);
var a2=$.extend(true,[],_39);
a1.sort();
a2.sort();
for(var i=0;i<a1.length;i++){
if(a1[i]!=a2[i]){
return true;
}
}
return false;
})();
if(_40){
if(_3b.multiple){
_3b.onChange.call(_38,_39,_3d);
}else{
_3b.onChange.call(_38,_39[0],_3d[0]);
}
}
};
function _41(_42){
var _43=_33(_42);
return _43[0];
};
function _44(_45,_46){
_37(_45,[_46]);
};
function _47(_48){
var _49=$.data(_48,"combo").options;
var _4a=_49.onChange;
_49.onChange=function(){
};
if(_49.multiple){
_37(_48,_49.value?_49.value:[]);
}else{
_44(_48,_49.value);
}
_49.onChange=_4a;
};
$.fn.combo=function(_4b,_4c){
if(typeof _4b=="string"){
var _4d=$.fn.combo.methods[_4b];
if(_4d){
return _4d(this,_4c);
}else{
return this.textbox(_4b,_4c);
}
}
_4b=_4b||{};
return this.each(function(){
var _4e=$.data(this,"combo");
if(_4e){
$.extend(_4e.options,_4b);
if(_4b.value!=undefined){
_4e.options.originalValue=_4b.value;
}
}else{
_4e=$.data(this,"combo",{options:$.extend({},$.fn.combo.defaults,$.fn.combo.parseOptions(this),_4b),previousText:""});
_4e.options.originalValue=_4e.options.value;
}
_2(this);
_47(this);
});
};
$.fn.combo.methods={options:function(jq){
var _4f=jq.textbox("options");
return $.extend($.data(jq[0],"combo").options,{width:_4f.width,height:_4f.height,disabled:_4f.disabled,readonly:_4f.readonly});
},cloneFrom:function(jq,_50){
return jq.each(function(){
$(this).textbox("cloneFrom",_50);
$.data(this,"combo",{options:$.extend(true,{cloned:true},$(_50).combo("options")),combo:$(this).next(),panel:$(_50).combo("panel")});
$(this).addClass("combo-f").attr("comboName",$(this).attr("textboxName"));
});
},panel:function(jq){
return $.data(jq[0],"combo").panel;
},destroy:function(jq){
return jq.each(function(){
_b(this);
});
},showPanel:function(jq){
return jq.each(function(){
_1d(this);
});
},hidePanel:function(jq){
return jq.each(function(){
_12(this);
});
},clear:function(jq){
return jq.each(function(){
_29(this);
});
},reset:function(jq){
return jq.each(function(){
var _51=$.data(this,"combo").options;
if(_51.multiple){
$(this).combo("setValues",_51.originalValue);
}else{
$(this).combo("setValue",_51.originalValue);
}
});
},setText:function(jq,_52){
return jq.each(function(){
_2e(this,_52);
});
},getValues:function(jq){
return _33(jq[0]);
},setValues:function(jq,_53){
return jq.each(function(){
_37(this,_53);
});
},getValue:function(jq){
return _41(jq[0]);
},setValue:function(jq,_54){
return jq.each(function(){
_44(this,_54);
});
}};
$.fn.combo.parseOptions=function(_55){
var t=$(_55);
return $.extend({},$.fn.textbox.parseOptions(_55),$.parser.parseOptions(_55,["separator","panelAlign",{panelWidth:"number",hasDownArrow:"boolean",delay:"number",selectOnNavigation:"boolean"},{panelMinWidth:"number",panelMaxWidth:"number",panelMinHeight:"number",panelMaxHeight:"number"}]),{panelHeight:(t.attr("panelHeight")=="auto"?"auto":parseInt(t.attr("panelHeight"))||undefined),multiple:(t.attr("multiple")?true:undefined)});
};
$.fn.combo.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:{click:_14,keydown:_19,paste:_19,drop:_19},panelWidth:null,panelHeight:200,panelMinWidth:null,panelMaxWidth:null,panelMinHeight:null,panelMaxHeight:null,panelAlign:"left",multiple:false,selectOnNavigation:true,separator:",",hasDownArrow:true,delay:200,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
},query:function(q,e){
}},onShowPanel:function(){
},onHidePanel:function(){
},onChange:function(_56,_57){
}});
})(jQuery);

