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
var _3=$.data(_2,"combotree");
var _4=_3.options;
var _5=_3.tree;
$(_2).addClass("combotree-f");
$(_2).combo(_4);
var _6=$(_2).combo("panel");
if(!_5){
_5=$("<ul></ul>").appendTo(_6);
$.data(_2,"combotree").tree=_5;
}
_5.tree($.extend({},_4,{checkbox:_4.multiple,onLoadSuccess:function(_7,_8){
var _9=$(_2).combotree("getValues");
if(_4.multiple){
var _a=_5.tree("getChecked");
for(var i=0;i<_a.length;i++){
var id=_a[i].id;
(function(){
for(var i=0;i<_9.length;i++){
if(id==_9[i]){
return;
}
}
_9.push(id);
})();
}
}
$(_2).combotree("setValues",_9);
_4.onLoadSuccess.call(this,_7,_8);
},onClick:function(_b){
if(_4.multiple){
$(this).tree(_b.checked?"uncheck":"check",_b.target);
}else{
$(_2).combo("hidePanel");
}
_e(_2);
_4.onClick.call(this,_b);
},onCheck:function(_c,_d){
_e(_2);
_4.onCheck.call(this,_c,_d);
}}));
};
function _e(_f){
var _10=$.data(_f,"combotree");
var _11=_10.options;
var _12=_10.tree;
var vv=[],ss=[];
if(_11.multiple){
var _13=_12.tree("getChecked");
for(var i=0;i<_13.length;i++){
vv.push(_13[i].id);
ss.push(_13[i].text);
}
}else{
var _14=_12.tree("getSelected");
if(_14){
vv.push(_14.id);
ss.push(_14.text);
}
}
$(_f).combo("setValues",vv).combo("setText",ss.join(_11.separator));
};
function _15(_16,_17){
var _18=$.data(_16,"combotree");
var _19=_18.options;
var _1a=_18.tree;
var _1b=_1a.tree("options");
var _1c=_1b.onCheck;
var _1d=_1b.onSelect;
_1b.onCheck=_1b.onSelect=function(){
};
_1a.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
if(!$.isArray(_17)){
_17=_17.split(_19.separator);
}
for(var i=0;i<_17.length;i++){
var _1e=_1a.tree("find",_17[i]);
if(_1e){
_1a.tree("check",_1e.target);
_1a.tree("select",_1e.target);
}
}
_1b.onCheck=_1c;
_1b.onSelect=_1d;
_e(_16);
};
$.fn.combotree=function(_1f,_20){
if(typeof _1f=="string"){
var _21=$.fn.combotree.methods[_1f];
if(_21){
return _21(this,_20);
}else{
return this.combo(_1f,_20);
}
}
_1f=_1f||{};
return this.each(function(){
var _22=$.data(this,"combotree");
if(_22){
$.extend(_22.options,_1f);
}else{
$.data(this,"combotree",{options:$.extend({},$.fn.combotree.defaults,$.fn.combotree.parseOptions(this),_1f)});
}
_1(this);
});
};
$.fn.combotree.methods={options:function(jq){
var _23=jq.combo("options");
return $.extend($.data(jq[0],"combotree").options,{width:_23.width,height:_23.height,originalValue:_23.originalValue,disabled:_23.disabled,readonly:_23.readonly});
},clone:function(jq,_24){
var t=jq.combo("clone",_24);
t.data("combotree",{options:$.extend(true,{},jq.combotree("options")),tree:jq.combotree("tree")});
return t;
},tree:function(jq){
return $.data(jq[0],"combotree").tree;
},loadData:function(jq,_25){
return jq.each(function(){
var _26=$.data(this,"combotree").options;
_26.data=_25;
var _27=$.data(this,"combotree").tree;
_27.tree("loadData",_25);
});
},reload:function(jq,url){
return jq.each(function(){
var _28=$.data(this,"combotree").options;
var _29=$.data(this,"combotree").tree;
if(url){
_28.url=url;
}
_29.tree({url:_28.url});
});
},setValues:function(jq,_2a){
return jq.each(function(){
_15(this,_2a);
});
},setValue:function(jq,_2b){
return jq.each(function(){
_15(this,[_2b]);
});
},clear:function(jq){
return jq.each(function(){
var _2c=$.data(this,"combotree").tree;
_2c.find("div.tree-node-selected").removeClass("tree-node-selected");
var cc=_2c.tree("getChecked");
for(var i=0;i<cc.length;i++){
_2c.tree("uncheck",cc[i].target);
}
$(this).combo("clear");
});
},reset:function(jq){
return jq.each(function(){
var _2d=$(this).combotree("options");
if(_2d.multiple){
$(this).combotree("setValues",_2d.originalValue);
}else{
$(this).combotree("setValue",_2d.originalValue);
}
});
}};
$.fn.combotree.parseOptions=function(_2e){
return $.extend({},$.fn.combo.parseOptions(_2e),$.fn.tree.parseOptions(_2e));
};
$.fn.combotree.defaults=$.extend({},$.fn.combo.defaults,$.fn.tree.defaults,{editable:false});
})(jQuery);

