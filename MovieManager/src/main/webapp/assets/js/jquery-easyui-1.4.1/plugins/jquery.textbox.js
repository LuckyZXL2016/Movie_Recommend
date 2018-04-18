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
$(_2).addClass("textbox-f").hide();
var _3=$("<span class=\"textbox\">"+"<input class=\"textbox-text\" autocomplete=\"off\">"+"<input type=\"hidden\" class=\"textbox-value\">"+"</span>").insertAfter(_2);
var _4=$(_2).attr("name");
if(_4){
_3.find("input.textbox-value").attr("name",_4);
$(_2).removeAttr("name").attr("textboxName",_4);
}
return _3;
};
function _5(_6){
var _7=$.data(_6,"textbox");
var _8=_7.options;
var tb=_7.textbox;
tb.find(".textbox-text").remove();
if(_8.multiline){
$("<textarea class=\"textbox-text\" autocomplete=\"off\"></textarea>").prependTo(tb);
}else{
$("<input type=\""+_8.type+"\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
}
tb.find(".textbox-addon").remove();
var bb=_8.icons?$.extend(true,[],_8.icons):[];
if(_8.iconCls){
bb.push({iconCls:_8.iconCls,disabled:true});
}
if(bb.length){
var bc=$("<span class=\"textbox-addon\"></span>").prependTo(tb);
bc.addClass("textbox-addon-"+_8.iconAlign);
for(var i=0;i<bb.length;i++){
bc.append("<a href=\"javascript:void(0)\" class=\"textbox-icon "+bb[i].iconCls+"\" icon-index=\""+i+"\" tabindex=\"-1\"></a>");
}
}
tb.find(".textbox-button").remove();
if(_8.buttonText||_8.buttonIcon){
var _9=$("<a href=\"javascript:void(0)\" class=\"textbox-button\"></a>").prependTo(tb);
_9.addClass("textbox-button-"+_8.buttonAlign).linkbutton({text:_8.buttonText,iconCls:_8.buttonIcon});
}
_a(_6,_8.disabled);
_b(_6,_8.readonly);
};
function _c(_d){
var tb=$.data(_d,"textbox").textbox;
tb.find(".textbox-text").validatebox("destroy");
tb.remove();
$(_d).remove();
};
function _e(_f,_10){
var _11=$.data(_f,"textbox");
var _12=_11.options;
var tb=_11.textbox;
var _13=tb.parent();
if(_10){
_12.width=_10;
}
if(isNaN(parseInt(_12.width))){
var c=$(_f).clone();
c.css("visibility","hidden");
c.insertAfter(_f);
_12.width=c.outerWidth();
c.remove();
}
tb.appendTo("body");
var _14=tb.find(".textbox-text");
var btn=tb.find(".textbox-button");
var _15=tb.find(".textbox-addon");
var _16=_15.find(".textbox-icon");
tb._size(_12,_13);
btn.linkbutton("resize",{height:tb.height()});
btn.css({left:(_12.buttonAlign=="left"?0:""),right:(_12.buttonAlign=="right"?0:"")});
_15.css({left:(_12.iconAlign=="left"?(_12.buttonAlign=="left"?btn._outerWidth():0):""),right:(_12.iconAlign=="right"?(_12.buttonAlign=="right"?btn._outerWidth():0):"")});
_16.css({width:_12.iconWidth+"px",height:tb.height()+"px"});
_14.css({paddingLeft:(_f.style.paddingLeft||""),paddingRight:(_f.style.paddingRight||""),marginLeft:_17("left"),marginRight:_17("right")});
if(_12.multiline){
_14.css({paddingTop:(_f.style.paddingTop||""),paddingBottom:(_f.style.paddingBottom||"")});
_14._outerHeight(tb.height());
}else{
var _18=Math.floor((tb.height()-_14.height())/2);
_14.css({paddingTop:_18+"px",paddingBottom:_18+"px"});
}
_14._outerWidth(tb.width()-_16.length*_12.iconWidth-btn._outerWidth());
tb.insertAfter(_f);
_12.onResize.call(_f,_12.width,_12.height);
function _17(_19){
return (_12.iconAlign==_19?_15._outerWidth():0)+(_12.buttonAlign==_19?btn._outerWidth():0);
};
};
function _1a(_1b){
var _1c=$(_1b).textbox("options");
var _1d=$(_1b).textbox("textbox");
_1d.validatebox($.extend({},_1c,{deltaX:$(_1b).textbox("getTipX"),onBeforeValidate:function(){
var box=$(this);
if(!box.is(":focus")){
_1c.oldInputValue=box.val();
box.val(_1c.value);
}
},onValidate:function(_1e){
var box=$(this);
if(_1c.oldInputValue!=undefined){
box.val(_1c.oldInputValue);
_1c.oldInputValue=undefined;
}
var tb=box.parent();
if(_1e){
tb.removeClass("textbox-invalid");
}else{
tb.addClass("textbox-invalid");
}
}}));
};
function _1f(_20){
var _21=$.data(_20,"textbox");
var _22=_21.options;
var tb=_21.textbox;
var _23=tb.find(".textbox-text");
_23.attr("placeholder",_22.prompt);
_23.unbind(".textbox");
if(!_22.disabled&&!_22.readonly){
_23.bind("blur.textbox",function(e){
if(!tb.hasClass("textbox-focused")){
return;
}
_22.value=$(this).val();
if(_22.value==""){
$(this).val(_22.prompt).addClass("textbox-prompt");
}else{
$(this).removeClass("textbox-prompt");
}
tb.removeClass("textbox-focused");
}).bind("focus.textbox",function(e){
if(tb.hasClass("textbox-focused")){
return;
}
if($(this).val()!=_22.value){
$(this).val(_22.value);
}
$(this).removeClass("textbox-prompt");
tb.addClass("textbox-focused");
});
for(var _24 in _22.inputEvents){
_23.bind(_24+".textbox",{target:_20},_22.inputEvents[_24]);
}
}
var _25=tb.find(".textbox-addon");
_25.unbind().bind("click",{target:_20},function(e){
var _26=$(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
if(_26.length){
var _27=parseInt(_26.attr("icon-index"));
var _28=_22.icons[_27];
if(_28&&_28.handler){
_28.handler.call(_26[0],e);
_22.onClickIcon.call(_20,_27);
}
}
});
_25.find(".textbox-icon").each(function(_29){
var _2a=_22.icons[_29];
var _2b=$(this);
if(!_2a||_2a.disabled||_22.disabled||_22.readonly){
_2b.addClass("textbox-icon-disabled");
}else{
_2b.removeClass("textbox-icon-disabled");
}
});
var btn=tb.find(".textbox-button");
btn.unbind(".textbox").bind("click.textbox",function(){
if(!btn.linkbutton("options").disabled){
_22.onClickButton.call(_20);
}
});
btn.linkbutton((_22.disabled||_22.readonly)?"disable":"enable");
tb.unbind(".textbox").bind("_resize.textbox",function(e,_2c){
if($(this).hasClass("easyui-fluid")||_2c){
_e(_20);
}
return false;
});
};
function _a(_2d,_2e){
var _2f=$.data(_2d,"textbox");
var _30=_2f.options;
var tb=_2f.textbox;
if(_2e){
_30.disabled=true;
$(_2d).attr("disabled","disabled");
tb.find(".textbox-text,.textbox-value").attr("disabled","disabled");
}else{
_30.disabled=false;
$(_2d).removeAttr("disabled");
tb.find(".textbox-text,.textbox-value").removeAttr("disabled");
}
};
function _b(_31,_32){
var _33=$.data(_31,"textbox");
var _34=_33.options;
_34.readonly=_32==undefined?true:_32;
var _35=_33.textbox.find(".textbox-text");
_35.removeAttr("readonly").removeClass("textbox-text-readonly");
if(_34.readonly||!_34.editable){
_35.attr("readonly","readonly").addClass("textbox-text-readonly");
}
};
$.fn.textbox=function(_36,_37){
if(typeof _36=="string"){
var _38=$.fn.textbox.methods[_36];
if(_38){
return _38(this,_37);
}else{
return this.each(function(){
var _39=$(this).textbox("textbox");
_39.validatebox(_36,_37);
});
}
}
_36=_36||{};
return this.each(function(){
var _3a=$.data(this,"textbox");
if(_3a){
$.extend(_3a.options,_36);
if(_36.value!=undefined){
_3a.options.originalValue=_36.value;
}
}else{
_3a=$.data(this,"textbox",{options:$.extend({},$.fn.textbox.defaults,$.fn.textbox.parseOptions(this),_36),textbox:_1(this)});
_3a.options.originalValue=_3a.options.value;
}
_5(this);
_1f(this);
_e(this);
_1a(this);
$(this).textbox("initValue",_3a.options.value);
});
};
$.fn.textbox.methods={options:function(jq){
return $.data(jq[0],"textbox").options;
},cloneFrom:function(jq,_3b){
return jq.each(function(){
var t=$(this);
if(t.data("textbox")){
return;
}
if(!$(_3b).data("textbox")){
$(_3b).textbox();
}
var _3c=t.attr("name")||"";
t.addClass("textbox-f").hide();
t.removeAttr("name").attr("textboxName",_3c);
var _3d=$(_3b).next().clone().insertAfter(t);
_3d.find("input.textbox-value").attr("name",_3c);
$.data(this,"textbox",{options:$.extend(true,{},$(_3b).textbox("options")),textbox:_3d});
var _3e=$(_3b).textbox("button");
if(_3e.length){
t.textbox("button").linkbutton($.extend(true,{},_3e.linkbutton("options")));
}
_1f(this);
_1a(this);
});
},textbox:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-text");
},button:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-button");
},destroy:function(jq){
return jq.each(function(){
_c(this);
});
},resize:function(jq,_3f){
return jq.each(function(){
_e(this,_3f);
});
},disable:function(jq){
return jq.each(function(){
_a(this,true);
_1f(this);
});
},enable:function(jq){
return jq.each(function(){
_a(this,false);
_1f(this);
});
},readonly:function(jq,_40){
return jq.each(function(){
_b(this,_40);
_1f(this);
});
},isValid:function(jq){
return jq.textbox("textbox").validatebox("isValid");
},clear:function(jq){
return jq.each(function(){
$(this).textbox("setValue","");
});
},setText:function(jq,_41){
return jq.each(function(){
var _42=$(this).textbox("options");
var _43=$(this).textbox("textbox");
if($(this).textbox("getText")!=_41){
_42.value=_41;
_43.val(_41);
}
if(!_43.is(":focus")){
if(_41){
_43.removeClass("textbox-prompt");
}else{
_43.val(_42.prompt).addClass("textbox-prompt");
}
}
$(this).textbox("validate");
});
},initValue:function(jq,_44){
return jq.each(function(){
var _45=$.data(this,"textbox");
_45.options.value="";
$(this).textbox("setText",_44);
_45.textbox.find(".textbox-value").val(_44);
$(this).val(_44);
});
},setValue:function(jq,_46){
return jq.each(function(){
var _47=$.data(this,"textbox").options;
var _48=$(this).textbox("getValue");
$(this).textbox("initValue",_46);
if(_48!=_46){
_47.onChange.call(this,_46,_48);
}
});
},getText:function(jq){
var _49=jq.textbox("textbox");
if(_49.is(":focus")){
return _49.val();
}else{
return jq.textbox("options").value;
}
},getValue:function(jq){
return jq.data("textbox").textbox.find(".textbox-value").val();
},reset:function(jq){
return jq.each(function(){
var _4a=$(this).textbox("options");
$(this).textbox("setValue",_4a.originalValue);
});
},getIcon:function(jq,_4b){
return jq.data("textbox").textbox.find(".textbox-icon:eq("+_4b+")");
},getTipX:function(jq){
var _4c=jq.data("textbox");
var _4d=_4c.options;
var tb=_4c.textbox;
var _4e=tb.find(".textbox-text");
var _4f=tb.find(".textbox-addon")._outerWidth();
var _50=tb.find(".textbox-button")._outerWidth();
if(_4d.tipPosition=="right"){
return (_4d.iconAlign=="right"?_4f:0)+(_4d.buttonAlign=="right"?_50:0)+1;
}else{
if(_4d.tipPosition=="left"){
return (_4d.iconAlign=="left"?-_4f:0)+(_4d.buttonAlign=="left"?-_50:0)-1;
}else{
return _4f/2*(_4d.iconAlign=="right"?1:-1);
}
}
}};
$.fn.textbox.parseOptions=function(_51){
var t=$(_51);
return $.extend({},$.fn.validatebox.parseOptions(_51),$.parser.parseOptions(_51,["prompt","iconCls","iconAlign","buttonText","buttonIcon","buttonAlign",{multiline:"boolean",editable:"boolean",iconWidth:"number"}]),{value:(t.val()||undefined),type:(t.attr("type")?t.attr("type"):undefined),disabled:(t.attr("disabled")?true:undefined),readonly:(t.attr("readonly")?true:undefined)});
};
$.fn.textbox.defaults=$.extend({},$.fn.validatebox.defaults,{width:"auto",height:22,prompt:"",value:"",type:"text",multiline:false,editable:true,disabled:false,readonly:false,icons:[],iconCls:null,iconAlign:"right",iconWidth:18,buttonText:"",buttonIcon:null,buttonAlign:"right",inputEvents:{blur:function(e){
var t=$(e.data.target);
var _52=t.textbox("options");
t.textbox("setValue",_52.value);
},keydown:function(e){
if(e.keyCode==13){
var t=$(e.data.target);
t.textbox("setValue",t.textbox("getText"));
}
}},onChange:function(_53,_54){
},onResize:function(_55,_56){
},onClickButton:function(){
},onClickIcon:function(_57){
}});
})(jQuery);

