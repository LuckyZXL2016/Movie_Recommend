/*Author: 	zhaoyinfan  Date:2014-05-05 version 2.0*/
var upcode =function(id,ls){
    if(document.getElementById(id)){
        document.getElementById(id).src += "?new=" + Math.random();
        $("#"+id).prev().attr("class","");
        $("#"+id).prev().prev().val('');
    }
}
var comMsg=function(msg){
    return GetLen(msg)>=38? "<font class='f_1'>"+msg+"</font>":"<font class='f_0'>"+msg+"</font>";
}
var email2val =function(id,obj){
    document.getElementById(id).value=obj.innerHTML;
    $("#person_mail").hide();
    $("#person_mail").html('');
    ckmem();
}
//show error massage
var showError =function(inputid,errid,msg){
    $("#"+inputid).parent().attr("class","").addClass("regM errorBorder");
    $("#"+inputid).next().attr("class","");
    $("#"+errid).attr("class","reg_error").html(comMsg(msg));
}
//show success massage
var showSuccess = function(inputid,errid,msg){
    $("#"+inputid).parent().attr("class","").addClass("regM defaultBorder");
    $("#"+inputid).next().attr("class","regOk");
    $("#"+errid).attr("class","").html("");
}
var showRestore =function(inputid,errid){
    $("#"+inputid).parent().attr("class","").addClass("regM defaultBorder");
    $("#"+inputid).next().attr("class","");
    $("#"+errid).attr("class","").html('');
}
/*----------------------个人注册JS------------------------------*/
var showcodeDiv =function(num){
    var code_1 =	'<label><font>*</font> 短信验证码：</label>'+
        '<input type="text" style="width:143px" class="regCodeInput defaultBorder"  id="sms_code" name="sms_code"  onfocus="showCodetip(\'sms_code\',\'sms_codeErr\',4);" onkeyup="ckmcode(0,1);" onblur="ckmcode(0,0);"/>'+
        '<em></em><input name="gvCode" id="send" class="gvCode regMl6" type="button" onclick="getmcode();" value="获取短信验证码">'+
        '<span id="sms_codeErr" ></span>';
    var code_2 ='<label><font>*</font> 验证码：</label>'+
        '<input type="text" class="regCodeInput defaultBorder" id="auth_code" name="auth_code" onfocus="showCodetip(\'auth_code\',\'auth_codeErr\',5);" onkeyup="ckcode(0,1);" onblur="ckcode(0,0);"/>'+
        '<em></em><img id="code_img1" src="/validate/" onclick="this.src+=\'?new=\' + Math.random()" alt="看不清？点一下！" title="看不清？点一下！" width="106" height="36" border="0" class="floatleft regMl6">'+
        '<span class="codeTitle floatleft regMl6">看不清？<a href="javascript:void(0);" onclick="upcode(\'code_img1\');">换一换</a></span>'+
        '<span id="auth_codeErr" ></span>';
    //if(num==1&& !$.trim( $("#yzcode_1").html() )){
    if(num==1){
        //$("#yzcode_2").html(code_1).show();
    }
    if(num==2 ){
        $("#yzcode_2").html('').hide();
        $("#yzcode_3").show();
    }
    if(num==3 && !$.trim( $("#yzcode_2").html() )){
        $("#yzcode_2").html(code_1).show()
        $("#yzcode_3").show();

    }
}

