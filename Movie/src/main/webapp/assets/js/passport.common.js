/* version 2.0 
 * Author zhaoyinfan 
 * date 2014-04-30
*/
var hostUrl = document.location.host;
var urlArr = hostUrl.split('.');
var domain = urlArr[1]+'.'+urlArr[2];
var SF_STATIC_BASE_URL='http://i.'+domain+'/com';
var SF_STATIC_HTML_URL='http://i.'+domain+'/html';
var SF_PASSPORT_URL = 'http://passport.'+domain;
var SF_HOME_URL = 'http://home.'+domain;
var SF_WWW_URL = 'http://www.'+domain;
function reloadValidate(){
	var src = document.getElementById('validateIMG').getAttribute('src') + "?new=" + Math.random(1000);
	document.getElementById('validateIMG').setAttribute('src', src);
}
String.prototype.getBytes = function() {   
    var cArr = this.match(/[^\x00-\xff]/ig);   
    return this.length + 2 * (cArr == null ? 0 : cArr.length);   
}
function image_path(path, server_id){
	server_list = new Array();
	server_list[1] = 'http://p.'+domain;
	if(!server_list[server_id]) return path;
	return server_list[server_id] + path;
}
/*
 * 遮罩层
*/
var Shade=new function(){
	var handle={};
	var shade;
	handle.show=function(func){
		if(!shade){
			shade=document.createElement('div');
			shade.style.display = 'none';
			shade.style.zIndex = 2000;
			shade.style.filter = 'alpha(opacity = 60)';
			shade.style.left = 0;
			shade.style.width = '100%';
			shade.style.position = 'absolute';
			shade.style.top = 0;
			shade.style.backgroundColor = '#666';
			shade.style.opacity = .6;
			document.body.appendChild(shade);
		}
		with((document.compatMode=='CSS1Compat')?document.documentElement:document.body){
			var ch=clientHeight,sh=scrollHeight;
			shade.style.height=(sh>ch?sh:ch)+'px';
			var cw = clientWidth,sw = scrollWidth, ow=offsetWidth;
			var width = cw > sw ? cw : sw;
			width = width > ow ? width : ow;
			shade.style.width=width+'px';
			shade.style.display='block';
		}
		if(func){	func(); }
	};
	handle.hide=function(func){
		shade.style.display='none';
		if(func){	func(); }
	};
	return handle;
}
function weblogin(userId,userType){
    var pageConfig = {
        linkTrack :"link",
        heatmap :"1"
    };
    var wt = new webtrekkV3(pageConfig);

    wt.contentId = "WEB:登录流程:登录成功";
    wt.contentGroup = {
        1 :"WEB:登录流程",2 :"网站",3 :"登录成功" //如网站，登录类型为网站（意思是来源宜立方商城的注册用户）、QQ、新浪微博、腾讯微博、支付宝。
    };
    wt.customerId = userId;//用户 ID，该ID是跟CRM 用户打通的主键
    wt.customSessionParameter = {
        1 :"登录用户",//跟踪用户是登录产生
        2 :userType //跟踪用户是个人用户还是企业用户，如“个人用户”

    };
    wt.sendinfo();
}
/*
 *弹出框
 */
