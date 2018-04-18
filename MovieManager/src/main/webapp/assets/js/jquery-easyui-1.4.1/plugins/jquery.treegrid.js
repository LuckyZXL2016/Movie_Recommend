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
var _3=$.data(_2,"treegrid");
var _4=_3.options;
$(_2).datagrid($.extend({},_4,{url:null,data:null,loader:function(){
return false;
},onBeforeLoad:function(){
return false;
},onLoadSuccess:function(){
},onResizeColumn:function(_5,_6){
_26(_2);
_4.onResizeColumn.call(_2,_5,_6);
},onBeforeSortColumn:function(_7,_8){
if(_4.onBeforeSortColumn.call(_2,_7,_8)==false){
return false;
}
},onSortColumn:function(_9,_a){
_4.sortName=_9;
_4.sortOrder=_a;
if(_4.remoteSort){
_25(_2);
}else{
var _b=$(_2).treegrid("getData");
_3f(_2,0,_b);
}
_4.onSortColumn.call(_2,_9,_a);
},onBeforeEdit:function(_c,_d){
if(_4.onBeforeEdit.call(_2,_d)==false){
return false;
}
},onAfterEdit:function(_e,_f,_10){
_4.onAfterEdit.call(_2,_f,_10);
},onCancelEdit:function(_11,row){
_4.onCancelEdit.call(_2,row);
},onBeforeSelect:function(_12){
if(_4.onBeforeSelect.call(_2,_47(_2,_12))==false){
return false;
}
},onSelect:function(_13){
_4.onSelect.call(_2,_47(_2,_13));
},onBeforeUnselect:function(_14){
if(_4.onBeforeUnselect.call(_2,_47(_2,_14))==false){
return false;
}
},onUnselect:function(_15){
_4.onUnselect.call(_2,_47(_2,_15));
},onBeforeCheck:function(_16){
if(_4.onBeforeCheck.call(_2,_47(_2,_16))==false){
return false;
}
},onCheck:function(_17){
_4.onCheck.call(_2,_47(_2,_17));
},onBeforeUncheck:function(_18){
if(_4.onBeforeUncheck.call(_2,_47(_2,_18))==false){
return false;
}
},onUncheck:function(_19){
_4.onUncheck.call(_2,_47(_2,_19));
},onClickRow:function(_1a){
_4.onClickRow.call(_2,_47(_2,_1a));
},onDblClickRow:function(_1b){
_4.onDblClickRow.call(_2,_47(_2,_1b));
},onClickCell:function(_1c,_1d){
_4.onClickCell.call(_2,_1d,_47(_2,_1c));
},onDblClickCell:function(_1e,_1f){
_4.onDblClickCell.call(_2,_1f,_47(_2,_1e));
},onRowContextMenu:function(e,_20){
_4.onContextMenu.call(_2,e,_47(_2,_20));
}}));
if(!_4.columns){
var _21=$.data(_2,"datagrid").options;
_4.columns=_21.columns;
_4.frozenColumns=_21.frozenColumns;
}
_3.dc=$.data(_2,"datagrid").dc;
if(_4.pagination){
var _22=$(_2).datagrid("getPager");
_22.pagination({pageNumber:_4.pageNumber,pageSize:_4.pageSize,pageList:_4.pageList,onSelectPage:function(_23,_24){
_4.pageNumber=_23;
_4.pageSize=_24;
_25(_2);
}});
_4.pageSize=_22.pagination("options").pageSize;
}
};
function _26(_27,_28){
var _29=$.data(_27,"datagrid").options;
var dc=$.data(_27,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!_29.nowrap||_29.autoRowHeight)){
if(_28!=undefined){
var _2a=_2b(_27,_28);
for(var i=0;i<_2a.length;i++){
_2c(_2a[i][_29.idField]);
}
}
}
$(_27).datagrid("fixRowHeight",_28);
function _2c(_2d){
var tr1=_29.finder.getTr(_27,_2d,"body",1);
var tr2=_29.finder.getTr(_27,_2d,"body",2);
tr1.css("height","");
tr2.css("height","");
var _2e=Math.max(tr1.height(),tr2.height());
tr1.css("height",_2e);
tr2.css("height",_2e);
};
};
function _2f(_30){
var dc=$.data(_30,"datagrid").dc;
var _31=$.data(_30,"treegrid").options;
if(!_31.rownumbers){
return;
}
dc.body1.find("div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
};
function _32(_33){
return function(e){
$.fn.datagrid.defaults.rowEvents[_33?"mouseover":"mouseout"](e);
var tt=$(e.target);
var fn=_33?"addClass":"removeClass";
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt[fn]("tree-expanded-hover"):tt[fn]("tree-collapsed-hover");
}
};
};
function _34(e){
var tt=$(e.target);
if(tt.hasClass("tree-hit")){
var tr=tt.closest("tr.datagrid-row");
var _35=tr.closest("div.datagrid-view").children(".datagrid-f")[0];
_36(_35,tr.attr("node-id"));
}else{
$.fn.datagrid.defaults.rowEvents.click(e);
}
};
function _37(_38,_39){
var _3a=$.data(_38,"treegrid").options;
var tr1=_3a.finder.getTr(_38,_39,"body",1);
var tr2=_3a.finder.getTr(_38,_39,"body",2);
var _3b=$(_38).datagrid("getColumnFields",true).length+(_3a.rownumbers?1:0);
var _3c=$(_38).datagrid("getColumnFields",false).length;
_3d(tr1,_3b);
_3d(tr2,_3c);
function _3d(tr,_3e){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_3e+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
};
function _3f(_40,_41,_42,_43){
var _44=$.data(_40,"treegrid");
var _45=_44.options;
var dc=_44.dc;
_42=_45.loadFilter.call(_40,_42,_41);
var _46=_47(_40,_41);
if(_46){
var _48=_45.finder.getTr(_40,_41,"body",1);
var _49=_45.finder.getTr(_40,_41,"body",2);
var cc1=_48.next("tr.treegrid-tr-tree").children("td").children("div");
var cc2=_49.next("tr.treegrid-tr-tree").children("td").children("div");
if(!_43){
_46.children=[];
}
}else{
var cc1=dc.body1;
var cc2=dc.body2;
if(!_43){
_44.data=[];
}
}
if(!_43){
cc1.empty();
cc2.empty();
}
if(_45.view.onBeforeRender){
_45.view.onBeforeRender.call(_45.view,_40,_41,_42);
}
_45.view.render.call(_45.view,_40,cc1,true);
_45.view.render.call(_45.view,_40,cc2,false);
if(_45.showFooter){
_45.view.renderFooter.call(_45.view,_40,dc.footer1,true);
_45.view.renderFooter.call(_45.view,_40,dc.footer2,false);
}
if(_45.view.onAfterRender){
_45.view.onAfterRender.call(_45.view,_40);
}
if(!_41&&_45.pagination){
var _4a=$.data(_40,"treegrid").total;
var _4b=$(_40).datagrid("getPager");
if(_4b.pagination("options").total!=_4a){
_4b.pagination({total:_4a});
}
}
_26(_40);
_2f(_40);
$(_40).treegrid("showLines");
$(_40).treegrid("setSelectionState");
$(_40).treegrid("autoSizeColumn");
_45.onLoadSuccess.call(_40,_46,_42);
};
function _25(_4c,_4d,_4e,_4f,_50){
var _51=$.data(_4c,"treegrid").options;
var _52=$(_4c).datagrid("getPanel").find("div.datagrid-body");
if(_4e){
_51.queryParams=_4e;
}
var _53=$.extend({},_51.queryParams);
if(_51.pagination){
$.extend(_53,{page:_51.pageNumber,rows:_51.pageSize});
}
if(_51.sortName){
$.extend(_53,{sort:_51.sortName,order:_51.sortOrder});
}
var row=_47(_4c,_4d);
if(_51.onBeforeLoad.call(_4c,row,_53)==false){
return;
}
var _54=_52.find("tr[node-id=\""+_4d+"\"] span.tree-folder");
_54.addClass("tree-loading");
$(_4c).treegrid("loading");
var _55=_51.loader.call(_4c,_53,function(_56){
_54.removeClass("tree-loading");
$(_4c).treegrid("loaded");
_3f(_4c,_4d,_56,_4f);
if(_50){
_50();
}
},function(){
_54.removeClass("tree-loading");
$(_4c).treegrid("loaded");
_51.onLoadError.apply(_4c,arguments);
if(_50){
_50();
}
});
if(_55==false){
_54.removeClass("tree-loading");
$(_4c).treegrid("loaded");
}
};
function _57(_58){
var _59=_5a(_58);
if(_59.length){
return _59[0];
}else{
return null;
}
};
function _5a(_5b){
return $.data(_5b,"treegrid").data;
};
function _5c(_5d,_5e){
var row=_47(_5d,_5e);
if(row._parentId){
return _47(_5d,row._parentId);
}else{
return null;
}
};
function _2b(_5f,_60){
var _61=$.data(_5f,"treegrid").options;
var _62=$(_5f).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
var _63=[];
if(_60){
_64(_60);
}else{
var _65=_5a(_5f);
for(var i=0;i<_65.length;i++){
_63.push(_65[i]);
_64(_65[i][_61.idField]);
}
}
function _64(_66){
var _67=_47(_5f,_66);
if(_67&&_67.children){
for(var i=0,len=_67.children.length;i<len;i++){
var _68=_67.children[i];
_63.push(_68);
_64(_68[_61.idField]);
}
}
};
return _63;
};
function _69(_6a,_6b){
if(!_6b){
return 0;
}
var _6c=$.data(_6a,"treegrid").options;
var _6d=$(_6a).datagrid("getPanel").children("div.datagrid-view");
var _6e=_6d.find("div.datagrid-body tr[node-id=\""+_6b+"\"]").children("td[field=\""+_6c.treeField+"\"]");
return _6e.find("span.tree-indent,span.tree-hit").length;
};
function _47(_6f,_70){
var _71=$.data(_6f,"treegrid").options;
var _72=$.data(_6f,"treegrid").data;
var cc=[_72];
while(cc.length){
var c=cc.shift();
for(var i=0;i<c.length;i++){
var _73=c[i];
if(_73[_71.idField]==_70){
return _73;
}else{
if(_73["children"]){
cc.push(_73["children"]);
}
}
}
}
return null;
};
function _74(_75,_76){
var _77=$.data(_75,"treegrid").options;
var row=_47(_75,_76);
var tr=_77.finder.getTr(_75,_76);
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(_77.onBeforeCollapse.call(_75,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(_77.animate){
cc.slideUp("normal",function(){
$(_75).treegrid("autoSizeColumn");
_26(_75,_76);
_77.onCollapse.call(_75,row);
});
}else{
cc.hide();
$(_75).treegrid("autoSizeColumn");
_26(_75,_76);
_77.onCollapse.call(_75,row);
}
};
function _78(_79,_7a){
var _7b=$.data(_79,"treegrid").options;
var tr=_7b.finder.getTr(_79,_7a);
var hit=tr.find("span.tree-hit");
var row=_47(_79,_7a);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(_7b.onBeforeExpand.call(_79,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _7c=tr.next("tr.treegrid-tr-tree");
if(_7c.length){
var cc=_7c.children("td").children("div");
_7d(cc);
}else{
_37(_79,row[_7b.idField]);
var _7c=tr.next("tr.treegrid-tr-tree");
var cc=_7c.children("td").children("div");
cc.hide();
var _7e=$.extend({},_7b.queryParams||{});
_7e.id=row[_7b.idField];
_25(_79,row[_7b.idField],_7e,true,function(){
if(cc.is(":empty")){
_7c.remove();
}else{
_7d(cc);
}
});
}
function _7d(cc){
row.state="open";
if(_7b.animate){
cc.slideDown("normal",function(){
$(_79).treegrid("autoSizeColumn");
_26(_79,_7a);
_7b.onExpand.call(_79,row);
});
}else{
cc.show();
$(_79).treegrid("autoSizeColumn");
_26(_79,_7a);
_7b.onExpand.call(_79,row);
}
};
};
function _36(_7f,_80){
var _81=$.data(_7f,"treegrid").options;
var tr=_81.finder.getTr(_7f,_80);
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_74(_7f,_80);
}else{
_78(_7f,_80);
}
};
function _82(_83,_84){
var _85=$.data(_83,"treegrid").options;
var _86=_2b(_83,_84);
if(_84){
_86.unshift(_47(_83,_84));
}
for(var i=0;i<_86.length;i++){
_74(_83,_86[i][_85.idField]);
}
};
function _87(_88,_89){
var _8a=$.data(_88,"treegrid").options;
var _8b=_2b(_88,_89);
if(_89){
_8b.unshift(_47(_88,_89));
}
for(var i=0;i<_8b.length;i++){
_78(_88,_8b[i][_8a.idField]);
}
};
function _8c(_8d,_8e){
var _8f=$.data(_8d,"treegrid").options;
var ids=[];
var p=_5c(_8d,_8e);
while(p){
var id=p[_8f.idField];
ids.unshift(id);
p=_5c(_8d,id);
}
for(var i=0;i<ids.length;i++){
_78(_8d,ids[i]);
}
};
function _90(_91,_92){
var _93=$.data(_91,"treegrid").options;
if(_92.parent){
var tr=_93.finder.getTr(_91,_92.parent);
if(tr.next("tr.treegrid-tr-tree").length==0){
_37(_91,_92.parent);
}
var _94=tr.children("td[field=\""+_93.treeField+"\"]").children("div.datagrid-cell");
var _95=_94.children("span.tree-icon");
if(_95.hasClass("tree-file")){
_95.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_95);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_3f(_91,_92.parent,_92.data,true);
};
function _96(_97,_98){
var ref=_98.before||_98.after;
var _99=$.data(_97,"treegrid").options;
var _9a=_5c(_97,ref);
_90(_97,{parent:(_9a?_9a[_99.idField]:null),data:[_98.data]});
var _9b=_9a?_9a.children:$(_97).treegrid("getRoots");
for(var i=0;i<_9b.length;i++){
if(_9b[i][_99.idField]==ref){
var _9c=_9b[_9b.length-1];
_9b.splice(_98.before?i:(i+1),0,_9c);
_9b.splice(_9b.length-1,1);
break;
}
}
_9d(true);
_9d(false);
_2f(_97);
$(_97).treegrid("showLines");
function _9d(_9e){
var _9f=_9e?1:2;
var tr=_99.finder.getTr(_97,_98.data[_99.idField],"body",_9f);
var _a0=tr.closest("table.datagrid-btable");
tr=tr.parent().children();
var _a1=_99.finder.getTr(_97,ref,"body",_9f);
if(_98.before){
tr.insertBefore(_a1);
}else{
var sub=_a1.next("tr.treegrid-tr-tree");
tr.insertAfter(sub.length?sub:_a1);
}
_a0.remove();
};
};
function _a2(_a3,_a4){
var _a5=$.data(_a3,"treegrid");
$(_a3).datagrid("deleteRow",_a4);
_2f(_a3);
_a5.total-=1;
$(_a3).datagrid("getPager").pagination("refresh",{total:_a5.total});
$(_a3).treegrid("showLines");
};
function _a6(_a7){
var t=$(_a7);
var _a8=t.treegrid("options");
if(_a8.lines){
t.treegrid("getPanel").addClass("tree-lines");
}else{
t.treegrid("getPanel").removeClass("tree-lines");
return;
}
t.treegrid("getPanel").find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
t.treegrid("getPanel").find("div.datagrid-cell").removeClass("tree-node-last tree-root-first tree-root-one");
var _a9=t.treegrid("getRoots");
if(_a9.length>1){
_aa(_a9[0]).addClass("tree-root-first");
}else{
if(_a9.length==1){
_aa(_a9[0]).addClass("tree-root-one");
}
}
_ab(_a9);
_ac(_a9);
function _ab(_ad){
$.map(_ad,function(_ae){
if(_ae.children&&_ae.children.length){
_ab(_ae.children);
}else{
var _af=_aa(_ae);
_af.find(".tree-icon").prev().addClass("tree-join");
}
});
if(_ad.length){
var _b0=_aa(_ad[_ad.length-1]);
_b0.addClass("tree-node-last");
_b0.find(".tree-join").removeClass("tree-join").addClass("tree-joinbottom");
}
};
function _ac(_b1){
$.map(_b1,function(_b2){
if(_b2.children&&_b2.children.length){
_ac(_b2.children);
}
});
for(var i=0;i<_b1.length-1;i++){
var _b3=_b1[i];
var _b4=t.treegrid("getLevel",_b3[_a8.idField]);
var tr=_a8.finder.getTr(_a7,_b3[_a8.idField]);
var cc=tr.next().find("tr.datagrid-row td[field=\""+_a8.treeField+"\"] div.datagrid-cell");
cc.find("span:eq("+(_b4-1)+")").addClass("tree-line");
}
};
function _aa(_b5){
var tr=_a8.finder.getTr(_a7,_b5[_a8.idField]);
var _b6=tr.find("td[field=\""+_a8.treeField+"\"] div.datagrid-cell");
return _b6;
};
};
$.fn.treegrid=function(_b7,_b8){
if(typeof _b7=="string"){
var _b9=$.fn.treegrid.methods[_b7];
if(_b9){
return _b9(this,_b8);
}else{
return this.datagrid(_b7,_b8);
}
}
_b7=_b7||{};
return this.each(function(){
var _ba=$.data(this,"treegrid");
if(_ba){
$.extend(_ba.options,_b7);
}else{
_ba=$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_b7),data:[]});
}
_1(this);
if(_ba.options.data){
$(this).treegrid("loadData",_ba.options.data);
}
_25(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},resize:function(jq,_bb){
return jq.each(function(){
$(this).datagrid("resize",_bb);
});
},fixRowHeight:function(jq,_bc){
return jq.each(function(){
_26(this,_bc);
});
},loadData:function(jq,_bd){
return jq.each(function(){
_3f(this,_bd.parent,_bd);
});
},load:function(jq,_be){
return jq.each(function(){
$(this).treegrid("options").pageNumber=1;
$(this).treegrid("getPager").pagination({pageNumber:1});
$(this).treegrid("reload",_be);
});
},reload:function(jq,id){
return jq.each(function(){
var _bf=$(this).treegrid("options");
var _c0={};
if(typeof id=="object"){
_c0=id;
}else{
_c0=$.extend({},_bf.queryParams);
_c0.id=id;
}
if(_c0.id){
var _c1=$(this).treegrid("find",_c0.id);
if(_c1.children){
_c1.children.splice(0,_c1.children.length);
}
_bf.queryParams=_c0;
var tr=_bf.finder.getTr(this,_c0.id);
tr.next("tr.treegrid-tr-tree").remove();
tr.find("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_78(this,_c0.id);
}else{
_25(this,null,_c0);
}
});
},reloadFooter:function(jq,_c2){
return jq.each(function(){
var _c3=$.data(this,"treegrid").options;
var dc=$.data(this,"datagrid").dc;
if(_c2){
$.data(this,"treegrid").footer=_c2;
}
if(_c3.showFooter){
_c3.view.renderFooter.call(_c3.view,this,dc.footer1,true);
_c3.view.renderFooter.call(_c3.view,this,dc.footer2,false);
if(_c3.view.onAfterRender){
_c3.view.onAfterRender.call(_c3.view,this);
}
$(this).treegrid("fixRowHeight");
}
});
},getData:function(jq){
return $.data(jq[0],"treegrid").data;
},getFooterRows:function(jq){
return $.data(jq[0],"treegrid").footer;
},getRoot:function(jq){
return _57(jq[0]);
},getRoots:function(jq){
return _5a(jq[0]);
},getParent:function(jq,id){
return _5c(jq[0],id);
},getChildren:function(jq,id){
return _2b(jq[0],id);
},getLevel:function(jq,id){
return _69(jq[0],id);
},find:function(jq,id){
return _47(jq[0],id);
},isLeaf:function(jq,id){
var _c4=$.data(jq[0],"treegrid").options;
var tr=_c4.finder.getTr(jq[0],id);
var hit=tr.find("span.tree-hit");
return hit.length==0;
},select:function(jq,id){
return jq.each(function(){
$(this).datagrid("selectRow",id);
});
},unselect:function(jq,id){
return jq.each(function(){
$(this).datagrid("unselectRow",id);
});
},collapse:function(jq,id){
return jq.each(function(){
_74(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_78(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_36(this,id);
});
},collapseAll:function(jq,id){
return jq.each(function(){
_82(this,id);
});
},expandAll:function(jq,id){
return jq.each(function(){
_87(this,id);
});
},expandTo:function(jq,id){
return jq.each(function(){
_8c(this,id);
});
},append:function(jq,_c5){
return jq.each(function(){
_90(this,_c5);
});
},insert:function(jq,_c6){
return jq.each(function(){
_96(this,_c6);
});
},remove:function(jq,id){
return jq.each(function(){
_a2(this,id);
});
},pop:function(jq,id){
var row=jq.treegrid("find",id);
jq.treegrid("remove",id);
return row;
},refresh:function(jq,id){
return jq.each(function(){
var _c7=$.data(this,"treegrid").options;
_c7.view.refreshRow.call(_c7.view,this,id);
});
},update:function(jq,_c8){
return jq.each(function(){
var _c9=$.data(this,"treegrid").options;
_c9.view.updateRow.call(_c9.view,this,_c8.id,_c8.row);
});
},beginEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("beginEdit",id);
$(this).treegrid("fixRowHeight",id);
});
},endEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("endEdit",id);
});
},cancelEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("cancelEdit",id);
});
},showLines:function(jq){
return jq.each(function(){
_a6(this);
});
}};
$.fn.treegrid.parseOptions=function(_ca){
return $.extend({},$.fn.datagrid.parseOptions(_ca),$.parser.parseOptions(_ca,["treeField",{animate:"boolean"}]));
};
var _cb=$.extend({},$.fn.datagrid.defaults.view,{render:function(_cc,_cd,_ce){
var _cf=$.data(_cc,"treegrid").options;
var _d0=$(_cc).datagrid("getColumnFields",_ce);
var _d1=$.data(_cc,"datagrid").rowIdPrefix;
if(_ce){
if(!(_cf.rownumbers||(_cf.frozenColumns&&_cf.frozenColumns.length))){
return;
}
}
var _d2=this;
if(this.treeNodes&&this.treeNodes.length){
var _d3=_d4(_ce,this.treeLevel,this.treeNodes);
$(_cd).append(_d3.join(""));
}
function _d4(_d5,_d6,_d7){
var _d8=$(_cc).treegrid("getParent",_d7[0][_cf.idField]);
var _d9=(_d8?_d8.children.length:$(_cc).treegrid("getRoots").length)-_d7.length;
var _da=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_d7.length;i++){
var row=_d7[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
var css=_cf.rowStyler?_cf.rowStyler.call(_cc,row):"";
var _db="";
var _dc="";
if(typeof css=="string"){
_dc=css;
}else{
if(css){
_db=css["class"]||"";
_dc=css["style"]||"";
}
}
var cls="class=\"datagrid-row "+(_d9++%2&&_cf.striped?"datagrid-row-alt ":" ")+_db+"\"";
var _dd=_dc?"style=\""+_dc+"\"":"";
var _de=_d1+"-"+(_d5?1:2)+"-"+row[_cf.idField];
_da.push("<tr id=\""+_de+"\" node-id=\""+row[_cf.idField]+"\" "+cls+" "+_dd+">");
_da=_da.concat(_d2.renderRow.call(_d2,_cc,_d0,_d5,_d6,row));
_da.push("</tr>");
if(row.children&&row.children.length){
var tt=_d4(_d5,_d6+1,row.children);
var v=row.state=="closed"?"none":"block";
_da.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_d0.length+(_cf.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_da=_da.concat(tt);
_da.push("</div></td></tr>");
}
}
_da.push("</tbody></table>");
return _da;
};
},renderFooter:function(_df,_e0,_e1){
var _e2=$.data(_df,"treegrid").options;
var _e3=$.data(_df,"treegrid").footer||[];
var _e4=$(_df).datagrid("getColumnFields",_e1);
var _e5=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_e3.length;i++){
var row=_e3[i];
row[_e2.idField]=row[_e2.idField]||("foot-row-id"+i);
_e5.push("<tr class=\"datagrid-row\" node-id=\""+row[_e2.idField]+"\">");
_e5.push(this.renderRow.call(this,_df,_e4,_e1,0,row));
_e5.push("</tr>");
}
_e5.push("</tbody></table>");
$(_e0).html(_e5.join(""));
},renderRow:function(_e6,_e7,_e8,_e9,row){
var _ea=$.data(_e6,"treegrid").options;
var cc=[];
if(_e8&&_ea.rownumbers){
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_e7.length;i++){
var _eb=_e7[i];
var col=$(_e6).datagrid("getColumnOption",_eb);
if(col){
var css=col.styler?(col.styler(row[_eb],row)||""):"";
var _ec="";
var _ed="";
if(typeof css=="string"){
_ed=css;
}else{
if(cc){
_ec=css["class"]||"";
_ed=css["style"]||"";
}
}
var cls=_ec?"class=\""+_ec+"\"":"";
var _ee=col.hidden?"style=\"display:none;"+_ed+"\"":(_ed?"style=\""+_ed+"\"":"");
cc.push("<td field=\""+_eb+"\" "+cls+" "+_ee+">");
var _ee="";
if(!col.checkbox){
if(col.align){
_ee+="text-align:"+col.align+";";
}
if(!_ea.nowrap){
_ee+="white-space:normal;height:auto;";
}else{
if(_ea.autoRowHeight){
_ee+="height:auto;";
}
}
}
cc.push("<div style=\""+_ee+"\" ");
if(col.checkbox){
cc.push("class=\"datagrid-cell-check ");
}else{
cc.push("class=\"datagrid-cell "+col.cellClass);
}
cc.push("\">");
if(col.checkbox){
if(row.checked){
cc.push("<input type=\"checkbox\" checked=\"checked\"");
}else{
cc.push("<input type=\"checkbox\"");
}
cc.push(" name=\""+_eb+"\" value=\""+(row[_eb]!=undefined?row[_eb]:"")+"\">");
}else{
var val=null;
if(col.formatter){
val=col.formatter(row[_eb],row);
}else{
val=row[_eb];
}
if(_eb==_ea.treeField){
for(var j=0;j<_e9;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
if(row.children&&row.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(row.iconCls?row.iconCls:"")+"\"></span>");
}
}
cc.push("<span class=\"tree-title\">"+val+"</span>");
}else{
cc.push(val);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},refreshRow:function(_ef,id){
this.updateRow.call(this,_ef,id,{});
},updateRow:function(_f0,id,row){
var _f1=$.data(_f0,"treegrid").options;
var _f2=$(_f0).treegrid("find",id);
$.extend(_f2,row);
var _f3=$(_f0).treegrid("getLevel",id)-1;
var _f4=_f1.rowStyler?_f1.rowStyler.call(_f0,_f2):"";
var _f5=$.data(_f0,"datagrid").rowIdPrefix;
var _f6=_f2[_f1.idField];
function _f7(_f8){
var _f9=$(_f0).treegrid("getColumnFields",_f8);
var tr=_f1.finder.getTr(_f0,id,"body",(_f8?1:2));
var _fa=tr.find("div.datagrid-cell-rownumber").html();
var _fb=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow(_f0,_f9,_f8,_f3,_f2));
tr.attr("style",_f4||"");
tr.find("div.datagrid-cell-rownumber").html(_fa);
if(_fb){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
if(_f6!=id){
tr.attr("id",_f5+"-"+(_f8?1:2)+"-"+_f6);
tr.attr("node-id",_f6);
}
};
_f7.call(this,true);
_f7.call(this,false);
$(_f0).treegrid("fixRowHeight",id);
},deleteRow:function(_fc,id){
var _fd=$.data(_fc,"treegrid").options;
var tr=_fd.finder.getTr(_fc,id);
tr.next("tr.treegrid-tr-tree").remove();
tr.remove();
var _fe=del(id);
if(_fe){
if(_fe.children.length==0){
tr=_fd.finder.getTr(_fc,_fe[_fd.idField]);
tr.next("tr.treegrid-tr-tree").remove();
var _ff=tr.children("td[field=\""+_fd.treeField+"\"]").children("div.datagrid-cell");
_ff.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_ff.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_ff);
}
}
function del(id){
var cc;
var _100=$(_fc).treegrid("getParent",id);
if(_100){
cc=_100.children;
}else{
cc=$(_fc).treegrid("getData");
}
for(var i=0;i<cc.length;i++){
if(cc[i][_fd.idField]==id){
cc.splice(i,1);
break;
}
}
return _100;
};
},onBeforeRender:function(_101,_102,data){
if($.isArray(_102)){
data={total:_102.length,rows:_102};
_102=null;
}
if(!data){
return false;
}
var _103=$.data(_101,"treegrid");
var opts=_103.options;
if(data.length==undefined){
if(data.footer){
_103.footer=data.footer;
}
if(data.total){
_103.total=data.total;
}
data=this.transfer(_101,_102,data.rows);
}else{
function _104(_105,_106){
for(var i=0;i<_105.length;i++){
var row=_105[i];
row._parentId=_106;
if(row.children&&row.children.length){
_104(row.children,row[opts.idField]);
}
}
};
_104(data,_102);
}
var node=_47(_101,_102);
if(node){
if(node.children){
node.children=node.children.concat(data);
}else{
node.children=data;
}
}else{
_103.data=_103.data.concat(data);
}
this.sort(_101,data);
this.treeNodes=data;
this.treeLevel=$(_101).treegrid("getLevel",_102);
},sort:function(_107,data){
var opts=$.data(_107,"treegrid").options;
if(!opts.remoteSort&&opts.sortName){
var _108=opts.sortName.split(",");
var _109=opts.sortOrder.split(",");
_10a(data);
}
function _10a(rows){
rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_108.length;i++){
var sn=_108[i];
var so=_109[i];
var col=$(_107).treegrid("getColumnOption",sn);
var _10b=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_10b(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
for(var i=0;i<rows.length;i++){
var _10c=rows[i].children;
if(_10c&&_10c.length){
_10a(_10c);
}
}
};
},transfer:function(_10d,_10e,data){
var opts=$.data(_10d,"treegrid").options;
var rows=[];
for(var i=0;i<data.length;i++){
rows.push(data[i]);
}
var _10f=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(!_10e){
if(!row._parentId){
_10f.push(row);
rows.splice(i,1);
i--;
}
}else{
if(row._parentId==_10e){
_10f.push(row);
rows.splice(i,1);
i--;
}
}
}
var toDo=[];
for(var i=0;i<_10f.length;i++){
toDo.push(_10f[i]);
}
while(toDo.length){
var node=toDo.shift();
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(row._parentId==node[opts.idField]){
if(node.children){
node.children.push(row);
}else{
node.children=[row];
}
toDo.push(row);
rows.splice(i,1);
i--;
}
}
}
return _10f;
}});
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,lines:false,animate:false,singleSelect:true,view:_cb,rowEvents:$.extend({},$.fn.datagrid.defaults.rowEvents,{mouseover:_32(true),mouseout:_32(false),click:_34}),loader:function(_110,_111,_112){
var opts=$(this).treegrid("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_110,dataType:"json",success:function(data){
_111(data);
},error:function(){
_112.apply(this,arguments);
}});
},loadFilter:function(data,_113){
return data;
},finder:{getTr:function(_114,id,type,_115){
type=type||"body";
_115=_115||0;
var dc=$.data(_114,"datagrid").dc;
if(_115==0){
var opts=$.data(_114,"treegrid").options;
var tr1=opts.finder.getTr(_114,id,type,1);
var tr2=opts.finder.getTr(_114,id,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
var tr=$("#"+$.data(_114,"datagrid").rowIdPrefix+"-"+_115+"-"+id);
if(!tr.length){
tr=(_115==1?dc.body1:dc.body2).find("tr[node-id=\""+id+"\"]");
}
return tr;
}else{
if(type=="footer"){
return (_115==1?dc.footer1:dc.footer2).find("tr[node-id=\""+id+"\"]");
}else{
if(type=="selected"){
return (_115==1?dc.body1:dc.body2).find("tr.datagrid-row-selected");
}else{
if(type=="highlight"){
return (_115==1?dc.body1:dc.body2).find("tr.datagrid-row-over");
}else{
if(type=="checked"){
return (_115==1?dc.body1:dc.body2).find("tr.datagrid-row-checked");
}else{
if(type=="last"){
return (_115==1?dc.body1:dc.body2).find("tr:last[node-id]");
}else{
if(type=="allbody"){
return (_115==1?dc.body1:dc.body2).find("tr[node-id]");
}else{
if(type=="allfooter"){
return (_115==1?dc.footer1:dc.footer2).find("tr[node-id]");
}
}
}
}
}
}
}
}
}
},getRow:function(_116,p){
var id=(typeof p=="object")?p.attr("node-id"):p;
return $(_116).treegrid("find",id);
},getRows:function(_117){
return $(_117).treegrid("getChildren");
}},onBeforeLoad:function(row,_118){
},onLoadSuccess:function(row,data){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
},onClickCell:function(_119,row){
},onDblClickCell:function(_11a,row){
},onContextMenu:function(e,row){
},onBeforeEdit:function(row){
},onAfterEdit:function(row,_11b){
},onCancelEdit:function(row){
}});
})(jQuery);