var showtip =function(inputid,spanid,key){
    var ms = defaultArr[key];
    $("#"+inputid).parent().attr("class","").addClass("regM okBorder");
    $("#"+inputid).next().attr("class","");
    $("#"+spanid).attr("class","reg_error1").html(comMsg(ms));
    return ;
}
var showPwdtip =function(inputid,spanid,key){
    var ms = defaultArr[key];
    $("#"+inputid).parent().attr("class","").addClass("regM okBorder");
    $("#"+inputid).next().attr("class","");
    $("#"+spanid).attr("class","reg_error2").html(comMsg(ms));
    return ;
}
var showCodetip =function(inputid,spanid,key){
    var ms = defaultArr[key];
    $("#"+inputid).attr("class","").addClass("regCodeInput okBorder");
    $("#"+spanid).attr("class","reg_error1").html(comMsg(ms));
    return ;
}
var showCodeError =function(inputid,errid,msg){
    $("#"+inputid).attr("class","").addClass("regCodeInput errorBorder");
    $("#"+errid).attr("class","reg_error").html(comMsg(msg));
}
var tsmail_Arr =Array();
tsmail_Arr[0] = "qq.com";
tsmail_Arr[1] = "163.com";
tsmail_Arr[2] = "126.com";
tsmail_Arr[3] = "189.cn";
tsmail_Arr[4] = "sina.com";
tsmail_Arr[5] = "hotmail.com";
tsmail_Arr[6] = "gmail.com";
var mail_div =function(e){
    var event = e ? e : window.event;
    var keyCode = event.keyCode;
    var vschool = $(".accountSearch");

    if (keyCode == 40 || keyCode == 38 || keyCode == 13) {
        var tipindex = $("#hnseli").val() == "" ? -1 : $("#hnseli").val();
        var fobj;
        if (keyCode == 40) {
            tipindex++;
            if (tipindex == vschool.find("span").length) {
                tipindex = 0;
                vschool.find("span").eq(vschool.find("span").length - 1).css("background-color", "");
            }
            fobj = vschool.find("span").eq(tipindex);
            vschool.find("span").eq(tipindex - 1).css("background-color", "");
            fobj.css("background-color", "#E6E6E6");
            $("#userMam").val(fobj.html().replace(/<(\S*?)[^>]*>|<.*? \/>/g, ""));
            $("#schoolid").val(fobj.attr("value"));
            $("#hnseli").val(tipindex);
            return;
        } else if (keyCode == 38) {
            tipindex--;
            if (tipindex <= -1) {
                tipindex = vschool.find("span").length - 1;
                vschool.find("span").eq(0).css("background-color", "");
            }
            vschool.find("span").eq(tipindex + 1).css("background-color", "");
            fobj = vschool.find("span").eq(tipindex);
            fobj.css("background-color", "#E6E6E6");
            if (fobj.html() != null) {
                $("#userMam").val(fobj.html().replace(/<(\S*?)[^>]*>|<.*? \/>/g, ""));
                $("#schoolid").val(fobj.attr("value"));
            }
            $("#hnseli").val(tipindex);
            return;
        } else if (keyCode == 13) {
            if ($("#userMam").val().length >= 1) {
                var combinedValue = vschool.find("span").eq(tipindex).html();
                if (combinedValue != null) {
                    $("#userMam").val(combinedValue.replace(/<(\S*?)[^>]*>|<.*? \/>/g, ""));
                }
                vschool.hide();
                if ($("#schoolid").val() != "") {
                    $("#hnschool").val("1");
                    $("#hnschool").attr("sta", 2);
                    $("#userMam").blur();
                } else {
                    $("#hnschool").val("-1");
                    $("#hnschool").attr("sta", 0);
                }
                $("#hnseli").val(tipindex);
                return;
            }
        }
    }

    $("#person_mail").hide();
    var val = $.trim( $("#"+MailMId).val() );
    if(val==''){ return false; }
    showcodeDiv(2);
    var mLoArr = val.split('@');
    var mlogoNum = mLoArr.length-1;
    var mailist='';

    if(mlogoNum==1){
        //请输入您的常用邮箱
        showtip('userMam','userMamErr',1);
        var rightMstr = mLoArr[1];
        var leftMstr = mLoArr[0];
        for(var i=0;i<tsmail_Arr.length;i++){
            if( tsmail_Arr[i].indexOf(rightMstr)==0 && rightMstr ){
                var mail = leftMstr+"@"+ tsmail_Arr[i];
                mailist +='<span onmousedown="email2val(\'userMam\',this);">'+mail+'</span>';
            }
            if(rightMstr==''){
                var mail = val + tsmail_Arr[i];
                mailist +='<span onmousedown="email2val(\'userMam\',this);">'+mail+'</span>';
            }
        }
        if(mailist){
            var html =mailist;
            $("#person_mail").html(html).show();
        }
    }

}
//check mobile email
var mb;   mb=0;
var ckmem =function(isCk){
    var val = $.trim( $("#"+MailMId).val() );
    $("#nameRegOk").val("");
    if(!isCk && !val){
        showRestore(MailMId,MailMErrId);
        return false;
    }/*
     if(val==''){
     showError(MailMId,MailMErrId,memArr[0]);
     $("#person_mail").hide().html('');
     return false;
     }*/
    if( !mobile_preg(val) ){
        showError(MailMId,MailMErrId,memArr[1]);
        $("#person_mail").hide().html('');
        return false;
    }
    var num_preg = /^[0-9]{1,}$/;
    if( num_preg.test(val)  ){
        showcodeDiv(1);
        mb=1;
        if( !mobile_preg(val) ){
            showError(MailMId,MailMErrId,memArr[1]);
            $("#person_mail").hide().html('');
            return false;
        }
        $("#person_mail").hide().html('');
        //校验中
        $.ajaxSetup({async:false });
        var bol=false;
        $("#"+MailMErrId).attr("class","").addClass("reg_error1").html(comMsg("检测中...."));
        $.post("/ajax/verifmobile/",{"name":"userMobile","param":val},function(data){
            if(data!="y"){
                if(data.indexOf("请直接登录")>=0){
                    var newData = comMsg(data).replace("请直接登录","<a href='/' style='color:#669900'>请直接登录</a>");
                    if(data.indexOf("宜立方速运")>-1){
                        newData = "该手机在宜立方速运已注册，请<a href='/' style='color:#669900'>直接登录></a>或<a href='/reg/findpass/?returnUrl=http://www.e3mall.cn/' target='_blank' style='color:#669900'>找回密码></a>";
                    }
                    $("#"+MailMId).parent().attr("class","").addClass("regM errorBorder").next().attr("class","");
                    $("#"+MailMErrId).attr("class","reg_error").html(newData);
                }else{
                    showError(MailMId,MailMErrId,data);
                }
                return false;
            }
            $("#nameRegOk").val(1);
            showSuccess(MailMId,MailMErrId,OkArr[0]);
            bol=true;
        });
        return bol;
    }
    /*else {
     mb=0;
     showcodeDiv(2);
     if( !mail_preg(val) ){
     showError(MailMId,MailMErrId,memArr[2]);
     $("#person_mail").hide().html('');
     return false;
     }
     $("#person_mail").hide().html('');
     $.ajaxSetup({async:false });
     $("#"+MailMErrId).attr("class","").addClass("reg_error1").html(comMsg("检测中...."));
     var bol=false;
     $.post("/ajax/verifemails/",{"name":"outemail","param":val},function(data){
     if(data!="y"){
     if(data.indexOf("请直接登录")>=0){
     var newData = comMsg(data).replace("请直接登录","<a href='/' style='color:#669900'>请直接登录</a>");
     if(data.indexOf("宜立方速运")>-1){
     newData = "该邮箱在宜立方速运已注册，请<a href='/' style='color:#669900'>直接登录></a>或<a href='/reg/findpass/?returnUrl=http://www.e3mall.cn/' target='_blank' style='color:#669900'>找回密码></a>";
     }
     $("#"+MailMId).parent().attr("class","").addClass("regM errorBorder").next().attr("class","");
     $("#"+MailMErrId).attr("class","reg_error").html(newData);
     }else{
     showError(MailMId,MailMErrId,data);
     }
     return false;
     }
     $("#nameRegOk").val(1);
     showSuccess(MailMId,MailMErrId,OkArr[0]);
     bol=true;
     });
     return bol;
     }*/
}
//密码强度显示
var showStrong=function(errid,rankid,rank){
    var def ="<font style='font-size:12px;'>安全程度：</font>";
    var midstr='<em class="default">弱</em><em class="default">中</em><em class="default">强</em>';
    if(parseInt(rank)==1){
        midstr ='<em class="ok">弱</em><em class="default">中</em><em class="default">强</em>';
        $("#"+rankid).html(def+midstr);
        $("#"+errid).attr("class","reg_error2").html(pwdArr[2]);
        return;
    }
    if(parseInt(rank)==2){
        midstr ='<em class="ok">弱</em><em class="ok">中</em><em class="default">强</em>';
    }
    if(parseInt(rank)==3){
        midstr ='<em class="ok">弱</em><em class="ok">中</em><em class="ok">强</em>';
    }
    $("#"+rankid).html(def+midstr);
}

