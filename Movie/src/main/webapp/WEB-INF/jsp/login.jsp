<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>Login</title>
    <link rel="SHORTCUT ICON" href="/assets/img/knowU.ico"/>
    <!-- CSS -->
    <link href="/assets/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/regandlogcommon.css">
    <script src="/assets/js/jquery.js"></script>
    <script src="/assets/js/bootstrap.min.js"></script>
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <![endif]-->
</head>

<body>

<div class="page-container">
    <h1 style="color: white">Login</h1>
    <form id="logForm_mod">
        <span style="color: white" class="glyphicon glyphicon-user"></span>
        <input type="text" name="username" id="loginUsername" placeholder="用户名" required="required">
        <span style="color: white" class="glyphicon glyphicon-asterisk"></span>
        <input type="password" name="password" id="loginPassword" placeholder="密　码" required="required">
        <button type="button" id="login" onclick="LOGIN.login()">登录</button>
        <button type="button" id="register" style="background-color: #00b4ef">注册</button>
    </form>
</div>

<!-- 登录按钮事件-->

<script type="text/javascript">
    var LOGIN = {
        checkInput: function () {

            if (!$("#loginUsername").val()) {
                alert("请输入登录名！");
                return false;
            }
            if ($("#loginUsername").val() && !$("#loginPassword").val()) {
                alert("请输入密码！");
                return false;
            }
            return true;
        },
        doLogin: function () {
            $.post("/customer/login", $("#logForm_mod").serialize(), function (data) {
                if (data.status == 200) {
                    alert("登录成功！");
                    location.href = "/"
                } else {
                    alert("登录失败，原因是：" + data.msg);
                }
            });
        },
        login: function () {
            if (this.checkInput()) {
                this.doLogin();
            }
        }

    };
</script>

<!-- 注册按钮事件-->

<script type="text/javascript">
    $('#register').click(function () {

        location.href="/page/register"
    })
</script>

<!-- 背景轮播js -->

<script type="text/javascript">
    var curIndex = 0;
    //时间间隔(单位毫秒)，每秒钟显示一张，数组共有3张图片放在img文件夹下
    var timeInterval = 2000;
    //定义一个存放照片位置的数组，可以放任意个，在这里放3个
    var arr = new Array();
    arr[0] = "/assets/img/loginimg/1.jpg";
    arr[1] = "/assets/img/loginimg/2.jpg";
    arr[2] = "/assets/img/loginimg/3.jpg";
    setInterval(changeImg, timeInterval);
    function changeImg() {
        if (curIndex == arr.length - 1) {
            curIndex = 0;
        } else {
            curIndex += 1;
        }
        //设置body的背景图片

        document.body.style.backgroundImage = "URL(" + arr[curIndex] + ")";  //显示对应的图片
    }
</script>
</body>
</html>

