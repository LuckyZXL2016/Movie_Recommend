var uname;

function getUserName(loginName){
	      uname = $("#fm1 input[name='username']");
			$.ajax({
				url:'https://passport.e3mall.cn/ajax/Ydajax?nickname='+loginName,
				dataType : "jsonp",//数据类型为jsonp  
				async : false,
				jsonp:"callback",
		      success: function(data){
		       	uname.val(data.username);
		       	document.getElementById('fm1').submit();
		       },
	      error:function(){
	   	  document.getElementById('fm1').submit();
           
      	}
	});
	}
function getExpUserName(loginName){
		uname = $("#fm3 input[name='username']");
             $.ajax({
                url:'https://i.sf-express.com/service/cas/jsonp/getMemNoByLoginName?nickname='+loginName,
				dataType : "jsonp",//数据类型为jsonp  
				async : false,
				jsonp:"callback",
			success: function(data){
	       	uname.val(data.username);
	       	document.getElementById('fm3').submit();
       },
	      error:function(){
	   	  document.getElementById('fm3').submit();
           
      }
                });
     }