//check password
var ckpwd=function(isCk,keyup){
    var val =$.trim( $("#"+PwdId).val() );
    if(val.length<6&&keyup==1){
        showStrong(PwdErrId,pwdStrong,0);
        showRestore(PwdId,PwdErrId);
        return false;
    }
    if(!isCk && !val){
        showRestore(PwdId,PwdErrId);
        return false;
    }
    if(val == ""){
        showError(PwdId,PwdErrId,pwdArr[0]);
        return false;
    }else if( pwdTotal(val) ==0){
        showError(PwdId,PwdErrId,pwdArr[3]);
        return false;
    }else if( pwdTotal(val) ==-1){
        showError(PwdId,PwdErrId,pwdArr[3]);
        return false;
    }else if( pwdTotal(val) <=50){
        $("#"+PwdId).parent().attr("class","").addClass("regM defaultBorder");
        $("#"+PwdId).next().attr("class","regOk");
        showStrong(PwdErrId,pwdStrong,1);
        return 1;
    }else if( pwdTotal(val)>51&&pwdTotal(val) <=60){
        showStrong(PwdErrId,pwdStrong,2);
        showSuccess(PwdId,PwdErrId,OkArr[0]);
        return 1;
    }else if( pwdTotal(val)>60){
        showStrong(PwdErrId,pwdStrong,3);
        showSuccess(PwdId,PwdErrId,OkArr[0]);
        return 1;
    }
    return false;
}
// check password 2
var ckpwd2=function(isCk){
    var val =$.trim( $("#"+PwdId).val() );
    var val2 =$.trim( $("#"+PwdId2).val() );
    if(!isCk && !val2){
        showRestore(PwdId2,PwdErrId2);
        return false;
    }
    if(val2 == ''){
        showError(PwdId2,PwdErrId2,pwd2Arr[0]);
        return false;
    }else if(val2!= val){
        showError(PwdId2,PwdErrId2,pwd2Arr[1]);
        return false;
    }
    showSuccess(PwdId2,PwdErrId2,OkArr[0]);
    return 1;
}
var ckmcode=function(isCk,keyup){
    var mcode =clsTrim($.trim( $("#"+MobileCodeId).val() ));
    if(mcode.length<6&&keyup==1){
        $("#"+MobileCodeId).next().attr("class","");
        return false;
    }
    if(!isCk && !mcode){
        $("#"+MobileCodeId).attr("class","").addClass("regCodeInput defaultBorder");
        $("#"+MobileCodeId).next().attr("class","");
        $("#"+MobileCodeErrId).attr("class","").html("");
        return false;
    }
    if(mcode==''){
        showCodeError(MobileCodeId,MobileCodeErrId,mcodeArr[0]);
        return false;
    }
    var mobileNum  = $.trim( $("#"+MailMId).val() );
    $.ajaxSetup({async:false });
    $("#"+MobileCodeErrId).attr("class","").addClass("reg_error1").html(comMsg("检测中...."));
    var bol=false;
    $.post("/ajax/VerifSmscode/",{"mobile":mobileNum,"param":mcode},function(data){
        if(data!='y'){
            $("#"+MobileCodeId).next().attr("class","");
            showCodeError(MobileCodeId,MobileCodeErrId,data);
            return false;
        }
        $("#"+MobileCodeId).attr("class","regCodeInput defaultBorder").next().attr("class","regOk1").css("left","246px");
        $("#"+MobileCodeErrId).html("").attr("class","");
        bol=true;
    });
    return bol;
}