var Win = new function(){
	var handler = {};
	var win;
	var closebtn;
	handler.show = function(html, func, closebtn){
		Shade.show();
		if(!win){
			win = document.createElement('div');
			win.style.display = 'none';
		  	win.style.zIndex = 2011;
			win.style.position = 'absolute';
			win.style.left = 0;
			win.style.top = 0;
		    document.body.appendChild(win);
			
			if(closebtn){
				closebtn = document.createElement('div');
				closebtn.style.width = '11px';
				closebtn.style.height = '11px';
				closebtn.style.border = '1px solid #666';
				closebtn.style.position = 'absolute';
				closebtn.style.zIndex = 2011;
				closebtn.style.fontSize = '10px';
				closebtn.style.color = '#333';
				closebtn.innerHTML = "<a href='javascript:void(0)' onclick='Win.hide()' style='text-decoration:none'>×</a>";
				document.body.appendChild(closebtn);
			}
		}
	    with((document.compatMode=='CSS1Compat')?document.documentElement:document.body){
			win.style.display = 'block';
			win.innerHTML = html;
			var ch=clientHeight,sh=scrollHeight, oh=offsetHeight;
			var height = ch;
			var cw = clientWidth,sw = scrollWidth, ow=offsetWidth;
			var width = cw < sw ? cw : sw;
			
			if (document.documentElement && document.documentElement.scrollTop) {
				dh = document.documentElement.scrollTop;
				dw = document.documentElement.scrollLeft;
			}else if (document.body){
				dh = document.body.scrollTop;
				dw = document.body.scrollLeft;
			}else{
				dh = document.documentElement.scrollTop;
				dw = document.documentElement.scrollLeft;
			}
			
			win.style.left = (width - win.offsetWidth) / 2 + dw + 'px';
			win.style.top = (height - win.offsetHeight) / 2 + dh + 'px';
			
			if(closebtn){
				closebtn.style.display = 'block';
				closebtn.style.left = (width -((width - win.offsetWidth) / 2 + dw)- 14) + 'px';
				closebtn.style.top = (height - win.offsetHeight) / 2 + dh + 'px';
			}
		}
		
		if(func){
			func();
		}
	}
	
	handler.iframe = function(title, url, func){
		var html = title + "<iframe src='" + url + "' onload='Win.resize()' frameborder='0' width='100%' height='100%' id='winiframe' name='winiframe' scrolling='auto'></iframe>";
		Win.show(html, func);
	}
	
	handler.hide = function(func){
		win.style.display = 'none';
		if(closebtn) closebtn.style.display = 'none';
		Shade.hide();
		
		if(func){
			func();
		}
	}
	
	handler.resize = function(){
		
		var iframename = 'winiframe';
		var FFextraHeight = 16;
		var FFextraWidth = 16;
		if(window.chrome) return;
		var pTar = null;
		if (document.getElementById){
			pTar = document.getElementById(iframename);
		}else{
			eval('pTar = ' + iframename + ';');
		}
		if (pTar && !window.opera){
			pTar.style.display="block"
			
			if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){
			  //ns6 syntax
			  pTar.height = pTar.contentDocument.body.offsetHeight+FFextraHeight; 
			  pTar.width = pTar.contentDocument.body.offsetWidth+FFextraWidth;
			}
			else if (pTar.Document && pTar.Document.body.scrollHeight){
			  //ie5+ syntax
			  pTar.height = pTar.Document.body.scrollHeight;
			  pTar.width = pTar.Document.body.scrollWidth;
			}
			
			if(win){
				win.width = win.width > pTar.width ? win.width : pTar.width;
				win.height = win.height > pTar.height ? win.height : pTar.height;
				
				with((document.compatMode=='CSS1Compat')?document.documentElement:document.body){
					var ch=clientHeight,sh=scrollHeight;
					var height=(sh<ch?sh:ch);
				  
					var cw = clientWidth,sw = scrollWidth, ow=offsetWidth;
					var width = cw > sw ? cw : sw;
					width = width > ow ? width : ow;
					
					win.style.left = (Math.floor((width - win.width) / 2) > 0 ? Math.floor((width - win.width) / 2) : 0) + 'px';
					win.style.top = (Math.floor((height - win.height) / 2) > 0 ? Math.floor((height - win.height) / 2) : 0) + 'px';
					
					if(closebtn){
						closebtn.style.display = 'block';
						closebtn.style.left = (width -(Math.floor((width - win.width) / 2) > 0 ? Math.floor((width - win.width) / 2) : 0)- 14) + 'px';
						closebtn.style.top = (Math.floor((height - win.height) / 2) > 0 ? Math.floor((height - win.height) / 2) : 0) + 'px';
					}
				}
			}
		}
	}
	return handler;
}

