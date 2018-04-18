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
var _3=$.data(_2,"combogrid");
var _4=_3.options;
var _5=_3.grid;
$(_2).addClass("combogrid-f").combo($.extend({},_4,{onShowPanel:function(){
var p=$(this).combogrid("panel");
var _6=p.outerHeight()-p.height();
var _7=p._size("minHeight");
var _8=p._size("maxHeight");
$(this).combogrid("grid").datagrid("resize",{width:"100%",height:(isNaN(parseInt(_4.panelHeight))?"auto":"100%"),minHeight:(_7?_7-_6:""),maxHeight:(_8?_8-_6:"")});
_4.onShowPanel.call(this);
}}));
var _9=$(_2).combo("panel");
if(!_5){
_5=$("<table></table>").appendTo(_9);
_3.grid=_5;
}
_5.datagrid($.extend({},_4,{border:false,singleSelect:(!_4.multiple),onLoadSuccess:function(_a){
var _b=$(_2).combo("getValues");
var _c=_4.onSelect;
_4.onSelect=function(){
};
_1c(_2,_b,_3.remainText);
_4.onSelect=_c;
_4.onLoadSuccess.apply(_2,arguments);
},onClickRow:_d,onSelect:function(_e,_f){
_10();
_4.onSelect.call(this,_e,_f);
},onUnselect:function(_11,row){
_10();
_4.onUnselect.call(this,_11,row);
},onSelectAll:function(_12){
_10();
_4.onSelectAll.call(this,_12);
},onUnselectAll:function(_13){
if(_4.multiple){
_10();
}
_4.onUnselectAll.call(this,_13);
}}));
function _d(_14,row){
_3.remainText=false;
_10();
if(!_4.multiple){
$(_2).combo("hidePanel");
}
_4.onClickRow.call(this,_14,row);
};
function _10(){
var _15=_5.datagrid("getSelections");
var vv=[],ss=[];
for(var i=0;i<_15.length;i++){
vv.push(_15[i][_4.idField]);
ss.push(_15[i][_4.textField]);
}
if(!_4.multiple){
$(_2).combo("setValues",(vv.length?vv:[""]));
}else{
$(_2).combo("setValues",vv);
}
if(!_3.remainText){
$(_2).combo("setText",ss.join(_4.separator));
}
};
};
function nav(_16,dir){
var _17=$.data(_16,"combogrid");
var _18=_17.options;
var _19=_17.grid;
var _1a=_19.datagrid("getRows").length;
if(!_1a){
return;
}
var tr=_18.finder.getTr(_19[0],null,"highlight");
if(!tr.length){
tr=_18.finder.getTr(_19[0],null,"selected");
}
var _1b;
if(!tr.length){
_1b=(dir=="next"?0:_1a-1);
}else{
var _1b=parseInt(tr.attr("datagrid-row-index"));
_1b+=(dir=="next"?1:-1);
if(_1b<0){
_1b=_1a-1;
}
if(_1b>=_1a){
_1b=0;
}
}
_19.datagrid("highlightRow",_1b);
if(_18.selectOnNavigation){
_17.remainText=false;
_19.datagrid("selectRow",_1b);
}
};
function _1c(_1d,_1e,_1f){
var _20=$.data(_1d,"combogrid");
var _21=_20.options;
var _22=_20.grid;
var _23=_22.datagrid("getRows");
var ss=[];
var _24=$(_1d).combo("getValues");
var _25=$(_1d).combo("options");
var _26=_25.onChange;
_25.onChange=function(){
};
_22.datagrid("clearSelections");
if(!$.isArray(_1e)){
_1e=_1e.split(_21.separator);
}
for(var i=0;i<_1e.length;i++){
var _27=_22.datagrid("getRowIndex",_1e[i]);
if(_27>=0){
_22.datagrid("selectRow",_27);
ss.push(_23[_27][_21.textField]);
}else{
ss.push(_1e[i]);
}
}
$(_1d).combo("setValues",_24);
_25.onChange=_26;
$(_1d).combo("setValues",_1e);
if(!_1f){
var s=ss.join(_21.separator);
if($(_1d).combo("getText")!=s){
$(_1d).combo("setText",s);
}
}
};
function _28(_29,q){
var _2a=$.data(_29,"combogrid");
var _2b=_2a.options;
var _2c=_2a.grid;
_2a.remainText=true;
if(_2b.multiple&&!q){
_1c(_29,[],true);
}else{
_1c(_29,[q],true);
}
if(_2b.mode=="remote"){
_2c.datagrid("clearSelections");
_2c.datagrid("load",$.extend({},_2b.queryParams,{q:q}));
}else{
if(!q){
return;
}
_2c.datagrid("clearSelections").datagrid("highlightRow",-1);
var _2d=_2c.datagrid("getRows");
var qq=_2b.multiple?q.split(_2b.separator):[q];
$.map(qq,function(q){
q=$.trim(q);
if(q){
$.map(_2d,function(row,i){
if(q==row[_2b.textField]){
_2c.datagrid("selectRow",i);
}else{
if(_2b.filter.call(_29,q,row)){
_2c.datagrid("highlightRow",i);
}
}
});
}
});
}
};
function _2e(_2f){
var _30=$.data(_2f,"combogrid");
var _31=_30.options;
var _32=_30.grid;
var tr=_31.finder.getTr(_32[0],null,"highlight");
_30.remainText=false;
if(tr.length){
var _33=parseInt(tr.attr("datagrid-row-index"));
if(_31.multiple){
if(tr.hasClass("datagrid-row-selected")){
_32.datagrid("unselectRow",_33);
}else{
_32.datagrid("selectRow",_33);
}
}else{
_32.datagrid("selectRow",_33);
}
}
var vv=[];
$.map(_32.datagrid("getSelections"),function(row){
vv.push(row[_31.idField]);
});
$(_2f).combogrid("setValues",vv);
if(!_31.multiple){
$(_2f).combogrid("hidePanel");
}
};
$.fn.combogrid=function(_34,_35){
if(typeof _34=="string"){
var _36=$.fn.combogrid.methods[_34];
if(_36){
return _36(this,_35);
}else{
return this.combo(_34,_35);
}
}
_34=_34||{};
return this.each(function(){
var _37=$.data(this,"combogrid");
if(_37){
$.extend(_37.options,_34);
}else{
_37=$.data(this,"combogrid",{options:$.extend({},$.fn.combogrid.defaults,$.fn.combogrid.parseOptions(this),_34)});
}
_1(this);
});
};
$.fn.combogrid.methods={options:function(jq){
var _38=jq.combo("options");
return $.extend($.data(jq[0],"combogrid").options,{width:_38.width,height:_38.height,originalValue:_38.originalValue,disabled:_38.disabled,readonly:_38.readonly});
},grid:function(jq){
return $.data(jq[0],"combogrid").grid;
},setValues:function(jq,_39){
return jq.each(function(){
_1c(this,_39);
});
},setValue:function(jq,_3a){
return jq.each(function(){
_1c(this,[_3a]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combogrid("grid").datagrid("clearSelections");
$(this).combo("clear");
});
},reset:function(jq){
return jq.each(function(){
var _3b=$(this).combogrid("options");
if(_3b.multiple){
$(this).combogrid("setValues",_3b.originalValue);
}else{
$(this).combogrid("setValue",_3b.originalValue);
}
});
}};
$.fn.combogrid.parseOptions=function(_3c){
var t=$(_3c);
return $.extend({},$.fn.combo.parseOptions(_3c),$.fn.datagrid.parseOptions(_3c),$.parser.parseOptions(_3c,["idField","textField","mode"]));
};
$.fn.combogrid.defaults=$.extend({},$.fn.combo.defaults,$.fn.datagrid.defaults,{height:22,loadMsg:null,idField:null,textField:null,mode:"local",keyHandler:{up:function(e){
nav(this,"prev");
e.preventDefault();
},down:function(e){
nav(this,"next");
e.preventDefault();
},left:function(e){
},right:function(e){
},enter:function(e){
_2e(this);
},query:function(q,e){
_28(this,q);
}},filter:function(q,row){
var _3d=$(this).combogrid("options");
return row[_3d.textField].toLowerCase().indexOf(q.toLowerCase())==0;
}});
})(jQuery);