var ckcode =function(isCk,keyup){
    var Authcode =clsTrim($.trim( $("#"+pageCodeId).val() ));
    if(Authcode.length<4&&keyup==1){
        $("#"+pageCodeId).attr("class","").addClass("regCodeInput defaultBorder").next().attr("class","");
        $("#"+pageCodeErrId).attr("class","").html("");
        return false;
    }
    if(!isCk && !Authcode ){
        $("#"+pageCodeId).attr("class","").addClass("regCodeInput defaultBorder");
        $("#"+pageCodeErrId).attr("class","").html("");
        return false;
    }
    if(Authcode==''){
        showCodeError(pageCodeId,pageCodeErrId,codeArr[0]);
        return false;
    }else if(Authcode.length!=4){
        upcode(codeimgid);
        showCodeError(pageCodeId,pageCodeErrId,codeArr[1]);
        return false;
    }
    $.ajaxSetup({async:false });
    $("#"+pageCodeErrId).attr("class","").addClass("reg_error1").html(comMsg("检测中...."));
    var bol=false;
    $.post("/reg/codes/",{"name":"auth_code","param":Authcode},function(data){
        if(data!='y'){
            showCodeError(pageCodeId,pageCodeErrId,data);
            upcode(codeimgid);
            return false;
        }else{

            if( mb==1 && $("#yzcode_2").css("display")=='none'){
                showcodeDiv(3);
                $("#auth_code").val(Authcode);
            }
            $("#"+pageCodeId).attr("class","").addClass("regCodeInput defaultBorder").next().attr("class","regOk1");
            $("#"+pageCodeErrId).html("").attr("class","");
            bol=true;

        }
    });
    return bol;
}

var getmcode =function(){
    var mobileNum = $.trim( $("#"+MailMId).val() );
    var myzm=$("#auth_code").val();  //图片验证码
    var a1= $("#"+MailMErrId).html();
    if( !a1 ){
        $.post("/other/getsms/",{"mobile":mobileNum,'auth_code':myzm},function(data){
            if(data!='y'){
                upcode(codeimgid);
                showCodeError(MobileCodeId,MobileCodeErrId,data);
                return false;
            }
            if(data=='验证码不正确'){
                showCodeError(pageCodeId,pageCodeErrId,data);
                upcode(codeimgid);
                return false;
            }
            if(data=='y'){
                ctDown('send');
                $("#"+MobileCodeErrId).attr("class","reg_error1").html(comMsg("短信验证码已发送，请查收。"));return ;
            }
        });
    }else{
        showCodeError(MobileCodeId,MobileCodeErrId,comMsg(a1));
    }
}
var showDmtip=function(){
    $("#"+sfCodeId).attr("class","regInvitationInput okBorder floatleft");
    $("#"+sfCodeErrId).attr("class","reg_error1").html(comMsg("请输入优选单邀请码"));
}
var ckdmcode =function(isCk,keyup){
    var dmNum=clsTrim($.trim( $("#"+sfCodeId).val() ));
    if(dmNum.length<6&&keyup==1){
        $("#"+sfCodeId).attr("class","regInvitationInput defaultBorder floatleft").next().attr("class","");
        $("#"+sfCodeErrId).attr("class","").html("");
        return false;
    }
    if(!isCk && !dmNum){
        $("#"+sfCodeId).attr("class","regInvitationInput defaultBorder floatleft");
        $("#"+sfCodeErrId).attr("class","").html("");
    }
    if(dmNum){
        if( dmNum.length!=6 && dmNum.length!=12 && dmNum.length!=14 ){
            $("#"+sfCodeId).attr("class","regInvitationInput errorBorder floatleft");
            $("#"+sfCodeErrId).attr("class","reg_error").html(comMsg("邀请码错误"));
            return false;
        }
        $.ajaxSetup({async:false });
        $("#"+sfCodeErrId).attr("class","").addClass("reg_error1").html(comMsg("检测中...."));
        var bol=false;
        $.post("/ajax/validatedm/",{"name":sfCodeId,"param":dmNum},function(data){
            if(data!="y"){
                $("#"+sfCodeId).attr("class","regInvitationInput errorBorder floatleft");
                $("#"+sfCodeErrId).attr("class","reg_error").html(comMsg(data));
                return false;
            }else{
                $("#"+sfCodeId).next().attr("class","regOk1").css("left","243px");
                $("#"+sfCodeId).attr("class","regInvitationInput defaultBorder floatleft");
                $("#"+sfCodeErrId).html("").attr("class","");
                bol=true;
            }
        });
        return bol;
    }
}
var ckAgree =function(){
    var Agreestat = document.getElementById(AgreementId).checked;
    if(Agreestat==false){
        $("#"+AgreementErrId).attr("class","").addClass("reg_error").html( comMsg(agreeArr[0]) );
        return false;
    }
    $("#"+AgreementErrId).attr("class","").html('');
    return 1;
}
$("#"+pageCodeId).live("keyup",function(event){
    if (event.keyCode == 13) {
        sub_data();
    }
});
$("#"+MobileCodeId).live("keyup",function(event){
    if (event.keyCode == 13) {
        sub_data();
    }
});

