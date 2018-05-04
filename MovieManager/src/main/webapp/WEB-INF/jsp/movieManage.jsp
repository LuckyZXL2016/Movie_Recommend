<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="dream" uri="http://dream.com/common/" %>
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
                        <a href="list" class="active">
                            <i class="fa fa-edit fa-fw"></i> 电影管理
                        </a>
                    </li>
                    <li>
                        <a href="/user/list">
                            <i class="fa fa-edit fa-fw"></i> 用户管理
                        </a>
                    </li>
                    <shiro:hasRole name="admin">
                        <li>
                            <a href="adminlist"><i class="fa fa-edit fa-fw"></i> 管理员管理
                            </a>
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
                <h1 class="page-header">电影管理</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- /.row -->
        <div class="panel panel-default">
            <div class="panel-body">

                <form class="form-inline" action="${pageContext.request.contextPath }/movie/list.action" method="post">
                    <div class="form-group">
                        <label for="movieName">电影名称</label>
                        <input type="text" class="form-control" id="movieName" value="${movieName }" name="movieName">
                    </div>
                    <div class="form-group">
                        <label for="catagoryId">电影类型</label>
                        <select class="form-control" id="categoryId" placeholder="电影类型" name="categoryId">
                            <option value=0>--请选择--</option>
                            <c:forEach items="${categoryList}" var="ca">
                                <option value="${ca.categoryid}"<c:if
                                        test="${ca.categoryid == categoryId }"> selected</c:if>>${ca.category }</option>
                            </c:forEach>
                        </select>
                    </div>


                    <button type="submit" class="btn btn-primary">查询</button>
                    <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#movieAddDialog">添加电影</a>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">电影管理信息</div>
                    <!-- /.panel-heading -->
                    <table class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>电影ID</th>
                            <th>电影名称</th>
                            <th>上映年份</th>
                            <th>电影类型</th>
                            <th>导演</th>
                            <th>评分</th>
                            <th>评价人数</th>
                            <th>海报</th>
                        </tr>
                        </thead>
                        <tbody align="center">
                        <c:forEach items="${page.rows}" var="row">
                            <tr>
                                <td>${row.movieid}</td>
                                <td>${row.moviename}</td>
                                <td><fmt:formatDate type="date" value="${row.showyear}" dateStyle="default"/></td>
                                <td>${row.categoryname}</td>
                                <td>${row.director}</td>
                                <td>${row.averating}</td>
                                <td>${row.numrating}</td>
                                <td>${row.picture}</td>
                                <td>
                                    <a href="#" class="btn btn-primary btn-xs" data-toggle="modal"
                                       data-target="#movieEditDialog" onclick="editMovie(${row.movieid})">修改</a>
                                    <a href="#" class="btn btn-danger btn-xs"
                                       onclick="deleteMovie(${row.movieid})">删除</a>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                    <div class="col-md-12 text-right">
                        <dream:page url="${pageContext.request.contextPath }/movie/list.action"/>
                    </div>
                    <!-- /.panel-body -->
                </div>
                <!-- /.panel -->
            </div>
            <!-- /.col-lg-12 -->
        </div>
    </div>
</div>


<!-- 电影编辑对话框 -->
<div class="modal fade" id="movieEditDialog" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">修改电影信息</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit_movie_form">
                    <input type="hidden" id="edit_movieid" name="movieid"/>
                    <div class="form-group">
                        <label for="edit_movieName" class="col-sm-2 control-label">电影名称</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="edit_movieName" placeholder="" name="moviename">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edit_showyear" class="col-sm-2 control-label">上映年份</label>
                        <div class="col-sm-10">
                            <input class="form_datetime" type="text" id="edit_showyear" name="showyear">
                        </div>
                    </div>
                    <%--<div class="form-group">--%>
                    <%--<label for="edit_nation" class="col-sm-2 control-label">国家/地区</label>--%>
                    <%--<div class="col-sm-10">--%>
                    <%--<input type="text" class="form-control" id="edit_nation" placeholder="" name="nation">--%>
                    <%--</div>--%>
                    <%--</div>--%>
                    <div class="form-group">
                        <label for="edit_picture" class="col-sm-2 control-label">海报URL</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="edit_picture" placeholder="" name="picture">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edit_picture" class="col-sm-2 control-label">评价人数</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="edit_numrating" placeholder="" name="numrating">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edit_director" class="col-sm-2 control-label">导演</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="edit_director" placeholder="" name="director">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edit_leadactors" class="col-sm-2 control-label">主演</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="edit_leadactors" placeholder=""
                                   name="leadactors">
                        </div>
                    </div>
                    <%--<div class="form-group">--%>
                    <%--<label for="edit_screenwriter" class="col-sm-2 control-label">编剧</label>--%>
                    <%--<div class="col-sm-10">--%>
                    <%--<input type="text" class="form-control" id="edit_screenwriter" placeholder="" name="screenwriter">--%>
                    <%--</div>--%>
                    <%--</div>--%>

                    <div class="form-group">
                        <label for="edit_picture" class="col-sm-2 control-label">评分</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="edit_averating" placeholder="" name="averating">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edit_picture" class="col-sm-2 control-label">电影详情</label>
                        <div class="col-sm-10">
                            <input type="text" style="height:100%" class="form-control" id="edit_description"
                                   placeholder="" name="description">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="catagoryId" class="col-sm-2 control-label">电影类型</label>
                        <div class="col-sm-10">
                            <select multiple class="form-control" id="catagoryId" placeholder="" name="categoryId">
                                <c:forEach items="${categoryList}" var="ca">
                                    <option value="${ca.categoryid}"<c:if
                                            test="${ca.categoryid == categoryId }"> selected</c:if>>${ca.category }</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>

                    <input type="hidden" id="edit_start" name="start"/>
                    <input type="hidden" id="edit_rows" name="rows"/>
                </form>

                <form class="form-horizontal" id="edit_picture_form" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="edit_picture" class="col-sm-2 control-label">上传海报</label>
                        <div class="col-sm-10">
                            <input type="file" name="file" id="image1">
                            <a href="javascript:uploadImg1()" class="btn btn-success">上传配图</a>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="UPDATE.updateMovie()">保存修改</button>
            </div>
        </div>
    </div>
