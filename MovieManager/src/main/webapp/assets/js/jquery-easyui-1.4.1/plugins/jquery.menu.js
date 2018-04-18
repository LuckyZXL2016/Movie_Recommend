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
$(_2).appendTo("body");
$(_2).addClass("menu-top");
$(document).unbind(".menu").bind("mousedown.menu",function(e){
var m=$(e.target).closest("div.menu,div.combo-p");
if(m.length){
return;
}
$("body>div.menu-top:visible").menu("hide");
});
var _3=_4($(_2));
for(var i=0;i<_3.length;i++){
_5(_3[i]);
}
function _4(_6){
var _7=[];
_6.addClass("menu");
_7.push(_6);
if(!_6.hasClass("menu-content")){
_6.children("div").each(function(){
var _8=$(this).children("div");
if(_8.length){
_8.insertAfter(_2);
this.submenu=_8;
var mm=_4(_8);
_7=_7.concat(mm);
}
});
}
return _7;
};
function _5(_9){
var wh=$.parser.parseOptions(_9[0],["width","height"]);
_9[0].originalHeight=wh.height||0;
if(_9.hasClass("menu-content")){
_9[0].originalWidth=wh.width||_9._outerWidth();
}else{
_9[0].originalWidth=wh.width||0;
_9.children("div").each(function(){
var _a=$(this);
var _b=$.extend({},$.parser.parseOptions(this,["name","iconCls","href",{separator:"boolean"}]),{disabled:(_a.attr("disabled")?true:undefined)});
if(_b.separator){
_a.addClass("menu-sep");
}
if(!_a.hasClass("menu-sep")){
_a[0].itemName=_b.name||"";
_a[0].itemHref=_b.href||"";
var _c=_a.addClass("menu-item").html();
_a.empty().append($("<div class=\"menu-text\"></div>").html(_c));
if(_b.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_b.iconCls).appendTo(_a);
}
if(_b.disabled){
_d(_2,_a[0],true);
}
if(_a[0].submenu){
$("<div class=\"menu-rightarrow\"></div>").appendTo(_a);
}
_e(_2,_a);
}
});
$("<div class=\"menu-line\"></div>").prependTo(_9);
}
_f(_2,_9);
_9.hide();
_10(_2,_9);
};
};
function _f(_11,_12){
var _13=$.data(_11,"menu").options;
var _14=_12.attr("style")||"";
_12.css({display:"block",left:-10000,height:"auto",overflow:"hidden"});
var el=_12[0];
var _15=el.originalWidth||0;
if(!_15){
_15=0;
_12.find("div.menu-text").each(function(){
if(_15<$(this)._outerWidth()){
_15=$(this)._outerWidth();
}
$(this).closest("div.menu-item")._outerHeight($(this)._outerHeight()+2);
});
_15+=40;
}
_15=Math.max(_15,_13.minWidth);
var _16=el.originalHeight||0;
if(!_16){
_16=_12.outerHeight();
if(_12.hasClass("menu-top")&&_13.alignTo){
var at=$(_13.alignTo);
var h1=at.offset().top-$(document).scrollTop();
var h2=$(window)._outerHeight()+$(document).scrollTop()-at.offset().top-at._outerHeight();
_16=Math.min(_16,Math.max(h1,h2));
}else{
if(_16>$(window)._outerHeight()){
_16=$(window).height();
_14+=";overflow:auto";
}else{
_14+=";overflow:hidden";
}
}
}
var _17=Math.max(el.originalHeight,_12.outerHeight())-2;
_12._outerWidth(_15)._outerHeight(_16);
_12.children("div.menu-line")._outerHeight(_17);
_14+=";width:"+el.style.width+";height:"+el.style.height;
_12.attr("style",_14);
};
function _10(_18,_19){
var _1a=$.data(_18,"menu");
_19.unbind(".menu").bind("mouseenter.menu",function(){
if(_1a.timer){
clearTimeout(_1a.timer);
_1a.timer=null;
}
}).bind("mouseleave.menu",function(){
if(_1a.options.hideOnUnhover){
_1a.timer=setTimeout(function(){
_1b(_18);
},_1a.options.duration);
}
});
};
function _e(_1c,_1d){
if(!_1d.hasClass("menu-item")){
return;
}
_1d.unbind(".menu");
_1d.bind("click.menu",function(){
if($(this).hasClass("menu-item-disabled")){
return;
}
if(!this.submenu){
_1b(_1c);
var _1e=this.itemHref;
if(_1e){
location.href=_1e;
}
}
var _1f=$(_1c).menu("getItem",this);
$.data(_1c,"menu").options.onClick.call(_1c,_1f);
}).bind("mouseenter.menu",function(e){
_1d.siblings().each(function(){
if(this.submenu){
_22(this.submenu);
}
$(this).removeClass("menu-active");
});
_1d.addClass("menu-active");
if($(this).hasClass("menu-item-disabled")){
_1d.addClass("menu-active-disabled");
return;
}
var _20=_1d[0].submenu;
if(_20){
$(_1c).menu("show",{menu:_20,parent:_1d});
}
}).bind("mouseleave.menu",function(e){
_1d.removeClass("menu-active menu-active-disabled");
var _21=_1d[0].submenu;
if(_21){
if(e.pageX>=parseInt(_21.css("left"))){
_1d.addClass("menu-active");
}else{
_22(_21);
}
}else{
_1d.removeClass("menu-active");
}
});
};
function _1b(_23){
var _24=$.data(_23,"menu");
if(_24){
if($(_23).is(":visible")){
_22($(_23));
_24.options.onHide.call(_23);
}
}
return false;
};
function _25(_26,_27){
var _28,top;
_27=_27||{};
var _29=$(_27.menu||_26);
$(_26).menu("resize",_29[0]);
if(_29.hasClass("menu-top")){
var _2a=$.data(_26,"menu").options;
$.extend(_2a,_27);
_28=_2a.left;
top=_2a.top;
if(_2a.alignTo){
var at=$(_2a.alignTo);
_28=at.offset().left;
top=at.offset().top+at._outerHeight();
if(_2a.align=="right"){
_28+=at.outerWidth()-_29.outerWidth();
}
}
if(_28+_29.outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()){
_28=$(window)._outerWidth()+$(document).scrollLeft()-_29.outerWidth()-5;
}
if(_28<0){
_28=0;
}
top=_2b(top,_2a.alignTo);
}else{
var _2c=_27.parent;
_28=_2c.offset().left+_2c.outerWidth()-2;
if(_28+_29.outerWidth()+5>$(window)._outerWidth()+$(document).scrollLeft()){
_28=_2c.offset().left-_29.outerWidth()+2;
}
top=_2b(_2c.offset().top-3);
}
function _2b(top,_2d){
if(top+_29.outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
if(_2d){
top=$(_2d).offset().top-_29._outerHeight();
}else{
top=$(window)._outerHeight()+$(document).scrollTop()-_29.outerHeight();
}
}
if(top<0){
top=0;
}
return top;
};
_29.css({left:_28,top:top});
_29.show(0,function(){
if(!_29[0].shadow){
_29[0].shadow=$("<div class=\"menu-shadow\"></div>").insertAfter(_29);
}
_29[0].shadow.css({display:"block",zIndex:$.fn.menu.defaults.zIndex++,left:_29.css("left"),top:_29.css("top"),width:_29.outerWidth(),height:_29.outerHeight()});
_29.css("z-index",$.fn.menu.defaults.zIndex++);
if(_29.hasClass("menu-top")){
$.data(_29[0],"menu").options.onShow.call(_29[0]);
}
});
};
function _22(_2e){
if(!_2e){
return;
}
_2f(_2e);
_2e.find("div.menu-item").each(function(){
if(this.submenu){
_22(this.submenu);
}
$(this).removeClass("menu-active");
});
function _2f(m){
m.stop(true,true);
if(m[0].shadow){
m[0].shadow.hide();
}
m.hide();
};
};
function _30(_31,_32){
var _33=null;
var tmp=$("<div></div>");
function _34(_35){
_35.children("div.menu-item").each(function(){
var _36=$(_31).menu("getItem",this);
var s=tmp.empty().html(_36.text).text();
if(_32==$.trim(s)){
_33=_36;
}else{
if(this.submenu&&!_33){
_34(this.submenu);
}
}
});
};
_34($(_31));
tmp.remove();
return _33;
};
function _d(_37,_38,_39){
var t=$(_38);
if(!t.hasClass("menu-item")){
return;
}
if(_39){
t.addClass("menu-item-disabled");
if(_38.onclick){
_38.onclick1=_38.onclick;
_38.onclick=null;
}
}else{
t.removeClass("menu-item-disabled");
if(_38.onclick1){
_38.onclick=_38.onclick1;
_38.onclick1=null;
}
}
};
function _3a(_3b,_3c){
var _3d=$(_3b);
if(_3c.parent){
if(!_3c.parent.submenu){
var _3e=$("<div class=\"menu\"><div class=\"menu-line\"></div></div>").appendTo("body");
_3e.hide();
_3c.parent.submenu=_3e;
$("<div class=\"menu-rightarrow\"></div>").appendTo(_3c.parent);
}
_3d=_3c.parent.submenu;
}
if(_3c.separator){
var _3f=$("<div class=\"menu-sep\"></div>").appendTo(_3d);
}else{
var _3f=$("<div class=\"menu-item\"></div>").appendTo(_3d);
$("<div class=\"menu-text\"></div>").html(_3c.text).appendTo(_3f);
}
if(_3c.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_3c.iconCls).appendTo(_3f);
}
if(_3c.id){
_3f.attr("id",_3c.id);
}
if(_3c.name){
_3f[0].itemName=_3c.name;
}
if(_3c.href){
_3f[0].itemHref=_3c.href;
}
if(_3c.onclick){
if(typeof _3c.onclick=="string"){
_3f.attr("onclick",_3c.onclick);
}else{
_3f[0].onclick=eval(_3c.onclick);
}
}
if(_3c.handler){
_3f[0].onclick=eval(_3c.handler);
}
if(_3c.disabled){
_d(_3b,_3f[0],true);
}
_e(_3b,_3f);
_10(_3b,_3d);
_f(_3b,_3d);
};
function _40(_41,_42){
function _43(el){
if(el.submenu){
el.submenu.children("div.menu-item").each(function(){
_43(this);
});
var _44=el.submenu[0].shadow;
if(_44){
_44.remove();
}
el.submenu.remove();
}
$(el).remove();
};
var _45=$(_42).parent();
_43(_42);
_f(_41,_45);
};
function _46(_47,_48,_49){
var _4a=$(_48).parent();
if(_49){
$(_48).show();
}else{
$(_48).hide();
}
_f(_47,_4a);
};
function _4b(_4c){
$(_4c).children("div.menu-item").each(function(){
_40(_4c,this);
});
if(_4c.shadow){
_4c.shadow.remove();
}
$(_4c).remove();
};
$.fn.menu=function(_4d,_4e){
if(typeof _4d=="string"){
return $.fn.menu.methods[_4d](this,_4e);
}
_4d=_4d||{};
return this.each(function(){
var _4f=$.data(this,"menu");
if(_4f){
$.extend(_4f.options,_4d);
}else{
_4f=$.data(this,"menu",{options:$.extend({},$.fn.menu.defaults,$.fn.menu.parseOptions(this),_4d)});
_1(this);
}
$(this).css({left:_4f.options.left,top:_4f.options.top});
});
};
$.fn.menu.methods={options:function(jq){
return $.data(jq[0],"menu").options;
},show:function(jq,pos){
return jq.each(function(){
_25(this,pos);
});
},hide:function(jq){
return jq.each(function(){
_1b(this);
});
},destroy:function(jq){
return jq.each(function(){
_4b(this);
});
},setText:function(jq,_50){
return jq.each(function(){
$(_50.target).children("div.menu-text").html(_50.text);
});
},setIcon:function(jq,_51){
return jq.each(function(){
$(_51.target).children("div.menu-icon").remove();
if(_51.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_51.iconCls).appendTo(_51.target);
}
});
},getItem:function(jq,_52){
var t=$(_52);
var _53={target:_52,id:t.attr("id"),text:$.trim(t.children("div.menu-text").html()),disabled:t.hasClass("menu-item-disabled"),name:_52.itemName,href:_52.itemHref,onclick:_52.onclick};
var _54=t.children("div.menu-icon");
if(_54.length){
var cc=[];
var aa=_54.attr("class").split(" ");
for(var i=0;i<aa.length;i++){
if(aa[i]!="menu-icon"){
cc.push(aa[i]);
}
}
_53.iconCls=cc.join(" ");
}
return _53;
},findItem:function(jq,_55){
return _30(jq[0],_55);
},appendItem:function(jq,_56){
return jq.each(function(){
_3a(this,_56);
});
},removeItem:function(jq,_57){
return jq.each(function(){
_40(this,_57);
});
},enableItem:function(jq,_58){
return jq.each(function(){
_d(this,_58,false);
});
},disableItem:function(jq,_59){
return jq.each(function(){
_d(this,_59,true);
});
},showItem:function(jq,_5a){
return jq.each(function(){
_46(this,_5a,true);
});
},hideItem:function(jq,_5b){
return jq.each(function(){
_46(this,_5b,false);
});
},resize:function(jq,_5c){
return jq.each(function(){
_f(this,$(_5c));
});
}};
$.fn.menu.parseOptions=function(_5d){
return $.extend({},$.parser.parseOptions(_5d,[{minWidth:"number",duration:"number",hideOnUnhover:"boolean"}]));
};
$.fn.menu.defaults={zIndex:110000,left:0,top:0,alignTo:null,align:"left",minWidth:120,duration:100,hideOnUnhover:true,onShow:function(){
},onHide:function(){
},onClick:function(_5e){
}};
})(jQuery);

