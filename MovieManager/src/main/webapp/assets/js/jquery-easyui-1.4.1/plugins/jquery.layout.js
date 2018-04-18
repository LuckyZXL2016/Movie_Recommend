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
var _1=false;
function _2(_3,_4){
var _5=$.data(_3,"layout");
var _6=_5.options;
var _7=_5.panels;
var cc=$(_3);
if(_4){
$.extend(_6,{width:_4.width,height:_4.height});
}
if(_3.tagName.toLowerCase()=="body"){
cc._size("fit");
}else{
cc._size(_6);
}
var _8={top:0,left:0,width:cc.width(),height:cc.height()};
_9(_a(_7.expandNorth)?_7.expandNorth:_7.north,"n");
_9(_a(_7.expandSouth)?_7.expandSouth:_7.south,"s");
_b(_a(_7.expandEast)?_7.expandEast:_7.east,"e");
_b(_a(_7.expandWest)?_7.expandWest:_7.west,"w");
_7.center.panel("resize",_8);
function _9(pp,_c){
if(!pp.length||!_a(pp)){
return;
}
var _d=pp.panel("options");
pp.panel("resize",{width:cc.width(),height:_d.height});
var _e=pp.panel("panel").outerHeight();
pp.panel("move",{left:0,top:(_c=="n"?0:cc.height()-_e)});
_8.height-=_e;
if(_c=="n"){
_8.top+=_e;
if(!_d.split&&_d.border){
_8.top--;
}
}
if(!_d.split&&_d.border){
_8.height++;
}
};
function _b(pp,_f){
if(!pp.length||!_a(pp)){
return;
}
var _10=pp.panel("options");
pp.panel("resize",{width:_10.width,height:_8.height});
var _11=pp.panel("panel").outerWidth();
pp.panel("move",{left:(_f=="e"?cc.width()-_11:0),top:_8.top});
_8.width-=_11;
if(_f=="w"){
_8.left+=_11;
if(!_10.split&&_10.border){
_8.left--;
}
}
if(!_10.split&&_10.border){
_8.width++;
}
};
};
function _12(_13){
var cc=$(_13);
cc.addClass("layout");
function _14(cc){
cc.children("div").each(function(){
var _15=$.fn.layout.parsePanelOptions(this);
if("north,south,east,west,center".indexOf(_15.region)>=0){
_17(_13,_15,this);
}
});
};
cc.children("form").length?_14(cc.children("form")):_14(cc);
cc.append("<div class=\"layout-split-proxy-h\"></div><div class=\"layout-split-proxy-v\"></div>");
cc.bind("_resize",function(e,_16){
if($(this).hasClass("easyui-fluid")||_16){
_2(_13);
}
return false;
});
};
function _17(_18,_19,el){
_19.region=_19.region||"center";
var _1a=$.data(_18,"layout").panels;
var cc=$(_18);
var dir=_19.region;
if(_1a[dir].length){
return;
}
var pp=$(el);
if(!pp.length){
pp=$("<div></div>").appendTo(cc);
}
var _1b=$.extend({},$.fn.layout.paneldefaults,{width:(pp.length?parseInt(pp[0].style.width)||pp.outerWidth():"auto"),height:(pp.length?parseInt(pp[0].style.height)||pp.outerHeight():"auto"),doSize:false,collapsible:true,cls:("layout-panel layout-panel-"+dir),bodyCls:"layout-body",onOpen:function(){
var _1c=$(this).panel("header").children("div.panel-tool");
_1c.children("a.panel-tool-collapse").hide();
var _1d={north:"up",south:"down",east:"right",west:"left"};
if(!_1d[dir]){
return;
}
var _1e="layout-button-"+_1d[dir];
var t=_1c.children("a."+_1e);
if(!t.length){
t=$("<a href=\"javascript:void(0)\"></a>").addClass(_1e).appendTo(_1c);
t.bind("click",{dir:dir},function(e){
_2b(_18,e.data.dir);
return false;
});
}
$(this).panel("options").collapsible?t.show():t.hide();
}},_19);
pp.panel(_1b);
_1a[dir]=pp;
if(pp.panel("options").split){
var _1f=pp.panel("panel");
_1f.addClass("layout-split-"+dir);
var _20="";
if(dir=="north"){
_20="s";
}
if(dir=="south"){
_20="n";
}
if(dir=="east"){
_20="w";
}
if(dir=="west"){
_20="e";
}
_1f.resizable($.extend({},{handles:_20,onStartResize:function(e){
_1=true;
if(dir=="north"||dir=="south"){
var _21=$(">div.layout-split-proxy-v",_18);
}else{
var _21=$(">div.layout-split-proxy-h",_18);
}
var top=0,_22=0,_23=0,_24=0;
var pos={display:"block"};
if(dir=="north"){
pos.top=parseInt(_1f.css("top"))+_1f.outerHeight()-_21.height();
pos.left=parseInt(_1f.css("left"));
pos.width=_1f.outerWidth();
pos.height=_21.height();
}else{
if(dir=="south"){
pos.top=parseInt(_1f.css("top"));
pos.left=parseInt(_1f.css("left"));
pos.width=_1f.outerWidth();
pos.height=_21.height();
}else{
if(dir=="east"){
pos.top=parseInt(_1f.css("top"))||0;
pos.left=parseInt(_1f.css("left"))||0;
pos.width=_21.width();
pos.height=_1f.outerHeight();
}else{
if(dir=="west"){
pos.top=parseInt(_1f.css("top"))||0;
pos.left=_1f.outerWidth()-_21.width();
pos.width=_21.width();
pos.height=_1f.outerHeight();
}
}
}
}
_21.css(pos);
$("<div class=\"layout-mask\"></div>").css({left:0,top:0,width:cc.width(),height:cc.height()}).appendTo(cc);
},onResize:function(e){
if(dir=="north"||dir=="south"){
var _25=$(">div.layout-split-proxy-v",_18);
_25.css("top",e.pageY-$(_18).offset().top-_25.height()/2);
}else{
var _25=$(">div.layout-split-proxy-h",_18);
_25.css("left",e.pageX-$(_18).offset().left-_25.width()/2);
}
return false;
},onStopResize:function(e){
cc.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
pp.panel("resize",e.data);
_2(_18);
_1=false;
cc.find(">div.layout-mask").remove();
}},_19));
}
};
function _26(_27,_28){
var _29=$.data(_27,"layout").panels;
if(_29[_28].length){
_29[_28].panel("destroy");
_29[_28]=$();
var _2a="expand"+_28.substring(0,1).toUpperCase()+_28.substring(1);
if(_29[_2a]){
_29[_2a].panel("destroy");
_29[_2a]=undefined;
}
}
};
function _2b(_2c,_2d,_2e){
if(_2e==undefined){
_2e="normal";
}
var _2f=$.data(_2c,"layout").panels;
var p=_2f[_2d];
var _30=p.panel("options");
if(_30.onBeforeCollapse.call(p)==false){
return;
}
var _31="expand"+_2d.substring(0,1).toUpperCase()+_2d.substring(1);
if(!_2f[_31]){
_2f[_31]=_32(_2d);
_2f[_31].panel("panel").bind("click",function(){
p.panel("expand",false).panel("open");
var _33=_34();
p.panel("resize",_33.collapse);
p.panel("panel").animate(_33.expand,function(){
$(this).unbind(".layout").bind("mouseleave.layout",{region:_2d},function(e){
if(_1==true){
return;
}
if($("body>div.combo-p>div.combo-panel:visible").length){
return;
}
_2b(_2c,e.data.region);
});
});
return false;
});
}
var _35=_34();
if(!_a(_2f[_31])){
_2f.center.panel("resize",_35.resizeC);
}
p.panel("panel").animate(_35.collapse,_2e,function(){
p.panel("collapse",false).panel("close");
_2f[_31].panel("open").panel("resize",_35.expandP);
$(this).unbind(".layout");
});
function _32(dir){
var _36;
if(dir=="east"){
_36="layout-button-left";
}else{
if(dir=="west"){
_36="layout-button-right";
}else{
if(dir=="north"){
_36="layout-button-down";
}else{
if(dir=="south"){
_36="layout-button-up";
}
}
}
}
var p=$("<div></div>").appendTo(_2c);
p.panel($.extend({},$.fn.layout.paneldefaults,{cls:("layout-expand layout-expand-"+dir),title:"&nbsp;",closed:true,minWidth:0,minHeight:0,doSize:false,tools:[{iconCls:_36,handler:function(){
_3c(_2c,_2d);
return false;
}}]}));
p.panel("panel").hover(function(){
$(this).addClass("layout-expand-over");
},function(){
$(this).removeClass("layout-expand-over");
});
return p;
};
function _34(){
var cc=$(_2c);
var _37=_2f.center.panel("options");
var _38=_30.collapsedSize;
if(_2d=="east"){
var _39=p.panel("panel")._outerWidth();
var _3a=_37.width+_39-_38;
if(_30.split||!_30.border){
_3a++;
}
return {resizeC:{width:_3a},expand:{left:cc.width()-_39},expandP:{top:_37.top,left:cc.width()-_38,width:_38,height:_37.height},collapse:{left:cc.width(),top:_37.top,height:_37.height}};
}else{
if(_2d=="west"){
var _39=p.panel("panel")._outerWidth();
var _3a=_37.width+_39-_38;
if(_30.split||!_30.border){
_3a++;
}
return {resizeC:{width:_3a,left:_38-1},expand:{left:0},expandP:{left:0,top:_37.top,width:_38,height:_37.height},collapse:{left:-_39,top:_37.top,height:_37.height}};
}else{
if(_2d=="north"){
var _3b=p.panel("panel")._outerHeight();
var hh=_37.height;
if(!_a(_2f.expandNorth)){
hh+=_3b-_38+((_30.split||!_30.border)?1:0);
}
_2f.east.add(_2f.west).add(_2f.expandEast).add(_2f.expandWest).panel("resize",{top:_38-1,height:hh});
return {resizeC:{top:_38-1,height:hh},expand:{top:0},expandP:{top:0,left:0,width:cc.width(),height:_38},collapse:{top:-_3b,width:cc.width()}};
}else{
if(_2d=="south"){
var _3b=p.panel("panel")._outerHeight();
var hh=_37.height;
if(!_a(_2f.expandSouth)){
hh+=_3b-_38+((_30.split||!_30.border)?1:0);
}
_2f.east.add(_2f.west).add(_2f.expandEast).add(_2f.expandWest).panel("resize",{height:hh});
return {resizeC:{height:hh},expand:{top:cc.height()-_3b},expandP:{top:cc.height()-_38,left:0,width:cc.width(),height:_38},collapse:{top:cc.height(),width:cc.width()}};
}
}
}
}
};
};
function _3c(_3d,_3e){
var _3f=$.data(_3d,"layout").panels;
var p=_3f[_3e];
var _40=p.panel("options");
if(_40.onBeforeExpand.call(p)==false){
return;
}
var _41="expand"+_3e.substring(0,1).toUpperCase()+_3e.substring(1);
if(_3f[_41]){
_3f[_41].panel("close");
p.panel("panel").stop(true,true);
p.panel("expand",false).panel("open");
var _42=_43();
p.panel("resize",_42.collapse);
p.panel("panel").animate(_42.expand,function(){
_2(_3d);
});
}
function _43(){
var cc=$(_3d);
var _44=_3f.center.panel("options");
if(_3e=="east"&&_3f.expandEast){
return {collapse:{left:cc.width(),top:_44.top,height:_44.height},expand:{left:cc.width()-p.panel("panel")._outerWidth()}};
}else{
if(_3e=="west"&&_3f.expandWest){
return {collapse:{left:-p.panel("panel")._outerWidth(),top:_44.top,height:_44.height},expand:{left:0}};
}else{
if(_3e=="north"&&_3f.expandNorth){
return {collapse:{top:-p.panel("panel")._outerHeight(),width:cc.width()},expand:{top:0}};
}else{
if(_3e=="south"&&_3f.expandSouth){
return {collapse:{top:cc.height(),width:cc.width()},expand:{top:cc.height()-p.panel("panel")._outerHeight()}};
}
}
}
}
};
};
function _a(pp){
if(!pp){
return false;
}
if(pp.length){
return pp.panel("panel").is(":visible");
}else{
return false;
}
};
function _45(_46){
var _47=$.data(_46,"layout").panels;
if(_47.east.length&&_47.east.panel("options").collapsed){
_2b(_46,"east",0);
}
if(_47.west.length&&_47.west.panel("options").collapsed){
_2b(_46,"west",0);
}
if(_47.north.length&&_47.north.panel("options").collapsed){
_2b(_46,"north",0);
}
if(_47.south.length&&_47.south.panel("options").collapsed){
_2b(_46,"south",0);
}
};
$.fn.layout=function(_48,_49){
if(typeof _48=="string"){
return $.fn.layout.methods[_48](this,_49);
}
_48=_48||{};
return this.each(function(){
var _4a=$.data(this,"layout");
if(_4a){
$.extend(_4a.options,_48);
}else{
var _4b=$.extend({},$.fn.layout.defaults,$.fn.layout.parseOptions(this),_48);
$.data(this,"layout",{options:_4b,panels:{center:$(),north:$(),south:$(),east:$(),west:$()}});
_12(this);
}
_2(this);
_45(this);
});
};
$.fn.layout.methods={options:function(jq){
return $.data(jq[0],"layout").options;
},resize:function(jq,_4c){
return jq.each(function(){
_2(this,_4c);
});
},panel:function(jq,_4d){
return $.data(jq[0],"layout").panels[_4d];
},collapse:function(jq,_4e){
return jq.each(function(){
_2b(this,_4e);
});
},expand:function(jq,_4f){
return jq.each(function(){
_3c(this,_4f);
});
},add:function(jq,_50){
return jq.each(function(){
_17(this,_50);
_2(this);
if($(this).layout("panel",_50.region).panel("options").collapsed){
_2b(this,_50.region,0);
}
});
},remove:function(jq,_51){
return jq.each(function(){
_26(this,_51);
_2(this);
});
}};
$.fn.layout.parseOptions=function(_52){
return $.extend({},$.parser.parseOptions(_52,[{fit:"boolean"}]));
};
$.fn.layout.defaults={fit:false};
$.fn.layout.parsePanelOptions=function(_53){
var t=$(_53);
return $.extend({},$.fn.panel.parseOptions(_53),$.parser.parseOptions(_53,["region",{split:"boolean",collpasedSize:"number",minWidth:"number",minHeight:"number",maxWidth:"number",maxHeight:"number"}]));
};
$.fn.layout.paneldefaults=$.extend({},$.fn.panel.defaults,{region:null,split:false,collapsedSize:28,minWidth:10,minHeight:10,maxWidth:10000,maxHeight:10000});
})(jQuery);