</div>
<!-- /#wrapper -->

<!-- 电影添加对话框 -->
<div class="modal fade" id="movieAddDialog" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="add_myModalLabel">添加电影</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="add_movie_form">
                    <input type="hidden" id="add_movieid" name="movieid"/>
                    <div class="form-group">
                        <label for="add_movieName" class="col-sm-2 control-label">电影名称</label>
                        <div class="col-sm-10">
                            <input type="text" required="required" class="form-control" id="add_movieName"
                                   placeholder="" name="moviename">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="add_showyear" class="col-sm-2 control-label">上映年份</label>
                        <div class="col-sm-10">
                            <input required="required" class="form_datetime" value="" type="text" id="add_showyear"
                                   name="showyear">
                        </div>
                    </div>

                    <%--<div class="form-group">--%>
                    <%--<label for="add_nation" class="col-sm-2 control-label">国家/地区</label>--%>
                    <%--<div class="col-sm-10">--%>
                    <%--<input type="text" required="required" class="form-control" id="add_nation" placeholder="" name="nation">--%>
                    <%--</div>--%>
                    <%--</div>--%>
                    <div class="form-group">
                        <label for="add_picture" class="col-sm-2 control-label">海报URL</label>
                        <div class="col-sm-10">
                            <input type="text" required="required" class="form-control" id="add_picture" placeholder=""
                                   name="picture" value="">
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="add_picture" class="col-sm-2 control-label">评价人数</label>
                        <div class="col-sm-10">
                            <input type="text" required="required" class="form-control" id="add_numrating"
                                   placeholder="" name="numrating">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="add_director" class="col-sm-2 control-label">导演</label>
                        <div class="col-sm-10">
                            <input type="text" required="required" class="form-control" id="add_director" placeholder=""
                                   name="director">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="add_leadactors" class="col-sm-2 control-label">主演</label>
                        <div class="col-sm-10">
                            <input type="text" required="required" class="form-control" id="add_leadactors"
                                   placeholder="" name="leadactors">
                        </div>
                    </div>
                    <%--<div class="form-group">--%>
                    <%--<label for="add_screenwriter" class="col-sm-2 control-label">编剧</label>--%>
                    <%--<div class="col-sm-10">--%>
                    <%--<input type="text" required="required" class="form-control" id="add_screenwriter" placeholder="" name="screenwriter">--%>
                    <%--</div>--%>
                    <%--</div>--%>

                    <div class="form-group">
                        <label for="add_picture" class="col-sm-2 control-label">评分</label>
                        <div class="col-sm-10">
                            <input type="text" required="required" class="form-control" id="add_averating"
                                   placeholder="" name="averating">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="add_picture" class="col-sm-2 control-label">电影详情</label>
                        <div class="col-sm-10">
                            <input type="text" required="required" class="form-control" id="add_description"
                                   placeholder="" name="description">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="add_catagoryId" class="col-sm-2 control-label">电影类型</label>
                        <div class="col-sm-10">
                            <select multiple required="required" class="form-control" id="add_catagoryId"
                                    placeholder="电影类型" name="categoryId">
                                <c:forEach items="${categoryList}" var="ca">
                                    <option value="${ca.categoryid}"<c:if
                                            test="${ca.categoryid == categoryId }"> selected</c:if>>${ca.category }</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>

                    <input type="hidden" id="add_start" name="start"/>
                    <input type="hidden" id="add_rows" name="rows"/>

                </form>

                <form class="form-horizontal" id="add_picture_form" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="add_picture" class="col-sm-2 control-label">上传海报</label>
                        <div class="col-sm-10">
                            <input type="file" name="file" id="image">
                            <a href="javascript:uploadImg()" class="btn btn-success">上传配图</a>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="ADDMOVIE.addMovie()">确认添加</button>
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

    var ADDMOVIE = {
        checkInput: function () {

            if (!$("#add_movieName").val()) {
                alert("请输入电影名称！");
                return false;
            }
            if (!$("#add_showyear").val()) {
                alert("请输入上映年份！");
                return false;
            }
//                if(!$("#add_nation").val()) {
//                    alert("请输入国家/地区！");
//                    return false;
//                }
            if (!$("#add_picture").val()) {
                alert("请输入海报URL！");
                return false;
            }
            if (!$("#add_numrating").val()) {
                alert("请输入评论人数！");
                return false;
            }
            if (!$("#add_director").val()) {
                alert("请输入导演！");
                return false;
            }
            if (!$("#add_leadactors").val()) {
                alert("请输入主演！");
                return false;
            }
//                if(!$("#add_screenwriter").val()) {
//                    alert("请输入编剧！");
//                    return false;
//                }
            if (!$("#add_averating").val()) {
                alert("请输入评分！");
                return false;
            }
            if (!$("#add_description").val()) {
                alert("请输入详情！");
                return false;
            }
            if (!$("#add_catagoryId").val()) {
                alert("请选择电影类型！");
                return false;
            }
            return true;
        },
        addMo: function () {
            $.post("<%=basePath%>movie/add.action", $("#add_movie_form").serialize(), function (data) {
                alert("电影信息添加成功！");
                window.location.reload();
            });
        },
        addMovie: function () {
            if (this.checkInput()) {
                this.addMo();
            }
        }
    };

    //日期插件
    $(".form_datetime").datetimepicker({
        format: 'yyyy-mm-dd',//显示格式
        todayHighlight: 1,//今天高亮
        minView: "month",//设置只显示到月份
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        autoclose: 1//选择后自动关闭
    });

    function editMovie(id) {
        $.ajax({
            type: "get",
            url: "<%=basePath%>movie/edit.action",
            data: {"id": id},
            success: function (data) {   // Movie的JSON字符串传过来就行
                $("#edit_movieid").val(data.movieid);
                $("#edit_movieName").val(data.moviename);
                $("#edit_showyear").val(data.showyear);
//					$("#edit_nation").val(data.nation);
                $("#edit_director").val(data.director);
                $("#edit_leadactors").val(data.leadactors);
//					$("#edit_screenwriter").val(data.screenwriter);
                $("#edit_picture").val(data.picture);
                $("#edit_averating").val(data.averating);
                $("#edit_numrating").val(data.numrating);
                $("#catagoryId").val(data.categoryid);
                $("#edit_description").val(data.description);
            }
        });
    }

    //上传海报配图
    function uploadImg() {
        var formData = new FormData($("#add_picture_form")[0]);
        formData.append("file", $("#image")[0]);
        formData.append("name", name);
        $.ajax({
            url: "<%=basePath%>movie/file/upload.action",
            type: "POST",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                alert("上传成功!");
                // $("#picture").attr("disabled","disabled");
                $("#add_picture").val(data.url);
            }
        });
    }

    function uploadImg1() {
        var formData = new FormData($("#edit_picture_form")[0]);
        formData.append("file", $("#image1")[0]);
        formData.append("name", name);
        $.ajax({
            url: "<%=basePath%>movie/file/upload.action",
            type: "POST",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                alert("上传成功!");
                // $("#picture").attr("disabled","disabled");
                $("#edit_picture").val(data.url);
            }
        });
    }

    var UPDATE = {
        checkInput: function () {

            if (!$("#edit_movieName").val()) {
                alert("请输入电影名称！");
                return false;
            }
            if (!$("#edit_showyear").val()) {
                alert("请输入上映年份！");
                return false;
            }
//                if(!$("#edit_nation").val()) {
//                    alert("请输入国家/地区！");
//                    return false;
//                }
            if (!$("#edit_picture").val()) {
                alert("请输入海报URL！");
                return false;
            }
            if (!$("#edit_numrating").val()) {
                alert("请输入评论人数！");
                return false;
            }
            if (!$("#edit_director").val()) {
                alert("请输入导演！");
                return false;
            }
            if (!$("#edit_leadactors").val()) {
                alert("请输入主演！");
                return false;
            }
//                if(!$("#edit_screenwriter").val()) {
//                    alert("请输入编剧！");
//                    return false;
//                }
            if (!$("#edit_averating").val()) {
                alert("请输入评分！");
                return false;
            }
            if (!$("#edit_description").val()) {
                alert("请输入详情！");
                return false;
            }
            if (!$("#catagoryId").val()) {
                alert("请选择电影类型！");
                return false;
            }
            return true;
        },
        updateMo: function () {
            $.post("<%=basePath%>movie/update.action", $("#edit_movie_form").serialize(), function (data) {
                alert("电影信息更新成功！");
                window.location.reload();
            });
        },
        updateMovie: function () {
            if (this.checkInput()) {
                this.updateMo();
            }
        }
    };

    function deleteMovie(id) {
        if (confirm('确实要删除该电影吗?')) {
            $.post("<%=basePath%>movie/delete.action", {"id": id}, function (data) {
                alert("电影信息删除成功！");
                window.location.reload();
            });
        }
    }
</script>

</body>

</html>
