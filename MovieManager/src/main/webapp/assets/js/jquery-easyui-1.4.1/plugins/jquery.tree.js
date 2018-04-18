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
var _3=$(_2);
_3.addClass("tree");
return _3;
};
function _4(_5){
var _6=$.data(_5,"tree").options;
$(_5).unbind().bind("mouseover",function(e){
var tt=$(e.target);
var _7=tt.closest("div.tree-node");
if(!_7.length){
return;
}
_7.addClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.addClass("tree-expanded-hover");
}else{
tt.addClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("mouseout",function(e){
var tt=$(e.target);
var _8=tt.closest("div.tree-node");
if(!_8.length){
return;
}
_8.removeClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.removeClass("tree-expanded-hover");
}else{
tt.removeClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("click",function(e){
var tt=$(e.target);
var _9=tt.closest("div.tree-node");
if(!_9.length){
return;
}
if(tt.hasClass("tree-hit")){
_81(_5,_9[0]);
return false;
}else{
if(tt.hasClass("tree-checkbox")){
_34(_5,_9[0],!tt.hasClass("tree-checkbox1"));
return false;
}else{
_db(_5,_9[0]);
_6.onClick.call(_5,_c(_5,_9[0]));
}
}
e.stopPropagation();
}).bind("dblclick",function(e){
var _a=$(e.target).closest("div.tree-node");
if(!_a.length){
return;
}
_db(_5,_a[0]);
_6.onDblClick.call(_5,_c(_5,_a[0]));
e.stopPropagation();
}).bind("contextmenu",function(e){
var _b=$(e.target).closest("div.tree-node");
if(!_b.length){
return;
}
_6.onContextMenu.call(_5,e,_c(_5,_b[0]));
e.stopPropagation();
});
};
function _d(_e){
var _f=$.data(_e,"tree").options;
_f.dnd=false;
var _10=$(_e).find("div.tree-node");
_10.draggable("disable");
_10.css("cursor","pointer");
};
function _11(_12){
var _13=$.data(_12,"tree");
var _14=_13.options;
var _15=_13.tree;
_13.disabledNodes=[];
_14.dnd=true;
_15.find("div.tree-node").draggable({disabled:false,revert:true,cursor:"pointer",proxy:function(_16){
var p=$("<div class=\"tree-node-proxy\"></div>").appendTo("body");
p.html("<span class=\"tree-dnd-icon tree-dnd-no\">&nbsp;</span>"+$(_16).find(".tree-title").html());
p.hide();
return p;
},deltaX:15,deltaY:15,onBeforeDrag:function(e){
if(_14.onBeforeDrag.call(_12,_c(_12,this))==false){
return false;
}
if($(e.target).hasClass("tree-hit")||$(e.target).hasClass("tree-checkbox")){
return false;
}
if(e.which!=1){
return false;
}
$(this).next("ul").find("div.tree-node").droppable({accept:"no-accept"});
var _17=$(this).find("span.tree-indent");
if(_17.length){
e.data.offsetWidth-=_17.length*_17.width();
}
},onStartDrag:function(){
$(this).draggable("proxy").css({left:-10000,top:-10000});
_14.onStartDrag.call(_12,_c(_12,this));
var _18=_c(_12,this);
if(_18.id==undefined){
_18.id="easyui_tree_node_id_temp";
_56(_12,_18);
}
_13.draggingNodeId=_18.id;
},onDrag:function(e){
var x1=e.pageX,y1=e.pageY,x2=e.data.startX,y2=e.data.startY;
var d=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
if(d>3){
$(this).draggable("proxy").show();
}
this.pageY=e.pageY;
},onStopDrag:function(){
$(this).next("ul").find("div.tree-node").droppable({accept:"div.tree-node"});
for(var i=0;i<_13.disabledNodes.length;i++){
$(_13.disabledNodes[i]).droppable("enable");
}
_13.disabledNodes=[];
var _19=_ce(_12,_13.draggingNodeId);
if(_19&&_19.id=="easyui_tree_node_id_temp"){
_19.id="";
_56(_12,_19);
}
_14.onStopDrag.call(_12,_19);
}}).droppable({accept:"div.tree-node",onDragEnter:function(e,_1a){
if(_14.onDragEnter.call(_12,this,_1b(_1a))==false){
_1c(_1a,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_13.disabledNodes.push(this);
}
},onDragOver:function(e,_1d){
if($(this).droppable("options").disabled){
return;
}
var _1e=_1d.pageY;
var top=$(this).offset().top;
var _1f=top+$(this).outerHeight();
_1c(_1d,true);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
if(_1e>top+(_1f-top)/2){
if(_1f-_1e<5){
$(this).addClass("tree-node-bottom");
}else{
$(this).addClass("tree-node-append");
}
}else{
if(_1e-top<5){
$(this).addClass("tree-node-top");
}else{
$(this).addClass("tree-node-append");
}
}
if(_14.onDragOver.call(_12,this,_1b(_1d))==false){
_1c(_1d,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_13.disabledNodes.push(this);
}
},onDragLeave:function(e,_20){
_1c(_20,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
_14.onDragLeave.call(_12,this,_1b(_20));
},onDrop:function(e,_21){
var _22=this;
var _23,_24;
if($(this).hasClass("tree-node-append")){
_23=_25;
_24="append";
}else{
_23=_26;
_24=$(this).hasClass("tree-node-top")?"top":"bottom";
}
if(_14.onBeforeDrop.call(_12,_22,_1b(_21),_24)==false){
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
return;
}
_23(_21,_22,_24);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
}});
function _1b(_27,pop){
return $(_27).closest("ul.tree").tree(pop?"pop":"getData",_27);
};
function _1c(_28,_29){
var _2a=$(_28).draggable("proxy").find("span.tree-dnd-icon");
_2a.removeClass("tree-dnd-yes tree-dnd-no").addClass(_29?"tree-dnd-yes":"tree-dnd-no");
};
function _25(_2b,_2c){
if(_c(_12,_2c).state=="closed"){
_75(_12,_2c,function(){
_2d();
});
}else{
_2d();
}
function _2d(){
var _2e=_1b(_2b,true);
$(_12).tree("append",{parent:_2c,data:[_2e]});
_14.onDrop.call(_12,_2c,_2e,"append");
};
};
function _26(_2f,_30,_31){
var _32={};
if(_31=="top"){
_32.before=_30;
}else{
_32.after=_30;
}
var _33=_1b(_2f,true);
_32.data=_33;
$(_12).tree("insert",_32);
_14.onDrop.call(_12,_30,_33,_31);
};
};
function _34(_35,_36,_37){
var _38=$.data(_35,"tree").options;
if(!_38.checkbox){
return;
}
var _39=_c(_35,_36);
if(_38.onBeforeCheck.call(_35,_39,_37)==false){
return;
}
var _3a=$(_36);
var ck=_3a.find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_37){
ck.addClass("tree-checkbox1");
}else{
ck.addClass("tree-checkbox0");
}
if(_38.cascadeCheck){
_3b(_3a);
_3c(_3a);
}
_38.onCheck.call(_35,_39,_37);
function _3c(_3d){
var _3e=_3d.next().find(".tree-checkbox");
_3e.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_3d.find(".tree-checkbox").hasClass("tree-checkbox1")){
_3e.addClass("tree-checkbox1");
}else{
_3e.addClass("tree-checkbox0");
}
};
function _3b(_3f){
var _40=_8c(_35,_3f[0]);
if(_40){
var ck=$(_40.target).find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_41(_3f)){
ck.addClass("tree-checkbox1");
}else{
if(_42(_3f)){
ck.addClass("tree-checkbox0");
}else{
ck.addClass("tree-checkbox2");
}
}
_3b($(_40.target));
}
function _41(n){
var ck=n.find(".tree-checkbox");
if(ck.hasClass("tree-checkbox0")||ck.hasClass("tree-checkbox2")){
return false;
}
var b=true;
n.parent().siblings().each(function(){
if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")){
b=false;
}
});
return b;
};
function _42(n){
var ck=n.find(".tree-checkbox");
if(ck.hasClass("tree-checkbox1")||ck.hasClass("tree-checkbox2")){
return false;
}
var b=true;
n.parent().siblings().each(function(){
if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")){
b=false;
}
});
return b;
};
};
};
function _43(_44,_45){
var _46=$.data(_44,"tree").options;
if(!_46.checkbox){
return;
}
var _47=$(_45);
if(_48(_44,_45)){
var ck=_47.find(".tree-checkbox");
if(ck.length){
if(ck.hasClass("tree-checkbox1")){
_34(_44,_45,true);
}else{
_34(_44,_45,false);
}
}else{
if(_46.onlyLeafCheck){
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(_47.find(".tree-title"));
}
}
}else{
var ck=_47.find(".tree-checkbox");
if(_46.onlyLeafCheck){
ck.remove();
}else{
if(ck.hasClass("tree-checkbox1")){
_34(_44,_45,true);
}else{
if(ck.hasClass("tree-checkbox2")){
var _49=true;
var _4a=true;
var _4b=_4c(_44,_45);
for(var i=0;i<_4b.length;i++){
if(_4b[i].checked){
_4a=false;
}else{
_49=false;
}
}
if(_49){
_34(_44,_45,true);
}
if(_4a){
_34(_44,_45,false);
}
}
}
}
}
};
function _4d(_4e,ul,_4f,_50){
var _51=$.data(_4e,"tree");
var _52=_51.options;
var _53=$(ul).prevAll("div.tree-node:first");
_4f=_52.loadFilter.call(_4e,_4f,_53[0]);
var _54=_55(_4e,"domId",_53.attr("id"));
if(!_50){
_54?_54.children=_4f:_51.data=_4f;
$(ul).empty();
}else{
if(_54){
_54.children?_54.children=_54.children.concat(_4f):_54.children=_4f;
}else{
_51.data=_51.data.concat(_4f);
}
}
_52.view.render.call(_52.view,_4e,ul,_4f);
if(_52.dnd){
_11(_4e);
}
if(_54){
_56(_4e,_54);
}
var _57=[];
var _58=[];
for(var i=0;i<_4f.length;i++){
var _59=_4f[i];
if(!_59.checked){
_57.push(_59);
}
}
_5a(_4f,function(_5b){
if(_5b.checked){
_58.push(_5b);
}
});
var _5c=_52.onCheck;
_52.onCheck=function(){
};
if(_57.length){
_34(_4e,$("#"+_57[0].domId)[0],false);
}
for(var i=0;i<_58.length;i++){
_34(_4e,$("#"+_58[i].domId)[0],true);
}
_52.onCheck=_5c;
setTimeout(function(){
_5d(_4e,_4e);
},0);
_52.onLoadSuccess.call(_4e,_54,_4f);
};
function _5d(_5e,ul,_5f){
var _60=$.data(_5e,"tree").options;
if(_60.lines){
$(_5e).addClass("tree-lines");
}else{
$(_5e).removeClass("tree-lines");
return;
}
if(!_5f){
_5f=true;
$(_5e).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
$(_5e).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
var _61=$(_5e).tree("getRoots");
if(_61.length>1){
$(_61[0].target).addClass("tree-root-first");
}else{
if(_61.length==1){
$(_61[0].target).addClass("tree-root-one");
}
}
}
$(ul).children("li").each(function(){
var _62=$(this).children("div.tree-node");
var ul=_62.next("ul");
if(ul.length){
if($(this).next().length){
_63(_62);
}
_5d(_5e,ul,_5f);
}else{
_64(_62);
}
});
var _65=$(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
_65.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
function _64(_66,_67){
var _68=_66.find("span.tree-icon");
_68.prev("span.tree-indent").addClass("tree-join");
};
function _63(_69){
var _6a=_69.find("span.tree-indent, span.tree-hit").length;
_69.next().find("div.tree-node").each(function(){
$(this).children("span:eq("+(_6a-1)+")").addClass("tree-line");
});
};
};
function _6b(_6c,ul,_6d,_6e){
var _6f=$.data(_6c,"tree").options;
_6d=$.extend({},_6f.queryParams,_6d||{});
var _70=null;
if(_6c!=ul){
var _71=$(ul).prev();
_70=_c(_6c,_71[0]);
}
if(_6f.onBeforeLoad.call(_6c,_70,_6d)==false){
return;
}
var _72=$(ul).prev().children("span.tree-folder");
_72.addClass("tree-loading");
var _73=_6f.loader.call(_6c,_6d,function(_74){
_72.removeClass("tree-loading");
_4d(_6c,ul,_74);
if(_6e){
_6e();
}
},function(){
_72.removeClass("tree-loading");
_6f.onLoadError.apply(_6c,arguments);
if(_6e){
_6e();
}
});
if(_73==false){
_72.removeClass("tree-loading");
}
};
function _75(_76,_77,_78){
var _79=$.data(_76,"tree").options;
var hit=$(_77).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
var _7a=_c(_76,_77);
if(_79.onBeforeExpand.call(_76,_7a)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var ul=$(_77).next();
if(ul.length){
if(_79.animate){
ul.slideDown("normal",function(){
_7a.state="open";
_79.onExpand.call(_76,_7a);
if(_78){
_78();
}
});
}else{
ul.css("display","block");
_7a.state="open";
_79.onExpand.call(_76,_7a);
if(_78){
_78();
}
}
}else{
var _7b=$("<ul style=\"display:none\"></ul>").insertAfter(_77);
_6b(_76,_7b[0],{id:_7a.id},function(){
if(_7b.is(":empty")){
_7b.remove();
}
if(_79.animate){
_7b.slideDown("normal",function(){
_7a.state="open";
_79.onExpand.call(_76,_7a);
if(_78){
_78();
}
});
}else{
_7b.css("display","block");
_7a.state="open";
_79.onExpand.call(_76,_7a);
if(_78){
_78();
}
}
});
}
};
function _7c(_7d,_7e){
var _7f=$.data(_7d,"tree").options;
var hit=$(_7e).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
var _80=_c(_7d,_7e);
if(_7f.onBeforeCollapse.call(_7d,_80)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
var ul=$(_7e).next();
if(_7f.animate){
ul.slideUp("normal",function(){
_80.state="closed";
_7f.onCollapse.call(_7d,_80);
});
}else{
ul.css("display","none");
_80.state="closed";
_7f.onCollapse.call(_7d,_80);
}
};
function _81(_82,_83){
var hit=$(_83).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
_7c(_82,_83);
}else{
_75(_82,_83);
}
};
function _84(_85,_86){
var _87=_4c(_85,_86);
if(_86){
_87.unshift(_c(_85,_86));
}
for(var i=0;i<_87.length;i++){
_75(_85,_87[i].target);
}
};
function _88(_89,_8a){
var _8b=[];
var p=_8c(_89,_8a);
while(p){
_8b.unshift(p);
p=_8c(_89,p.target);
}
for(var i=0;i<_8b.length;i++){
_75(_89,_8b[i].target);
}
};
function _8d(_8e,_8f){
var c=$(_8e).parent();
while(c[0].tagName!="BODY"&&c.css("overflow-y")!="auto"){
c=c.parent();
}
var n=$(_8f);
var _90=n.offset().top;
if(c[0].tagName!="BODY"){
var _91=c.offset().top;
if(_90<_91){
c.scrollTop(c.scrollTop()+_90-_91);
}else{
if(_90+n.outerHeight()>_91+c.outerHeight()-18){
c.scrollTop(c.scrollTop()+_90+n.outerHeight()-_91-c.outerHeight()+18);
}
}
}else{
c.scrollTop(_90);
}
};
function _92(_93,_94){
var _95=_4c(_93,_94);
if(_94){
_95.unshift(_c(_93,_94));
}
for(var i=0;i<_95.length;i++){
_7c(_93,_95[i].target);
}
};
function _96(_97,_98){
var _99=$(_98.parent);
var _9a=_98.data;
if(!_9a){
return;
}
_9a=$.isArray(_9a)?_9a:[_9a];
if(!_9a.length){
return;
}
var ul;
if(_99.length==0){
ul=$(_97);
}else{
if(_48(_97,_99[0])){
var _9b=_99.find("span.tree-icon");
_9b.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_9b);
if(hit.prev().length){
hit.prev().remove();
}
}
ul=_99.next();
if(!ul.length){
ul=$("<ul></ul>").insertAfter(_99);
}
}
_4d(_97,ul[0],_9a,true);
_43(_97,ul.prev());
};
function _9c(_9d,_9e){
var ref=_9e.before||_9e.after;
var _9f=_8c(_9d,ref);
var _a0=_9e.data;
if(!_a0){
return;
}
_a0=$.isArray(_a0)?_a0:[_a0];
if(!_a0.length){
return;
}
_96(_9d,{parent:(_9f?_9f.target:null),data:_a0});
var _a1=_9f?_9f.children:$(_9d).tree("getRoots");
for(var i=0;i<_a1.length;i++){
if(_a1[i].domId==$(ref).attr("id")){
for(var j=_a0.length-1;j>=0;j--){
_a1.splice((_9e.before?i:(i+1)),0,_a0[j]);
}
_a1.splice(_a1.length-_a0.length,_a0.length);
break;
}
}
var li=$();
for(var i=0;i<_a0.length;i++){
li=li.add($("#"+_a0[i].domId).parent());
}
if(_9e.before){
li.insertBefore($(ref).parent());
}else{
li.insertAfter($(ref).parent());
}
};
function _a2(_a3,_a4){
var _a5=del(_a4);
$(_a4).parent().remove();
if(_a5){
if(!_a5.children||!_a5.children.length){
var _a6=$(_a5.target);
_a6.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_a6.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_a6);
_a6.next().remove();
}
_56(_a3,_a5);
_43(_a3,_a5.target);
}
_5d(_a3,_a3);
function del(_a7){
var id=$(_a7).attr("id");
var _a8=_8c(_a3,_a7);
var cc=_a8?_a8.children:$.data(_a3,"tree").data;
for(var i=0;i<cc.length;i++){
if(cc[i].domId==id){
cc.splice(i,1);
break;
}
}
return _a8;
};
};
function _56(_a9,_aa){
var _ab=$.data(_a9,"tree").options;
var _ac=$(_aa.target);
var _ad=_c(_a9,_aa.target);
var _ae=_ad.checked;
if(_ad.iconCls){
_ac.find(".tree-icon").removeClass(_ad.iconCls);
}
$.extend(_ad,_aa);
_ac.find(".tree-title").html(_ab.formatter.call(_a9,_ad));
if(_ad.iconCls){
_ac.find(".tree-icon").addClass(_ad.iconCls);
}
if(_ae!=_ad.checked){
_34(_a9,_aa.target,_ad.checked);
}
};
function _af(_b0,_b1){
if(_b1){
var p=_8c(_b0,_b1);
while(p){
_b1=p.target;
p=_8c(_b0,_b1);
}
return _c(_b0,_b1);
}else{
var _b2=_b3(_b0);
return _b2.length?_b2[0]:null;
}
};
function _b3(_b4){
var _b5=$.data(_b4,"tree").data;
for(var i=0;i<_b5.length;i++){
_b6(_b5[i]);
}
return _b5;
};
function _4c(_b7,_b8){
var _b9=[];
var n=_c(_b7,_b8);
var _ba=n?(n.children||[]):$.data(_b7,"tree").data;
_5a(_ba,function(_bb){
_b9.push(_b6(_bb));
});
return _b9;
};
function _8c(_bc,_bd){
var p=$(_bd).closest("ul").prevAll("div.tree-node:first");
return _c(_bc,p[0]);
};
function _be(_bf,_c0){
_c0=_c0||"checked";
if(!$.isArray(_c0)){
_c0=[_c0];
}
var _c1=[];
for(var i=0;i<_c0.length;i++){
var s=_c0[i];
if(s=="checked"){
_c1.push("span.tree-checkbox1");
}else{
if(s=="unchecked"){
_c1.push("span.tree-checkbox0");
}else{
if(s=="indeterminate"){
_c1.push("span.tree-checkbox2");
}
}
}
}
var _c2=[];
$(_bf).find(_c1.join(",")).each(function(){
var _c3=$(this).parent();
_c2.push(_c(_bf,_c3[0]));
});
return _c2;
};
function _c4(_c5){
var _c6=$(_c5).find("div.tree-node-selected");
return _c6.length?_c(_c5,_c6[0]):null;
};
function _c7(_c8,_c9){
var _ca=_c(_c8,_c9);
if(_ca&&_ca.children){
_5a(_ca.children,function(_cb){
_b6(_cb);
});
}
return _ca;
};
function _c(_cc,_cd){
return _55(_cc,"domId",$(_cd).attr("id"));
};
function _ce(_cf,id){
return _55(_cf,"id",id);
};
function _55(_d0,_d1,_d2){
var _d3=$.data(_d0,"tree").data;
var _d4=null;
_5a(_d3,function(_d5){
if(_d5[_d1]==_d2){
_d4=_b6(_d5);
return false;
}
});
return _d4;
};
function _b6(_d6){
var d=$("#"+_d6.domId);
_d6.target=d[0];
_d6.checked=d.find(".tree-checkbox").hasClass("tree-checkbox1");
return _d6;
};
function _5a(_d7,_d8){
var _d9=[];
for(var i=0;i<_d7.length;i++){
_d9.push(_d7[i]);
}
while(_d9.length){
var _da=_d9.shift();
if(_d8(_da)==false){
return;
}
if(_da.children){
for(var i=_da.children.length-1;i>=0;i--){
_d9.unshift(_da.children[i]);
}
}
}
};
function _db(_dc,_dd){
var _de=$.data(_dc,"tree").options;
var _df=_c(_dc,_dd);
if(_de.onBeforeSelect.call(_dc,_df)==false){
return;
}
$(_dc).find("div.tree-node-selected").removeClass("tree-node-selected");
$(_dd).addClass("tree-node-selected");
_de.onSelect.call(_dc,_df);
};
function _48(_e0,_e1){
return $(_e1).children("span.tree-hit").length==0;
};
function _e2(_e3,_e4){
var _e5=$.data(_e3,"tree").options;
var _e6=_c(_e3,_e4);
if(_e5.onBeforeEdit.call(_e3,_e6)==false){
return;
}
$(_e4).css("position","relative");
var nt=$(_e4).find(".tree-title");
var _e7=nt.outerWidth();
nt.empty();
var _e8=$("<input class=\"tree-editor\">").appendTo(nt);
_e8.val(_e6.text).focus();
_e8.width(_e7+20);
_e8.height(document.compatMode=="CSS1Compat"?(18-(_e8.outerHeight()-_e8.height())):18);
_e8.bind("click",function(e){
return false;
}).bind("mousedown",function(e){
e.stopPropagation();
}).bind("mousemove",function(e){
e.stopPropagation();
}).bind("keydown",function(e){
if(e.keyCode==13){
_e9(_e3,_e4);
return false;
}else{
if(e.keyCode==27){
_ef(_e3,_e4);
return false;
}
}
}).bind("blur",function(e){
e.stopPropagation();
_e9(_e3,_e4);
});
};
function _e9(_ea,_eb){
var _ec=$.data(_ea,"tree").options;
$(_eb).css("position","");
var _ed=$(_eb).find("input.tree-editor");
var val=_ed.val();
_ed.remove();
var _ee=_c(_ea,_eb);
_ee.text=val;
_56(_ea,_ee);
_ec.onAfterEdit.call(_ea,_ee);
};
function _ef(_f0,_f1){
var _f2=$.data(_f0,"tree").options;
$(_f1).css("position","");
$(_f1).find("input.tree-editor").remove();
var _f3=_c(_f0,_f1);
_56(_f0,_f3);
_f2.onCancelEdit.call(_f0,_f3);
};
$.fn.tree=function(_f4,_f5){
if(typeof _f4=="string"){
return $.fn.tree.methods[_f4](this,_f5);
}
var _f4=_f4||{};
return this.each(function(){
var _f6=$.data(this,"tree");
var _f7;
if(_f6){
_f7=$.extend(_f6.options,_f4);
_f6.options=_f7;
}else{
_f7=$.extend({},$.fn.tree.defaults,$.fn.tree.parseOptions(this),_f4);
$.data(this,"tree",{options:_f7,tree:_1(this),data:[]});
var _f8=$.fn.tree.parseData(this);
if(_f8.length){
_4d(this,this,_f8);
}
}
_4(this);
if(_f7.data){
_4d(this,this,$.extend(true,[],_f7.data));
}
_6b(this,this);
});
};
$.fn.tree.methods={options:function(jq){
return $.data(jq[0],"tree").options;
},loadData:function(jq,_f9){
return jq.each(function(){
_4d(this,this,_f9);
});
},getNode:function(jq,_fa){
return _c(jq[0],_fa);
},getData:function(jq,_fb){
return _c7(jq[0],_fb);
},reload:function(jq,_fc){
return jq.each(function(){
if(_fc){
var _fd=$(_fc);
var hit=_fd.children("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_fd.next().remove();
_75(this,_fc);
}else{
$(this).empty();
_6b(this,this);
}
});
},getRoot:function(jq,_fe){
return _af(jq[0],_fe);
},getRoots:function(jq){
return _b3(jq[0]);
},getParent:function(jq,_ff){
return _8c(jq[0],_ff);
},getChildren:function(jq,_100){
return _4c(jq[0],_100);
},getChecked:function(jq,_101){
return _be(jq[0],_101);
},getSelected:function(jq){
return _c4(jq[0]);
},isLeaf:function(jq,_102){
return _48(jq[0],_102);
},find:function(jq,id){
return _ce(jq[0],id);
},select:function(jq,_103){
return jq.each(function(){
_db(this,_103);
});
},check:function(jq,_104){
return jq.each(function(){
_34(this,_104,true);
});
},uncheck:function(jq,_105){
return jq.each(function(){
_34(this,_105,false);
});
},collapse:function(jq,_106){
return jq.each(function(){
_7c(this,_106);
});
},expand:function(jq,_107){
return jq.each(function(){
_75(this,_107);
});
},collapseAll:function(jq,_108){
return jq.each(function(){
_92(this,_108);
});
},expandAll:function(jq,_109){
return jq.each(function(){
_84(this,_109);
});
},expandTo:function(jq,_10a){
return jq.each(function(){
_88(this,_10a);
});
},scrollTo:function(jq,_10b){
return jq.each(function(){
_8d(this,_10b);
});
},toggle:function(jq,_10c){
return jq.each(function(){
_81(this,_10c);
});
},append:function(jq,_10d){
return jq.each(function(){
_96(this,_10d);
});
},insert:function(jq,_10e){
return jq.each(function(){
_9c(this,_10e);
});
},remove:function(jq,_10f){
return jq.each(function(){
_a2(this,_10f);
});
},pop:function(jq,_110){
var node=jq.tree("getData",_110);
jq.tree("remove",_110);
return node;
},update:function(jq,_111){
return jq.each(function(){
_56(this,_111);
});
},enableDnd:function(jq){
return jq.each(function(){
_11(this);
});
},disableDnd:function(jq){
return jq.each(function(){
_d(this);
});
},beginEdit:function(jq,_112){
return jq.each(function(){
_e2(this,_112);
});
},endEdit:function(jq,_113){
return jq.each(function(){
_e9(this,_113);
});
},cancelEdit:function(jq,_114){
return jq.each(function(){
_ef(this,_114);
});
}};
$.fn.tree.parseOptions=function(_115){
var t=$(_115);
return $.extend({},$.parser.parseOptions(_115,["url","method",{checkbox:"boolean",cascadeCheck:"boolean",onlyLeafCheck:"boolean"},{animate:"boolean",lines:"boolean",dnd:"boolean"}]));
};
$.fn.tree.parseData=function(_116){
var data=[];
_117(data,$(_116));
return data;
function _117(aa,tree){
tree.children("li").each(function(){
var node=$(this);
var item=$.extend({},$.parser.parseOptions(this,["id","iconCls","state"]),{checked:(node.attr("checked")?true:undefined)});
item.text=node.children("span").html();
if(!item.text){
item.text=node.html();
}
var _118=node.children("ul");
if(_118.length){
item.children=[];
_117(item.children,_118);
}
aa.push(item);
});
};
};
var _119=1;
var _11a={render:function(_11b,ul,data){
var opts=$.data(_11b,"tree").options;
var _11c=$(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
var cc=_11d(_11c,data);
$(ul).append(cc.join(""));
function _11d(_11e,_11f){
var cc=[];
for(var i=0;i<_11f.length;i++){
var item=_11f[i];
if(item.state!="open"&&item.state!="closed"){
item.state="open";
}
item.domId="_easyui_tree_"+_119++;
cc.push("<li>");
cc.push("<div id=\""+item.domId+"\" class=\"tree-node\">");
for(var j=0;j<_11e;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
var _120=false;
if(item.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(item.iconCls?item.iconCls:"")+"\"></span>");
}else{
if(item.children&&item.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(item.iconCls?item.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(item.iconCls?item.iconCls:"")+"\"></span>");
_120=true;
}
}
if(opts.checkbox){
if((!opts.onlyLeafCheck)||_120){
cc.push("<span class=\"tree-checkbox tree-checkbox0\"></span>");
}
}
cc.push("<span class=\"tree-title\">"+opts.formatter.call(_11b,item)+"</span>");
cc.push("</div>");
if(item.children&&item.children.length){
var tmp=_11d(_11e+1,item.children);
cc.push("<ul style=\"display:"+(item.state=="closed"?"none":"block")+"\">");
cc=cc.concat(tmp);
cc.push("</ul>");
}
cc.push("</li>");
}
return cc;
};
}};
$.fn.tree.defaults={url:null,method:"post",animate:false,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,lines:false,dnd:false,data:null,queryParams:{},formatter:function(node){
return node.text;
},loader:function(_121,_122,_123){
var opts=$(this).tree("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_121,dataType:"json",success:function(data){
_122(data);
},error:function(){
_123.apply(this,arguments);
}});
},loadFilter:function(data,_124){
return data;
},view:_11a,onBeforeLoad:function(node,_125){
},onLoadSuccess:function(node,data){
},onLoadError:function(){
},onClick:function(node){
},onDblClick:function(node){
},onBeforeExpand:function(node){
},onExpand:function(node){
},onBeforeCollapse:function(node){
},onCollapse:function(node){
},onBeforeCheck:function(node,_126){
},onCheck:function(node,_127){
},onBeforeSelect:function(node){
},onSelect:function(node){
},onContextMenu:function(e,node){
},onBeforeDrag:function(node){
},onStartDrag:function(node){
},onStopDrag:function(node){
},onDragEnter:function(_128,_129){
},onDragOver:function(_12a,_12b){
},onDragLeave:function(_12c,_12d){
},onBeforeDrop:function(_12e,_12f,_130){
},onDrop:function(_131,_132,_133){
},onBeforeEdit:function(node){
},onAfterEdit:function(node){
},onCancelEdit:function(node){
}};
})(jQuery);

