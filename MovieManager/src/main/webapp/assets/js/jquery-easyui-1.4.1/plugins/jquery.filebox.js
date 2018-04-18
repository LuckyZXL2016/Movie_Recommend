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
var _1=0;
function _2(_3){
var _4=$.data(_3,"filebox");
var _5=_4.options;
var id="filebox_file_id_"+(++_1);
$(_3).addClass("filebox-f").textbox($.extend({},_5,{buttonText:_5.buttonText?("<label for=\""+id+"\">"+_5.buttonText+"</label>"):""}));
$(_3).textbox("textbox").attr("readonly","readonly");
_4.filebox=$(_3).next().addClass("filebox");
_4.filebox.find(".textbox-value").remove();
_5.oldValue="";
var _6=$("<input type=\"file\" class=\"textbox-value\">").appendTo(_4.filebox);
_6.attr("id",id).attr("name",$(_3).attr("textboxName")||"");
_6.change(function(){
$(_3).filebox("setText",this.value);
_5.onChange.call(_3,this.value,_5.oldValue);
_5.oldValue=this.value;
});
var _7=$(_3).filebox("button");
if(_7.length){
if(_7.linkbutton("options").disabled){
_6.attr("disabled","disabled");
}else{
_6.removeAttr("disabled");
}
}
};
$.fn.filebox=function(_8,_9){
if(typeof _8=="string"){
var _a=$.fn.filebox.methods[_8];
if(_a){
return _a(this,_9);
}else{
return this.textbox(_8,_9);
}
}
_8=_8||{};
return this.each(function(){
var _b=$.data(this,"filebox");
if(_b){
$.extend(_b.options,_8);
}else{
$.data(this,"filebox",{options:$.extend({},$.fn.filebox.defaults,$.fn.filebox.parseOptions(this),_8)});
}
_2(this);
});
};
$.fn.filebox.methods={options:function(jq){
var _c=jq.textbox("options");
return $.extend($.data(jq[0],"filebox").options,{width:_c.width,value:_c.value,originalValue:_c.originalValue,disabled:_c.disabled,readonly:_c.readonly});
}};
$.fn.filebox.parseOptions=function(_d){
return $.extend({},$.fn.textbox.parseOptions(_d),{});
};
$.fn.filebox.defaults=$.extend({},$.fn.textbox.defaults,{buttonIcon:null,buttonText:"Choose File",buttonAlign:"right",inputEvents:{}});
})(jQuery);