var sub_data =function(){
    var mem = $.trim( $("#"+MailMId).val() );
    var cknameval = $.trim( $("#nameRegOk").val() );
    var a1= cknameval==1?true:false;
    var a2 = ckpwd(1);
    var a3 = ckpwd2(1);
    var a4 = false;
    var tjuid=$("#tjuid").val();
    var a5 = ckAgree(1);
    if(mobile_preg(mem)){
        var a41= ckmcode(1);
        var a42=ckcode(1);
        if(a41==true&&a42==true){
            var a4 = true;
        }else{
            var a4 = false;
        }
    }else{
        var a4 =ckcode(1);
    }
    var a6 = true;
    if($("#"+sfCodeId).val()){
        ckdmcode(1);
        var a6 = !$("#"+sfCodeErrId).html()?true:false;
    }
    if(!a1|| a2==false ||a3==false||a4==false||a5==false||a6==false){
        return false;
    }
    $("#sub_per").html('<a class="unit_login_in" href="javascript:void(0);">注册中...</a>');
    $.post("/register/Regperson/",$('#regForm_mod').serialize().replace(/\+/g,"")+"&tjuid="+tjuid,function(data){
        if(data=="y"){
            //跳转到注册成功页面
            $("#"+pageCodeId).attr("disabled", true);
            $("#"+MobileCodeId).attr("disabled", true);
            location.href="/reg/success/";
            return false;
        }
        if(data=="yy"){// 推荐
            $("#"+pageCodeId).attr("disabled", true);
            $("#"+MobileCodeId).attr("disabled", true);
            location.href="/recommend/?uid="+tjuid;
            return false;
        }
        $("#sub_per").html('<a href="javascript:void(0);" class="registerNow" id="reg_per_data">立即注册</a>');
        $("#"+pageCodeId).attr("disabled", false);
        $("#"+MobileCodeId).attr("disabled", false);
        upcode(codeimgid);
        jAlert('注册失败：' + data);
    });
}

//$("#reg_per_data").live("click",function(){sub_data();});
/*----------------------企业注册JS------------------------------*/
var showcpyError =function(inputid,errid,msg){
    $("#"+inputid).parent().attr("class","regM errorBorder");
    $("#"+inputid).next().attr("class","");
    var 	msg_new =comMsg(msg);
    $("#"+errid).attr("class","reg_error3 f-color").html(msg_new);
}
var showCodecpyError =function(inputid,errid,msg){
    $("#"+inputid).attr("class","regCodeInput errorBorder");
    $("#"+inputid).next().attr("class","");
    var 	msg_new = comMsg(msg);
    $("#"+errid).attr("class","reg_error3 f-color").html(msg_new);
}
var showcpytip =function(inputid,spanid,key){
    var msg = cpyDefaultArr[key];
    $("#"+inputid).parent().attr("class","").addClass("regM okBorder");
    $("#"+inputid).next().attr("class","");
    var 	msg_new = comMsg(msg);
    $("#"+spanid).attr("class","reg_error3").html(msg_new);
    return ;
}
var showCodecpytip =function(inputid,spanid,key){
    var msg = cpyDefaultArr[key];
    $("#"+inputid).attr("class","").addClass("regCodeInput okBorder");
    var 	msg_new =comMsg(msg);
    $("#"+spanid).attr("class","reg_error3").html(msg_new);
    return ;
}

var ckcpyname =function(isCk){
    var val = $.trim( $("#"+cpyUserNameId).val() );
    if(!isCk&&!val){
        showRestore(cpyUserNameId,cpyUserNameErrId);
        return false;
    }
    if(val==''){
        showcpyError(cpyUserNameId,cpyUserNameErrId,cpyUserNameArr[0]);
        return false;
    }else if( val.match(/^(sf)/i) ){
        showcpyError(cpyUserNameId,cpyUserNameErrId,cpyUserNameArr[1]);
        return false;
    }else if( val.match(/^(tmall)/i) ){
        showcpyError(cpyUserNameId,cpyUserNameErrId,cpyUserNameArr[4]);
        return false;
    }else if( val.match(/^(jd)/i) ){
        showcpyError(cpyUserNameId,cpyUserNameErrId,cpyUserNameArr[5]);
        return false;
    }else if( val.match(/^[0-9]{1,}$/) ){
        showcpyError(cpyUserNameId,cpyUserNameErrId,cpyUserNameArr[2]);
        return false;
    }else if(GetLen(val)<4 || GetLen(val)>20){
        showcpyError(cpyUserNameId,cpyUserNameErrId,cpyUserNameArr[3]);
        return false;
    }
    $.ajaxSetup({async:false });
    var bol=false;
    $.post("/ajax/verifUsername/",{"name":"userName","param":val},function(data){
        if(data!="y"){
            if(data.indexOf("请直接登录")>=0){
                $("#"+cpyUserNameId).parent().attr("class","regM errorBorder").next().attr("class","");
                var 	msg_new =comMsg(data).replace("请直接登录","<a href='/' style='color:#669900'>请直接登录</a>");
                $("#"+cpyUserNameErrId).attr("class","reg_error3 f-color").html(msg_new);
            }else{
                showcpyError(cpyUserNameId,cpyUserNameErrId,data);
            }
            return false;
        }
        showSuccess(cpyUserNameId,cpyUserNameErrId);
        bol=true;
    });
    return bol;
}

