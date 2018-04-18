<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="../../assets/css/style-login.css" rel="stylesheet" type="text/css"/>
    <link href="../../assets/css/bootstrap.css" rel="stylesheet">
    <!--external css-->

    <!-- Custom styles for this template -->
    <link href="../../assets/css/style.css" rel="stylesheet">
    <script src="../../assets/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../../assets/js/jquery-ui-1.9.2.custom.min.js" type="text/javascript"></script>
    <script src="../../assets/js/star-rating.min.js" type="text/javascript"></script>
    <script src="../../assets/js/jquery.js" type="text/javascript"></script>

    <title>梦的6次方</title>
</head>
<body>

<div class="container" style="margin-top: 10%">
    <div class="row">
        <div class="col-md-offset-3 col-md-6">
            <form class="form-horizontal" id="logForm_mod">
                <span class="heading">管理员登录</span>
                <div class="form-group">
                    <input type="text" class="form-control" id="loginAdminname" placeholder="账号" name="adminname">
                    <i class="fa fa-user"></i>
                </div>
                <div class="form-group help">
                    <input type="password" class="form-control" id="loginAdminpassword" placeholder="密　码" name="adminpassword">
                    <i class="fa fa-lock"></i>
                    <a href="#" class="fa fa-question-circle"></a>
                </div>
                <div class="form-group">
                    <button  id="login" type="button" class="btn btn-default" onclick="ADMINLOGIN.login()">登录</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script type="text/javascript">
    var ADMINLOGIN = {
        checkInput:function() {

            if(!$("#loginAdminname").val()) {
                alert("请输入账号！");
                return false;
            }
            if(!$("#loginAdminpassword").val()) {
                alert("请输入密码！");
                return false;
            }
            return true;
        },
        doLogin:function() {
            $.post("/login", $("#logForm_mod").serialize(),function(data){
                if (data.status == 200) {
                    alert("登录成功！");
                    location.href="/movie";
                } else {
                    alert("登录失败，原因是：" + data.msg);
                }
            });
        },
        login:function() {
            if (this.checkInput()) {
                this.doLogin();
            }
        }

    };
</script>
</body>
</html>