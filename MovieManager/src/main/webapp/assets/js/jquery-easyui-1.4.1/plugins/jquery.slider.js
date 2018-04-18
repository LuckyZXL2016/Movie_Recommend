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
var _3=$("<div class=\"slider\">"+"<div class=\"slider-inner\">"+"<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>"+"<span class=\"slider-tip\"></span>"+"</div>"+"<div class=\"slider-rule\"></div>"+"<div class=\"slider-rulelabel\"></div>"+"<div style=\"clear:both\"></div>"+"<input type=\"hidden\" class=\"slider-value\">"+"</div>").insertAfter(_2);
var t=$(_2);
t.addClass("slider-f").hide();
var _4=t.attr("name");
if(_4){
_3.find("input.slider-value").attr("name",_4);
t.removeAttr("name").attr("sliderName",_4);
}
_3.bind("_resize",function(e,_5){
if($(this).hasClass("easyui-fluid")||_5){
_6(_2);
}
return false;
});
return _3;
};
function _6(_7,_8){
var _9=$.data(_7,"slider");
var _a=_9.options;
var _b=_9.slider;
if(_8){
if(_8.width){
_a.width=_8.width;
}
if(_8.height){
_a.height=_8.height;
}
}
_b._size(_a);
if(_a.mode=="h"){
_b.css("height","");
_b.children("div").css("height","");
}else{
_b.css("width","");
_b.children("div").css("width","");
_b.children("div.slider-rule,div.slider-rulelabel,div.slider-inner")._outerHeight(_b._outerHeight());
}
_c(_7);
};
function _d(_e){
var _f=$.data(_e,"slider");
var _10=_f.options;
var _11=_f.slider;
var aa=_10.mode=="h"?_10.rule:_10.rule.slice(0).reverse();
if(_10.reversed){
aa=aa.slice(0).reverse();
}
_12(aa);
function _12(aa){
var _13=_11.find("div.slider-rule");
var _14=_11.find("div.slider-rulelabel");
_13.empty();
_14.empty();
for(var i=0;i<aa.length;i++){
var _15=i*100/(aa.length-1)+"%";
var _16=$("<span></span>").appendTo(_13);
_16.css((_10.mode=="h"?"left":"top"),_15);
if(aa[i]!="|"){
_16=$("<span></span>").appendTo(_14);
_16.html(aa[i]);
if(_10.mode=="h"){
_16.css({left:_15,marginLeft:-Math.round(_16.outerWidth()/2)});
}else{
_16.css({top:_15,marginTop:-Math.round(_16.outerHeight()/2)});
}
}
}
};
};
function _17(_18){
var _19=$.data(_18,"slider");
var _1a=_19.options;
var _1b=_19.slider;
_1b.removeClass("slider-h slider-v slider-disabled");
_1b.addClass(_1a.mode=="h"?"slider-h":"slider-v");
_1b.addClass(_1a.disabled?"slider-disabled":"");
_1b.find("a.slider-handle").draggable({axis:_1a.mode,cursor:"pointer",disabled:_1a.disabled,onDrag:function(e){
var _1c=e.data.left;
var _1d=_1b.width();
if(_1a.mode!="h"){
_1c=e.data.top;
_1d=_1b.height();
}
if(_1c<0||_1c>_1d){
return false;
}else{
var _1e=_34(_18,_1c);
_1f(_1e);
return false;
}
},onBeforeDrag:function(){
_19.isDragging=true;
},onStartDrag:function(){
_1a.onSlideStart.call(_18,_1a.value);
},onStopDrag:function(e){
var _20=_34(_18,(_1a.mode=="h"?e.data.left:e.data.top));
_1f(_20);
_1a.onSlideEnd.call(_18,_1a.value);
_1a.onComplete.call(_18,_1a.value);
_19.isDragging=false;
}});
_1b.find("div.slider-inner").unbind(".slider").bind("mousedown.slider",function(e){
if(_19.isDragging||_1a.disabled){
return;
}
var pos=$(this).offset();
var _21=_34(_18,(_1a.mode=="h"?(e.pageX-pos.left):(e.pageY-pos.top)));
_1f(_21);
_1a.onComplete.call(_18,_1a.value);
});
function _1f(_22){
var s=Math.abs(_22%_1a.step);
if(s<_1a.step/2){
_22-=s;
}else{
_22=_22-s+_1a.step;
}
_23(_18,_22);
};
};
function _23(_24,_25){
var _26=$.data(_24,"slider");
var _27=_26.options;
var _28=_26.slider;
var _29=_27.value;
if(_25<_27.min){
_25=_27.min;
}
if(_25>_27.max){
_25=_27.max;
}
_27.value=_25;
$(_24).val(_25);
_28.find("input.slider-value").val(_25);
var pos=_2a(_24,_25);
var tip=_28.find(".slider-tip");
if(_27.showTip){
tip.show();
tip.html(_27.tipFormatter.call(_24,_27.value));
}else{
tip.hide();
}
if(_27.mode=="h"){
var _2b="left:"+pos+"px;";
_28.find(".slider-handle").attr("style",_2b);
tip.attr("style",_2b+"margin-left:"+(-Math.round(tip.outerWidth()/2))+"px");
}else{
var _2b="top:"+pos+"px;";
_28.find(".slider-handle").attr("style",_2b);
tip.attr("style",_2b+"margin-left:"+(-Math.round(tip.outerWidth()))+"px");
}
if(_29!=_25){
_27.onChange.call(_24,_25,_29);
}
};
function _c(_2c){
var _2d=$.data(_2c,"slider").options;
var fn=_2d.onChange;
_2d.onChange=function(){
};
_23(_2c,_2d.value);
_2d.onChange=fn;
};
function _2a(_2e,_2f){
var _30=$.data(_2e,"slider");
var _31=_30.options;
var _32=_30.slider;
var _33=_31.mode=="h"?_32.width():_32.height();
var pos=_31.converter.toPosition.call(_2e,_2f,_33);
if(_31.mode=="v"){
pos=_32.height()-pos;
}
if(_31.reversed){
pos=_33-pos;
}
return pos.toFixed(0);
};
function _34(_35,pos){
var _36=$.data(_35,"slider");
var _37=_36.options;
var _38=_36.slider;
var _39=_37.mode=="h"?_38.width():_38.height();
var _3a=_37.converter.toValue.call(_35,_37.mode=="h"?(_37.reversed?(_39-pos):pos):(_39-pos),_39);
return _3a.toFixed(0);
};
$.fn.slider=function(_3b,_3c){
if(typeof _3b=="string"){
return $.fn.slider.methods[_3b](this,_3c);
}
_3b=_3b||{};
return this.each(function(){
var _3d=$.data(this,"slider");
if(_3d){
$.extend(_3d.options,_3b);
}else{
_3d=$.data(this,"slider",{options:$.extend({},$.fn.slider.defaults,$.fn.slider.parseOptions(this),_3b),slider:_1(this)});
$(this).removeAttr("disabled");
}
var _3e=_3d.options;
_3e.min=parseFloat(_3e.min);
_3e.max=parseFloat(_3e.max);
_3e.value=parseFloat(_3e.value);
_3e.step=parseFloat(_3e.step);
_3e.originalValue=_3e.value;
_17(this);
_d(this);
_6(this);
});
};
$.fn.slider.methods={options:function(jq){
return $.data(jq[0],"slider").options;
},destroy:function(jq){
return jq.each(function(){
$.data(this,"slider").slider.remove();
$(this).remove();
});
},resize:function(jq,_3f){
return jq.each(function(){
_6(this,_3f);
});
},getValue:function(jq){
return jq.slider("options").value;
},setValue:function(jq,_40){
return jq.each(function(){
_23(this,_40);
});
},clear:function(jq){
return jq.each(function(){
var _41=$(this).slider("options");
_23(this,_41.min);
});
},reset:function(jq){
return jq.each(function(){
var _42=$(this).slider("options");
_23(this,_42.originalValue);
});
},enable:function(jq){
return jq.each(function(){
$.data(this,"slider").options.disabled=false;
_17(this);
});
},disable:function(jq){
return jq.each(function(){
$.data(this,"slider").options.disabled=true;
_17(this);
});
}};
$.fn.slider.parseOptions=function(_43){
var t=$(_43);
return $.extend({},$.parser.parseOptions(_43,["width","height","mode",{reversed:"boolean",showTip:"boolean",min:"number",max:"number",step:"number"}]),{value:(t.val()||undefined),disabled:(t.attr("disabled")?true:undefined),rule:(t.attr("rule")?eval(t.attr("rule")):undefined)});
};
$.fn.slider.defaults={width:"auto",height:"auto",mode:"h",reversed:false,showTip:false,disabled:false,value:0,min:0,max:100,step:1,rule:[],tipFormatter:function(_44){
return _44;
},converter:{toPosition:function(_45,_46){
var _47=$(this).slider("options");
return (_45-_47.min)/(_47.max-_47.min)*_46;
},toValue:function(pos,_48){
var _49=$(this).slider("options");
return _49.min+(_49.max-_49.min)*(pos/_48);
}},onChange:function(_4a,_4b){
},onSlideStart:function(_4c){
},onSlideEnd:function(_4d){
},onComplete:function(_4e){
}};
})(jQuery);