var ckcpypwd =function(isCk){
    var val =$.trim( $("#"+cpyPwdId).val() );
    var pwd_p1 = /\s/;
    var pwd_p2 = /^(.)\1+$/;
    var pwd_p3 = /^[a-zA-Z]+$/;
    var pwd_p4 = /^[0-9]+$/;
    var pwd_p5 = /^[a-zA-Z0-9_]{6,20}$/;
    if(!isCk&&!val){
        showRestore(cpyPwdId,cpyPwdIdErrId);
        return false;
    }
    if(val == ""){
        showcpyError(cpyPwdId,cpyPwdIdErrId,cpyPwdArr[0]);
        return false;
    }else if(val.length<6 || val.length>20){
        showcpyError(cpyPwdId,cpyPwdIdErrId,cpyPwdArr[1]);
        return false;
    }else if( pwdTotal(val) ==0){
        showcpyError(cpyPwdId,cpyPwdIdErrId,cpyPwdArr[2]);
        return false;
    }else if( pwdTotal(val) ==-1){
        showcpyError(cpyPwdId,cpyPwdIdErrId,cpyPwdArr[2]);
        return false;
    }
    showSuccess(cpyPwdId,cpyPwdIdErrId);
    return 1;
}

var ckcpypwd2 =function(isCk){
    var val =$.trim( $("#"+cpyPwdId).val() );
    var val2 =$.trim( $("#"+cpyPwd2Id).val() );
    if(!isCk&&!val2){
        showRestore(cpyPwd2Id,cpyPwd2ErrId);
        return false;
    }
    if(val2 == ''){
        showcpyError(cpyPwd2Id,cpyPwd2ErrId,cpyPwd2Arr[0]);
        return false;
    }else if(val2!= val){
        showcpyError(cpyPwd2Id,cpyPwd2ErrId,cpyPwd2Arr[1]);
        return false;
    }
    showSuccess(cpyPwd2Id,cpyPwd2ErrId);
    return 1;
}

var ckcpyrealName =function(isCk){
    var realName = $.trim( $("#"+cpyRealNameId).val() );
    if(!isCk&&!realName){
        showRestore(cpyRealNameId,cpyRealNameErrId);
        return false;
    }
    if(realName==''){
        showcpyError(cpyRealNameId,cpyRealNameErrId,cpyRealNameArr[0]);
        return false;
    }
    if ( GetLen(realName)<4 ||GetLen(realName)>20 ){
        showcpyError(cpyRealNameId,cpyRealNameErrId,cpyRealNameArr[1]);
        return false;
    }
    showSuccess(cpyRealNameId,cpyRealNameErrId);
    return 1;
}

var ckcpytel =function(isCk){
    var telNum = $.trim( $("#"+cpyTelphoneId).val() );
    if(!isCk&&!telNum){
        showRestore(cpyTelphoneId,cpyTelphoneErrId);
        return false;
    }
    if(telNum==''){
        showcpyError(cpyTelphoneId,cpyTelphoneErrId,cpyTelArr[0]);
        return false;
    }
    if ( tel_preg(telNum)==false){
        showcpyError(cpyTelphoneId,cpyTelphoneErrId,cpyTelArr[1]);
        return false;
    }
    showSuccess(cpyTelphoneId,cpyTelphoneErrId);
    return 1;
}

var ckcpymobile =function(){
    var cpymobile = $.trim( $("#"+cpyMobileId).val() );
    if(cpymobile==''){
        showRestore(cpyMobileId,cpyMobileErrId);
        return false;
    }
    if ( cpymobile && mobile_preg(cpymobile)==false){
        showcpyError(cpyMobileId,cpyMobileErrId,cpyMobArr[0]);
        return false;
    }
    $.ajaxSetup({async:false });
    var bol=false;
    $.post("/ajax/verifmobile/",{"name":"userMobile","param":cpymobile},function(data){
        if(data!="y"){
            if(data.indexOf("请直接登录")>=0){
                $("#"+cpyMobileId).parent().attr("class","regM errorBorder").next().attr("class","");
                var msg_new =comMsg(data).replace("请直接登录","<a href='/' style='color:#669900'>请直接登录</a>");
                if(data.indexOf("宜立方速运")>-1){
                    msg_new = comMsg("该手机在宜立方速运已注册，请<a href='/' style='color:#669900'>直接登录></a>或<a href='/reg/findpass/?returnUrl=http://www.e3mall.cn/' target='_blank' style='color:#669900'>找回密码></a>");
                }
                $("#"+cpyMobileErrId).attr("class","reg_error3 f-color").html(msg_new);
            }else{
                showcpyError(cpyMobileId,cpyMobileErrId,data);
            }
            return false;
        }
        showSuccess(cpyMobileId,cpyMobileErrId);
        bol=true;
    });
    return bol;
}

