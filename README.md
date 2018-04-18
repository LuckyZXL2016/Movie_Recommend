# 基于Spark的电影推荐系统

本次项目是基于大数据过滤引擎的电影推荐系统--“懂你”电影网站，包含了爬虫、电影网站（前端和后端）、后台管理系统以及推荐系统（Spark）。

![image](https://github.com/ZzXxL1994/Movie_Recommend/blob/master/zxl_picture/introduce.png)


## 一、爬虫
**开发环境：** pycharm + python3.6

**软件架构：** mysql + scrapy

**项目架构：**

![image](https://github.com/ZzXxL1994/Movie_Recommend/blob/master/zxl_picture/scrapy.png)


## 二、电影网站
**开发环境：** IntelliJ IDEA + maven + git + linux + powerdesigner

**软件架构：** mysql + mybatis + spring + springmvc

**项目描述：** 懂你电影推荐网站是一个基于SSM框架的web项目，类似当前比较流行的豆瓣。用户可以在网站上浏览电影信息和查询电影，并且网站会根据用户的浏览记录给用户进行实时的电影推荐。现已将网站部署在 http://101.132.123.55 网站上，感兴趣的朋友可以自行查看。Git的安装与IDEA和github的集成可以参考[博客](https://blog.csdn.net/u011254180/article/details/79857684).

**项目架构：**

![image](https://github.com/ZzXxL1994/Movie_Recommend/blob/master/zxl_picture/ssm.png)

![image](https://github.com/ZzXxL1994/Movie_Recommend/blob/master/zxl_picture/web_1.png)


## 三、后台管理系统

**开发环境：** IntelliJ IDEA + maven + git + linux + powerdesigner

**软件架构：** mysql + mybatis + spring + springmvc + easyui

**项目描述：** 后台管理系统主要对用户信息和电影信息进行管理，如添加删除电影信息和完成用户信息的完善。其中为了更好地保存电影的图片信息，搭建了图片服务器，关于图片服务器FastDFS的搭建可参考[博客](https://blog.csdn.net/u011254180/article/details/79453775)。后台系统也布置在服务器上，感兴趣的朋友可以通过地址 http://101.132.123.55:8080/ 访问，为大家提供的测试账号为 test，密码为88888888。

**项目架构：**

![image](https://github.com/ZzXxL1994/Movie_Recommend/blob/master/zxl_picture/admin_1.png)


## 四、推荐系统（Spark）

**开发环境：** IntelliJ IDEA + maven + git + linux

**软件架构：** hadoop + zookeeper + flume + kafka + nginx + spark + hive + mysql

**项目描述：** 通过在电影网站系统埋点，获取到用户的点击事件（如用户喜欢哪部电影或对某部电影的评分）并将信息传至推荐系统，推荐系统根据该信息做出相应的处理，将推荐结果存入到mysql数据库中，web前端通过查询数据库将推荐的电影展示给用户。推荐流程如下：

![image](https://github.com/ZzXxL1994/Movie_Recommend/blob/master/zxl_picture/recommend_1.png)

**项目架构：**

![image](https://github.com/ZzXxL1994/Movie_Recommend/blob/master/zxl_picture/recommend_2.png)

**具体步骤：**