Login = new function(){
	var handler = {};
	var login;
	var functions;
	handler.submit = function(functions){
		var uNameObj = $("#uName");
		var uPwdObj = $("#uPassword");
		var imgCodeId='logincode';
		var validate = document.getElementById(imgCodeId);
		if(!jQuery) return;
		var loginCkval = true;
		var passportName = uNameObj.val();
		if( !passportName){	
			$("#uNameErr").attr("class","error").html("请输入邮箱/验证手机/用户名").prev().attr("class","border-error");
			loginCkval=false;
		}else{
			$("#uNameErr").attr("class","").html("").prev().attr("class","border");
		}
		regex = /^\S{6,45}$/;
		var passportPswd = uPwdObj.val();
		if(passportPswd.length <= 0){
			$("#pwdErr").attr("class","error").html("请输入登录密码").prev().attr("class","border-error");
			loginCkval=false;
		}else if(!regex.test(passportPswd)){
			$("#pwdErr").attr("class","error").html("密码与用户名不匹配,请重新输入").prev().attr("class","border-error");
			loginCkval=false;
		}else{
			$("#pwdErr").attr("class","").html("").prev().attr("class","border");
		}
		var code_val = "";
		if(validate){
			var code_val = validate.value.replace(/\s/g,"");
			if(code_val.length <= 0){
				$("#"+imgCodeId).css("border","1px solid #FA9600");
				$("#codeErr").attr("class","error1").html("请输入验证码");
				loginCkval=false;
			}else if(code_val.length !=4){
				$("#"+imgCodeId).css("border","1px solid #FA9600");
				$("#codeErr").attr("class","error1").html("验证码错误");
				loginCkval=false;
			}else{
				$("#"+imgCodeId).css("border","1px solid #CDCDCD");
				$("#codeErr").attr("class","").html("");
			}
		}
		if(loginCkval==false){
			return false;
		}
		$("#btn_sub").html('<a href="javascript:void(0)" class="login-in_btn">登录中...</a>');
		$("#uNameErr").attr("class","").html("");
		$.post('/ajax/doLogin/', {"passportName":passportName, "passportPswd":passportPswd, "validate":code_val}, function(data){
			switch(data.types){
				case 1:
					if(functions) functions(passportName);weblogin(data.userId,data.userType);
                    break;
				case 2:
					location.href = data.links;
					weblogin(data.userId,data.userType);
					break;
				case -1:
					$("#btn_sub").html('<a href="javascript:void(0)" id="login_sub" class="login_btn">登录</a>');
					var codeImg=document.getElementById('login_validateIMG');
					if (codeImg){
						document.getElementById('login_validateIMG').src += "?new=" + Math.random();
						$("#"+imgCodeId).val('');
					}
					if(data.msg.indexOf("验证码")!=-1){
						$("#codeErr").attr("class","error1").html(data.msg);
						$("#"+imgCodeId).css("border","1px solid #FA9600").val('');
					}else{
						$("#pwdErr").attr("class","error").html(data.msg).prev().attr("class","border-error");
					}
					if( data.show==1){
						//显示验证码
						$('#shosCode').html('<input type="text" name="code"  id="logincode" class="code floatleft" maxlength="4" onkeyup="ck_lgpCode(0,1)" onblur="ck_lgpCode(0,0)" onfocus="showComCode()"/>'+
							'<img onclick="this.src+=\'?new=\' + Math.random()" id="login_validateIMG" src="/validate/" width="106" height="36" border="0" class="code_img floatleft" title="看不清？点一下！" alt="看不清？点一下！"/>'+
							'<div class="codeTitle floatleft">看不清？<a href="javascript:uplcode(\'login_validateIMG\');">换一换</a></div>'+
							'<span id="codeErr"></span>').show();
					}
					break;
				default:
					$("#btn_sub").html('<a href="javascript:void(0)" id="login_sub" class="login_btn">登录</a>');
					//通用处理
					$('#login_validateIMG').src += "?new=" + Math.random();
					$("#"+imgCodeId).val('');
					$('#pwdErr').html('网络错误');
					break;
			}
		}, "json");
	}
	
	handler.checkOnLoad = function(func){
		if(!jQuery) return;
		if(!func) return;	
		$.post('/ajax/checkLogin/', {}, function(data){
			if(data != 0){	func(data);	}
		});
	}
	return handler;
}
var uplcode =function(id){
	if(document.getElementById(id)){
		document.getElementById(id).src += "?new=" + Math.random();
	}
}