var ckcpymail =function(){
    var cpymail = $.trim( $("#"+cpyEmailId).val() );
    if(cpymail==''){
        showRestore(cpyEmailId,cpyEmailErrId);
        return false;
    }
    if ( cpymail && mail_preg(cpymail)==false){
        showcpyError(cpyEmailId,cpyEmailErrId,cpyMaArr[0]);
        return false;
    }
    $.ajaxSetup({async:false });
    var bol=false;
    $.post("/ajax/verifemails/",{"name":"outemail","param":cpymail},function(data){
        if(data!="y"){
            if(data.indexOf("请直接登录")>=0){
                $("#"+cpyEmailId).parent().attr("class","regM errorBorder").next().attr("class","");
                var msg_new =comMsg(data).replace("请直接登录","<a href='/' style='color:#669900'>请直接登录</a>");
                if(data.indexOf("宜立方速运")>-1){
                    msg_new = comMsg("该邮箱在宜立方速运已注册，请<a href='/' style='color:#669900'>直接登录></a>或<a href='/reg/findpass/?returnUrl=http://www.e3mall.cn/' target='_blank' style='color:#669900'>找回密码></a>");
                }
                $("#"+cpyEmailErrId).attr("class","reg_error3 f-color").html(msg_new);
            }else{
                showcpyError(cpyEmailId,cpyEmailErrId,data);
            }
            return false;
        }
        showSuccess(cpyEmailId,cpyEmailErrId);
        bol=true;
    });
    return bol;
}

//公司名
var ckcpy_name =function(isCk){
    var val = $.trim( $("#"+cpyNameId).val() );
    if(!isCk&&!val){
        showRestore(cpyNameId,cpyNameErrId);
        return false;
    }
    if(val==''){
        showcpyError(cpyNameId,cpyNameErrId,cpyNameArr[0]);
        return false;
    }
    if(GetLen(val)<4||GetLen(val)>40){
        showcpyError(cpyNameId,cpyNameErrId,cpyNameArr[1]);
        return false;
    }
    showSuccess(cpyNameId,cpyNameErrId);
    return 1;
}

//公司省获取市
var ckcpy_province =function(isCk){
    var proId = $.trim( $("#"+cpyProvinceId).val() );
    if(!isCk&&!proId){
        showRestore(cpyAddressId,cpyAddressErrId);
        return false;
    }
    if(proId==0){
        showcpyError(cpyAddressId,cpyAddressErrId,cpyAddressArr[0]);
        return false;
    }
    var bol=false;
    $.post("/reg/getcity/",{"cid":proId},function(data){
        if(data=='-1'){
            showcpyError(cpyAddressId,cpyAddressErrId,comArr[0]);
            return false;
        }
        $("#"+cpyCitiesId).html('<option value="0">请选择所在市</option>'+data);
        showRestore(cpyAddressId,cpyAddressErrId);
        bol=true;
    });
    return bol;
}

var ckcpy_cities =function(isCk){
    var proId = $.trim( $("#"+cpyCitiesId).val() );
    if(!isCk&&!proId){
        showRestore(cpyAddressId,cpyAddressErrId);
        return false;
    }
    if(proId==0){
        showcpyError(cpyAddressId,cpyAddressErrId,cpyAddressArr[1]);
        return false;
    }
    showRestore(cpyAddressId,cpyAddressErrId);
    return false;
}

//详细地址
var ckcpy_address =function(isCk){
    var proId = $.trim( $("#"+cpyProvinceId).val() );
    var cityId = $.trim( $("#"+cpyCitiesId).val() );
    var val = $.trim( $("#"+cpyAddressId).val() );
    if(!isCk&&!val){
        showRestore(cpyAddressId,cpyAddressErrId);
        return false;
    }
    if(proId==0){
        showcpyError(cpyAddressId,cpyAddressErrId,cpyAddressArr[0]);
        return false;
    }
    if(cityId==0){
        showcpyError(cpyAddressId,cpyAddressErrId,cpyAddressArr[1]);
        return false;
    }
    if(val==''){
        showcpyError(cpyAddressId,cpyAddressErrId,cpyAddressArr[2]);
        return false;
    }
    if(GetLen(val)<4||GetLen(val)>50){
        showcpyError(cpyAddressId,cpyAddressErrId,cpyAddressArr[3]);
        return false;
    }
    showSuccess(cpyAddressId,cpyAddressErrId);
    return 1;
}

