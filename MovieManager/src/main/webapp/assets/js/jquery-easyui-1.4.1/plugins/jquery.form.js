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
var _4=$.data(_2,"form").options;
$.extend(_4,_3||{});
var _5=$.extend({},_4.queryParams);
if(_4.onSubmit.call(_2,_5)==false){
return;
}
$(_2).find(".textbox-text:focus").blur();
var _6="easyui_frame_"+(new Date().getTime());
var _7=$("<iframe id="+_6+" name="+_6+"></iframe>").appendTo("body");
_7.attr("src",window.ActiveXObject?"javascript:false":"about:blank");
_7.css({position:"absolute",top:-1000,left:-1000});
_7.bind("load",cb);
_8(_5);
function _8(_9){
var _a=$(_2);
if(_4.url){
_a.attr("action",_4.url);
}
var t=_a.attr("target"),a=_a.attr("action");
_a.attr("target",_6);
var _b=$();
try{
for(var n in _9){
var _c=$("<input type=\"hidden\" name=\""+n+"\">").val(_9[n]).appendTo(_a);
_b=_b.add(_c);
}
_d();
_a[0].submit();
}
finally{
_a.attr("action",a);
t?_a.attr("target",t):_a.removeAttr("target");
_b.remove();
}
};
function _d(){
var f=$("#"+_6);
if(!f.length){
return;
}
try{
var s=f.contents()[0].readyState;
if(s&&s.toLowerCase()=="uninitialized"){
setTimeout(_d,100);
}
}
catch(e){
cb();
}
};
var _e=10;
function cb(){
var f=$("#"+_6);
if(!f.length){
return;
}
f.unbind();
var _f="";
try{
var _10=f.contents().find("body");
_f=_10.html();
if(_f==""){
if(--_e){
setTimeout(cb,100);
return;
}
}
var ta=_10.find(">textarea");
if(ta.length){
_f=ta.val();
}else{
var pre=_10.find(">pre");
if(pre.length){
_f=pre.html();
}
}
}
catch(e){
}
_4.success(_f);
setTimeout(function(){
f.unbind();
f.remove();
},100);
};
};
function _11(_12,_13){
var _14=$.data(_12,"form").options;
if(typeof _13=="string"){
var _15={};
if(_14.onBeforeLoad.call(_12,_15)==false){
return;
}
$.ajax({url:_13,data:_15,dataType:"json",success:function(_16){
_17(_16);
},error:function(){
_14.onLoadError.apply(_12,arguments);
}});
}else{
_17(_13);
}
function _17(_18){
var _19=$(_12);
for(var _1a in _18){
var val=_18[_1a];
var rr=_1b(_1a,val);
if(!rr.length){
var _1c=_1d(_1a,val);
if(!_1c){
$("input[name=\""+_1a+"\"]",_19).val(val);
$("textarea[name=\""+_1a+"\"]",_19).val(val);
$("select[name=\""+_1a+"\"]",_19).val(val);
}
}
_1e(_1a,val);
}
_14.onLoadSuccess.call(_12,_18);
_2b(_12);
};
function _1b(_1f,val){
var rr=$(_12).find("input[name=\""+_1f+"\"][type=radio], input[name=\""+_1f+"\"][type=checkbox]");
rr._propAttr("checked",false);
rr.each(function(){
var f=$(this);
if(f.val()==String(val)||$.inArray(f.val(),$.isArray(val)?val:[val])>=0){
f._propAttr("checked",true);
}
});
return rr;
};
function _1d(_20,val){
var _21=0;
var pp=["textbox","numberbox","slider"];
for(var i=0;i<pp.length;i++){
var p=pp[i];
var f=$(_12).find("input["+p+"Name=\""+_20+"\"]");
if(f.length){
f[p]("setValue",val);
_21+=f.length;
}
}
return _21;
};
function _1e(_22,val){
var _23=$(_12);
var cc=["combobox","combotree","combogrid","datetimebox","datebox","combo"];
var c=_23.find("[comboName=\""+_22+"\"]");
if(c.length){
for(var i=0;i<cc.length;i++){
var _24=cc[i];
if(c.hasClass(_24+"-f")){
if(c[_24]("options").multiple){
c[_24]("setValues",val);
}else{
c[_24]("setValue",val);
}
return;
}
}
}
};
};
function _25(_26){
$("input,select,textarea",_26).each(function(){
var t=this.type,tag=this.tagName.toLowerCase();
if(t=="text"||t=="hidden"||t=="password"||tag=="textarea"){
this.value="";
}else{
if(t=="file"){
var _27=$(this);
if(!_27.hasClass("textbox-value")){
var _28=_27.clone().val("");
_28.insertAfter(_27);
if(_27.data("validatebox")){
_27.validatebox("destroy");
_28.validatebox();
}else{
_27.remove();
}
}
}else{
if(t=="checkbox"||t=="radio"){
this.checked=false;
}else{
if(tag=="select"){
this.selectedIndex=-1;
}
}
}
}
});
var t=$(_26);
var _29=["textbox","combo","combobox","combotree","combogrid","slider"];
for(var i=0;i<_29.length;i++){
var _2a=_29[i];
var r=t.find("."+_2a+"-f");
if(r.length&&r[_2a]){
r[_2a]("clear");
}
}
_2b(_26);
};
function _2c(_2d){
_2d.reset();
var t=$(_2d);
var _2e=["textbox","combo","combobox","combotree","combogrid","datebox","datetimebox","spinner","timespinner","numberbox","numberspinner","slider"];
for(var i=0;i<_2e.length;i++){
var _2f=_2e[i];
var r=t.find("."+_2f+"-f");
if(r.length&&r[_2f]){
r[_2f]("reset");
}
}
_2b(_2d);
};
function _30(_31){
var _32=$.data(_31,"form").options;
$(_31).unbind(".form");
if(_32.ajax){
$(_31).bind("submit.form",function(){
setTimeout(function(){
_1(_31,_32);
},0);
return false;
});
}
_33(_31,_32.novalidate);
};
function _34(_35,_36){
_36=_36||{};
var _37=$.data(_35,"form");
if(_37){
$.extend(_37.options,_36);
}else{
$.data(_35,"form",{options:$.extend({},$.fn.form.defaults,$.fn.form.parseOptions(_35),_36)});
}
};
function _2b(_38){
if($.fn.validatebox){
var t=$(_38);
t.find(".validatebox-text:not(:disabled)").validatebox("validate");
var _39=t.find(".validatebox-invalid");
_39.filter(":not(:disabled):first").focus();
return _39.length==0;
}
return true;
};
function _33(_3a,_3b){
var _3c=$.data(_3a,"form").options;
_3c.novalidate=_3b;
$(_3a).find(".validatebox-text:not(:disabled)").validatebox(_3b?"disableValidation":"enableValidation");
};
$.fn.form=function(_3d,_3e){
if(typeof _3d=="string"){
this.each(function(){
_34(this);
});
return $.fn.form.methods[_3d](this,_3e);
}
return this.each(function(){
_34(this,_3d);
_30(this);
});
};
$.fn.form.methods={options:function(jq){
return $.data(jq[0],"form").options;
},submit:function(jq,_3f){
return jq.each(function(){
_1(this,_3f);
});
},load:function(jq,_40){
return jq.each(function(){
_11(this,_40);
});
},clear:function(jq){
return jq.each(function(){
_25(this);
});
},reset:function(jq){
return jq.each(function(){
_2c(this);
});
},validate:function(jq){
return _2b(jq[0]);
},disableValidation:function(jq){
return jq.each(function(){
_33(this,true);
});
},enableValidation:function(jq){
return jq.each(function(){
_33(this,false);
});
}};
$.fn.form.parseOptions=function(_41){
var t=$(_41);
return $.extend({},$.parser.parseOptions(_41,[{ajax:"boolean"}]),{url:(t.attr("action")?t.attr("action"):undefined)});
};
$.fn.form.defaults={novalidate:false,ajax:true,url:null,queryParams:{},onSubmit:function(_42){
return $(this).form("validate");
},success:function(_43){
},onBeforeLoad:function(_44){
},onLoadSuccess:function(_45){
},onLoadError:function(){
}};
})(jQuery);

