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
function _1(_2,_3){
var _4=$.data(_2,"accordion");
var _5=_4.options;
var _6=_4.panels;
var cc=$(_2);
if(_3){
$.extend(_5,{width:_3.width,height:_3.height});
}
cc._size(_5);
var _7=0;
var _8="auto";
var _9=cc.find(">div.panel>div.accordion-header");
if(_9.length){
_7=$(_9[0]).css("height","")._outerHeight();
}
if(!isNaN(parseInt(_5.height))){
_8=cc.height()-_7*_9.length;
}
_a(true,_8-_a(false)+1);
function _a(_b,_c){
var _d=0;
for(var i=0;i<_6.length;i++){
var p=_6[i];
var h=p.panel("header")._outerHeight(_7);
if(p.panel("options").collapsible==_b){
var _e=isNaN(_c)?undefined:(_c+_7*h.length);
p.panel("resize",{width:cc.width(),height:(_b?_e:undefined)});
_d+=p.panel("panel").outerHeight()-_7*h.length;
}
}
return _d;
};
};
function _f(_10,_11,_12,all){
var _13=$.data(_10,"accordion").panels;
var pp=[];
for(var i=0;i<_13.length;i++){
var p=_13[i];
if(_11){
if(p.panel("options")[_11]==_12){
pp.push(p);
}
}else{
if(p[0]==$(_12)[0]){
return i;
}
}
}
if(_11){
return all?pp:(pp.length?pp[0]:null);
}else{
return -1;
}
};
function _14(_15){
return _f(_15,"collapsed",false,true);
};
function _16(_17){
var pp=_14(_17);
return pp.length?pp[0]:null;
};
function _18(_19,_1a){
return _f(_19,null,_1a);
};
function _1b(_1c,_1d){
var _1e=$.data(_1c,"accordion").panels;
if(typeof _1d=="number"){
if(_1d<0||_1d>=_1e.length){
return null;
}else{
return _1e[_1d];
}
}
return _f(_1c,"title",_1d);
};
function _1f(_20){
var _21=$.data(_20,"accordion").options;
var cc=$(_20);
if(_21.border){
cc.removeClass("accordion-noborder");
}else{
cc.addClass("accordion-noborder");
}
};
function _22(_23){
var _24=$.data(_23,"accordion");
var cc=$(_23);
cc.addClass("accordion");
_24.panels=[];
cc.children("div").each(function(){
var _25=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
var pp=$(this);
_24.panels.push(pp);
_27(_23,pp,_25);
});
cc.bind("_resize",function(e,_26){
if($(this).hasClass("easyui-fluid")||_26){
_1(_23);
}
return false;
});
};
function _27(_28,pp,_29){
var _2a=$.data(_28,"accordion").options;
pp.panel($.extend({},{collapsible:true,minimizable:false,maximizable:false,closable:false,doSize:false,collapsed:true,headerCls:"accordion-header",bodyCls:"accordion-body"},_29,{onBeforeExpand:function(){
if(_29.onBeforeExpand){
if(_29.onBeforeExpand.call(this)==false){
return false;
}
}
if(!_2a.multiple){
var all=$.grep(_14(_28),function(p){
return p.panel("options").collapsible;
});
for(var i=0;i<all.length;i++){
_35(_28,_18(_28,all[i]));
}
}
var _2b=$(this).panel("header");
_2b.addClass("accordion-header-selected");
_2b.find(".accordion-collapse").removeClass("accordion-expand");
},onExpand:function(){
if(_29.onExpand){
_29.onExpand.call(this);
}
_2a.onSelect.call(_28,$(this).panel("options").title,_18(_28,this));
},onBeforeCollapse:function(){
if(_29.onBeforeCollapse){
if(_29.onBeforeCollapse.call(this)==false){
return false;
}
}
var _2c=$(this).panel("header");
_2c.removeClass("accordion-header-selected");
_2c.find(".accordion-collapse").addClass("accordion-expand");
},onCollapse:function(){
if(_29.onCollapse){
_29.onCollapse.call(this);
}
_2a.onUnselect.call(_28,$(this).panel("options").title,_18(_28,this));
}}));
var _2d=pp.panel("header");
var _2e=_2d.children("div.panel-tool");
_2e.children("a.panel-tool-collapse").hide();
var t=$("<a href=\"javascript:void(0)\"></a>").addClass("accordion-collapse accordion-expand").appendTo(_2e);
t.bind("click",function(){
var _2f=_18(_28,pp);
if(pp.panel("options").collapsed){
_30(_28,_2f);
}else{
_35(_28,_2f);
}
return false;
});
pp.panel("options").collapsible?t.show():t.hide();
_2d.click(function(){
$(this).find("a.accordion-collapse:visible").triggerHandler("click");
return false;
});
};
function _30(_31,_32){
var p=_1b(_31,_32);
if(!p){
return;
}
_33(_31);
var _34=$.data(_31,"accordion").options;
p.panel("expand",_34.animate);
};
function _35(_36,_37){
var p=_1b(_36,_37);
if(!p){
return;
}
_33(_36);
var _38=$.data(_36,"accordion").options;
p.panel("collapse",_38.animate);
};
function _39(_3a){
var _3b=$.data(_3a,"accordion").options;
var p=_f(_3a,"selected",true);
if(p){
_3c(_18(_3a,p));
}else{
_3c(_3b.selected);
}
function _3c(_3d){
var _3e=_3b.animate;
_3b.animate=false;
_30(_3a,_3d);
_3b.animate=_3e;
};
};
function _33(_3f){
var _40=$.data(_3f,"accordion").panels;
for(var i=0;i<_40.length;i++){
_40[i].stop(true,true);
}
};
function add(_41,_42){
var _43=$.data(_41,"accordion");
var _44=_43.options;
var _45=_43.panels;
if(_42.selected==undefined){
_42.selected=true;
}
_33(_41);
var pp=$("<div></div>").appendTo(_41);
_45.push(pp);
_27(_41,pp,_42);
_1(_41);
_44.onAdd.call(_41,_42.title,_45.length-1);
if(_42.selected){
_30(_41,_45.length-1);
}
};
function _46(_47,_48){
var _49=$.data(_47,"accordion");
var _4a=_49.options;
var _4b=_49.panels;
_33(_47);
var _4c=_1b(_47,_48);
var _4d=_4c.panel("options").title;
var _4e=_18(_47,_4c);
if(!_4c){
return;
}
if(_4a.onBeforeRemove.call(_47,_4d,_4e)==false){
return;
}
_4b.splice(_4e,1);
_4c.panel("destroy");
if(_4b.length){
_1(_47);
var _4f=_16(_47);
if(!_4f){
_30(_47,0);
}
}
_4a.onRemove.call(_47,_4d,_4e);
};
$.fn.accordion=function(_50,_51){
if(typeof _50=="string"){
return $.fn.accordion.methods[_50](this,_51);
}
_50=_50||{};
return this.each(function(){
var _52=$.data(this,"accordion");
if(_52){
$.extend(_52.options,_50);
}else{
$.data(this,"accordion",{options:$.extend({},$.fn.accordion.defaults,$.fn.accordion.parseOptions(this),_50),accordion:$(this).addClass("accordion"),panels:[]});
_22(this);
}
_1f(this);
_1(this);
_39(this);
});
};
$.fn.accordion.methods={options:function(jq){
return $.data(jq[0],"accordion").options;
},panels:function(jq){
return $.data(jq[0],"accordion").panels;
},resize:function(jq,_53){
return jq.each(function(){
_1(this,_53);
});
},getSelections:function(jq){
return _14(jq[0]);
},getSelected:function(jq){
return _16(jq[0]);
},getPanel:function(jq,_54){
return _1b(jq[0],_54);
},getPanelIndex:function(jq,_55){
return _18(jq[0],_55);
},select:function(jq,_56){
return jq.each(function(){
_30(this,_56);
});
},unselect:function(jq,_57){
return jq.each(function(){
_35(this,_57);
});
},add:function(jq,_58){
return jq.each(function(){
add(this,_58);
});
},remove:function(jq,_59){
return jq.each(function(){
_46(this,_59);
});
}};
$.fn.accordion.parseOptions=function(_5a){
var t=$(_5a);
return $.extend({},$.parser.parseOptions(_5a,["width","height",{fit:"boolean",border:"boolean",animate:"boolean",multiple:"boolean",selected:"number"}]));
};
$.fn.accordion.defaults={width:"auto",height:"auto",fit:false,border:true,animate:true,multiple:false,selected:0,onSelect:function(_5b,_5c){
},onUnselect:function(_5d,_5e){
},onAdd:function(_5f,_60){
},onBeforeRemove:function(_61,_62){
},onRemove:function(_63,_64){
}};
})(jQuery);