//购买用途
var ckcpy_buyuse =function(isCk){
    var str=document.getElementsByName("cpybuyuse[]");

    var objarray=str.length;
    var chestr="";
    for (i=0;i<objarray;i++){
        if(str[i].checked == true) {
            chestr+=str[i].value+",";
        }
    }
    if(!isCk&&!chestr){
        showRestore(cpyBuyuseId,cpyBuyuseErrId);
        return false;
    }
    if(chestr == ""){
        showcpyError(cpyBuyuseId,cpyBuyuseErrId,cpyBuyuseArr[0]);
        return false;
    }
    showSuccess(cpyBuyuseId,cpyBuyuseErrId);
    return 1;
}
//网址
var ckcpy_website=function(){
    var val = $.trim( $("#"+cpyWebsiteId).val() );
    if(val==''){
        showRestore(cpyWebsiteId,cpyWebsiteErrId);
        return false;
    }
    if(val && url_preg(val)==false){
        showcpyError(cpyWebsiteId,cpyWebsiteErrId,cpyWebsiteArr[0]);
        return false;
    }
    showSuccess(cpyWebsiteId,cpyWebsiteErrId);
    return 1;
}

var ckcpycode =function(isCk,keyup){
    var Authcode =clsTrim($.trim( $("#"+cpyCodeId).val() ));
    if(Authcode.length<4&&keyup==1){
        $("#"+cpyCodeId).attr("class","regCodeInput defaultBorder").next().attr("class","");
        $("#"+cpyCodeErrId).html("").attr("class","");
        return false;
    }
    if(!isCk&&!Authcode){
        $("#"+cpyCodeId).attr("class","regCodeInput defaultBorder").next().attr("class","");
        $("#"+cpyCodeErrId).html("").attr("class","");
        return false;
    }
    if(Authcode==''){
        showCodecpyError(cpyCodeId,cpyCodeErrId,cpyCodeArr[0]);
        return false;
    }else if(Authcode.length!=4){
        upcode(cpyCodeImgId);
        showCodecpyError(cpyCodeId,cpyCodeErrId,cpyCodeArr[1]);
        return false;
    }
    $.ajaxSetup({async:false });
    var bol=false;
    $.post("/reg/codes/",{"name":"auth_code","param":Authcode},function(data){
        if(data!='y'){
            upcode(cpyCodeImgId);
            showCodecpyError(cpyCodeId,cpyCodeErrId,data);
            return false;
        }
        $("#"+cpyCodeId).attr("class","regCodeInput defaultBorder");
        $("#"+cpyCodeId).next().attr("class","regOk1").css("left","145px");
        $("#"+cpyCodeErrId).attr("class","").html("");
        bol=true;
    });
    return bol;
}
//协议勾选
var ckcpy_xy =function(){
    var val = document.getElementById(cpyAgreeId).checked;
    if(val==false){
        $("#"+cpyAgreeErrId).attr("class","reg_error3 f-color").html(comMsg(cpyAgreeArr[0]) );
        return false;
    }
    $("#"+cpyAgreeErrId).attr("class","").html('');
    return 1;
}

var cpy_subdata =function(){
    ckcpyname(1);
    var cm1 = $("#"+cpyUserNameErrId).html();
    ckcpypwd(1);
    var cm2 = $("#"+cpyPwdIdErrId).html();
    ckcpypwd2(1);
    var cm3 = $("#"+cpyPwd2ErrId).html();
    ckcpyrealName(1);
    var cm4 = $("#"+cpyRealNameErrId).html();
    ckcpytel(1);
    var cm5 = $("#"+cpyTelphoneErrId).html();
    ckcpymobile();
    var cm6 = $("#"+cpyMobileErrId).html();
    ckcpymail();
    var cm7 = $("#"+cpyEmailErrId).html();
    ckcpy_name(1);
    var cm8 = $("#"+cpyNameErrId).html();
    var cm9 = $("#"+cpyProvinceId).val();
    var cm10 = $("#"+cpyCitiesId).val();
    ckcpy_address(1);
    var cm11 = $("#"+cpyAddressErrId).html();
    ckcpy_buyuse(1);
    var cm12 = $("#"+cpyBuyuseErrId).html();
    ckcpy_website();
    var cm13 = $("#"+cpyWebsiteErrId).html();
    ckcpycode(1,0);
    var cm14 = $("#"+cpyCodeErrId).html();
    ckcpy_xy(1);
    var cm15 = $("#"+cpyAgreeErrId).html();

    if(cm1||cm2||cm3||cm4||cm5||cm6||cm7||cm8||cm9==0||cm10==0||cm11||cm12||cm13||cm14||cm15){
        return false;
    }

    $.post("/reg/Regcompany/",$('#regForm_cpy').serialize().replace(/\+/g,""),function(data){
        if(data=="y"){
            //跳转到注册成功页面
            $("#"+cpyCodeId).attr("disabled", true);
            location.href="/reg/success/";
        } else {
            upcode(cpyCodeImgId);
            $("#"+cpyCodeId).attr("disabled", false);
            jAlert('注册失败：' + data);
        }
    });
}
$("#"+cpyCodeId).live("keyup",function(event){
    if (event.keyCode == 13) {
        cpy_subdata();
    }
});
