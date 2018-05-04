<%--
  Created by IntelliJ IDEA.
  User: lu
  Date: 18-3-9
  Time: 上午10:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="dream" uri="http://dream.com/common/"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>梦的6次方</title>

<!-- Bootstrap Core CSS -->
<link href="../../assets/css/bootstrap.min.css" rel="stylesheet">

<!-- MetisMenu CSS -->
<link href="../../assets/css/metisMenu.min.css" rel="stylesheet">

<!-- DataTables CSS -->
<link href="../../assets/css/dataTables.bootstrap.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="../../assets/css/sb-admin-2.css" rel="stylesheet">

<!-- Custom Fonts -->
<link href="../../assets/css/font-awesome.min.css" rel="stylesheet"
    type="text/css">
<link href="../../assets/css/boot-crm.css" rel="stylesheet"
    type="text/css">
<link href="../../assets/css/bootstrap-datetimepicker.min.css" rel="stylesheet"
    type="text/css">
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation"
            style="margin-bottom: 0">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span> <span
                    class="icon-bar"></span> <span class="icon-bar"></span> <span
                    class="icon-bar"></span>
            </button>
            
            <a class="navbar-brand" href="list.action">电影后台管理系统</a>
        </div>

            <ul class="nav navbar-top-links navbar-right">
                <li class="dropdown"><a class="dropdown-toggle"
                                        data-toggle="dropdown" href="#"> <i class="fa fa-user fa-fw"></i>
                    <i class="fa fa-caret-down"></i>
                </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="/logout"><i class="fa fa-sign-out fa-fw"></i>
                            退出登录</a></li>
                    </ul> <!-- /.dropdown-user --></li>
                <!-- /.dropdown -->
            </ul>

        <div class="navbar-default sidebar" role="navigation">
            <div class="sidebar-nav navbar-collapse">
                <ul class="nav" id="side-menu">
                    <li>
                        <a href="/movie/list" ><i class="fa fa-edit fa-fw"></i> 电影管理</a>
                    </li>
                    <li>
                        <a href="/user/list"><i class="fa fa-edit fa-fw"></i> 用户管理</a>
                    </li>
                <shiro:hasRole name="admin">
                    <li>
                        <a href="list.action" class="active"><i class="fa fa-edit fa-fw"></i> 管理员管理</a>
                    </li>
                </shiro:hasRole>
                </ul>
            </div>
            <!-- /.sidebar-collapse -->
        </div>
        <!-- /.navbar-static-side --> </nav>
        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">管理员管理</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="panel panel-default">
                <div class="panel-body">

                    <form class="form-inline" action="${pageContext.request.contextPath }/admin/list.action" method="post">
                        <div class="form-group">
                            <label for="adminname">用户名</label>
                            <input type="text" class="form-control" id="adminname" value="${ adminname }" name="adminname">
                        </div>

                        <button type="submit" class="btn btn-primary">查询</button>
                        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#adminAddDialog" >添加管理员</a>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">管理员管理信息</div>
                        <!-- /.panel-heading -->
                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>管理员Id</th>
                                    <th>管理员名字</th>
                                    <th>管理员密码</th>
                                    <th>角色</th>
                                </tr>
                            </thead>
                            <tbody align="center">
                            <c:forEach items="${page.rows}" var="row">
                                <tr>
                                    <td>${row.adminid}</td>
                                    <td>${row.adminname}</td>
                                    <td>${row.adminpassword}</td>
                                    <td>${row.role}</td>
                                    <td>
                                        <a href="#" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#adminEditDialog" onclick="editAdmin(${row.adminid})">修改</a>
                                        <a href="#" class="btn btn-danger btn-xs" onclick="deleteAdmin(${row.adminid})">删除</a>
                                    </td>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                        <div class="col-md-12 text-right">
                            <dream:page url="${pageContext.request.contextPath }/admin/list.action" />
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
        </div>
    </div>
            

    <!-- 管理员编辑对话框 -->
    <div class="modal fade" id="adminEditDialog" tabindex="-1" role="dialog"
        aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">修改管理员信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" id="edit_admin_form">
                        <input type="hidden" id="edit_adminid" name="adminid"/>
                        <div class="form-group">
                            <label for="edit_adminname" class="col-sm-2 control-label">管理员名</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="edit_adminname" placeholder="长度需介于6-12之间"" name="adminname">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit_adminpassword" class="col-sm-2 control-label">管理员密码</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="edit_adminpassword" placeholder="度需介于6-12之间" name="adminpassword">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="edit_role" class="col-sm-2 control-label">角色</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="edit_role" placeholder="角色" name="role">
                            </div>
                        </div>

                        <input type="hidden" id="edit_start" name="start"/>
                        <input type="hidden" id="edit_rows" name="rows"/>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" onclick="UPDATEADMIN.update()">保存修改</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /#wrapper -->

    <!-- 管理员添加对话框 -->
    <div class="modal fade" id="adminAddDialog" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="add_myModalLabel">添加管理员</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" id="add_admin_form">
                        <input type="hidden" id="add_adminid" name="adminid"/>
                        <div class="form-group">
                            <label for="add_adminName" class="col-sm-2 control-label">账号</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="add_adminName" placeholder="长度需介于6-12之间" name="adminname">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="add_adminPassword" class="col-sm-2 control-label">密码</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="add_adminPassword" placeholder="长度需介于6-12之间" name="adminpassword">
                            </div>
                        </div>
                        <input type="hidden" id="add_start" name="start"/>
                        <input type="hidden" id="add_rows" name="rows"/>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" onclick="ADDADMIN.add()">确认添加</button>
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="<%=basePath%>js/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="<%=basePath%>js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="<%=basePath%>js/metisMenu.min.js"></script>

    <!-- DataTables JavaScript -->
    <script src="<%=basePath%>js/jquery.dataTables.min.js"></script>
    <script src="<%=basePath%>js/dataTables.bootstrap.min.js"></script>

    <%--Datetimepicker Javascript--%>
    <script src="<%=basePath%>js/bootstrap-datetimepicker.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="<%=basePath%>js/sb-admin-2.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/common.js"></script>
    
    <script type="text/javascript">

        //日期插件
        $(".form_datetime").datetimepicker({
            format: 'yyyy-mm-dd',//显示格式
            todayHighlight: 1,//今天高亮
            minView: "month",//设置只显示到月份
            startView:2,
            forceParse: 0,
            showMeridian: 1,
            autoclose: 1//选择后自动关闭
        });

        function editAdmin(id) {
            $.ajax({
                type:"get",
                url:"<%=basePath%>admin/edit.action",
                data:{"id":id},
                success:function(data) {   // Movie的JSON字符串传过来就行
                    $("#edit_adminid").val(data.adminid);
                    $("#edit_adminname").val(data.adminname);
                    $("#edit_adminpassword").val(data.adminpassword);
                    $("#edit_role").val(data.role);
                }
            });
        }

        var ADDADMIN = {
            checkInput: function () {
                if (!$("#add_adminName").val()) {
                    alert("请输入账号！");
                    return false;
                }
                if ($("#add_adminName").val().length<6 || $("#add_adminName").val().length>12) {
                    alert("账号的长度必须介于6-12之间！");
                    return false;
                }
                if (!$("#add_adminPassword").val()) {
                    alert("请输入密码！");
                    return false;
                }
                if ($("#add_adminPassword").val().length<6 || $("#add_adminPassword").val().length>12) {
                    alert("密码的长度必须介于6-12之间！");
                    return false;
                }
                return true;
            },
            add: function () {
                if (this.checkInput()) {
                    this.addAdmin();
                }
            },
            addAdmin: function () {
                $.post("/admin/add.action", $("#add_admin_form").serialize(), function (data) {
                    alert("管理员信息添加成功！");
                    window.location.reload();
                });
            }
        };


        var UPDATEADMIN = {
            checkInput: function () {
                if (!$("#edit_adminname").val()) {
                    alert("请输入账号！");
                    return false;
                }
                if ($("#edit_adminname").val().length < 6 || $("#edit_adminname").val().length > 12) {
                    alert("账号的长度必须介于6-12之间！");
                    return false;
                }
                if (!$("#edit_adminpassword").val()) {
                    alert("请输入密码！");
                    return false;
                }
                if ($("#edit_adminpassword").val().length < 6 || $("#edit_adminpassword").val().length > 12) {
                    alert("密码的长度必须介于6-12之间！");
                    return false;
                }
                if (!$("#edit_role").val()) {
                    alert("请输入角色，1为普通管理员，0为超级管理员！");
                    return false;
                }
                return true;
            },
            update: function () {
                if (this.checkInput()) {
                    this.updateAdmin();
                }
            },
            updateAdmin: function () {
                $.post("/admin/update.action", $("#edit_admin_form").serialize(), function (data) {
                    alert("管理员信息更新成功！");
                    window.location.reload();
                });
            }
        };
        
        function deleteAdmin(id) {
            if(confirm('确实要删除该管理员吗?')) {
                $.post("<%=basePath%>admin/delete.action",{"id":id},function(data){
                    alert("管理员删除成功！");
                    window.location.reload();
                });
            }
        }
    </script>

</body>

</html>
