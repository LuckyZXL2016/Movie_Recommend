package com.zxl.conf

import java.util.Properties

import org.apache.spark.sql.SQLContext
import org.apache.spark.sql.hive.HiveContext
import org.apache.spark.{SparkContext, SparkConf}

/**
  * 用于创建spark程序入口，供其他程序继承
  * Created by ZXL on 2018/3/4.
  */
trait AppConf {
  val localClusterURL = "local[2]"
  val clusterMasterURL = "spark://movie1:7077"
  val conf = new SparkConf().setMaster(clusterMasterURL)
  val sc = new SparkContext(conf)
  val sqlContext = new SQLContext(sc)
  val hc = new HiveContext(sc)

  //jdbc连接
  val jdbcURL = "jdbc:mysql://movie2:3306/recommend?useUnicode=true&characterEncoding=utf-8"
  val alsTable = "recommend.alsTab"
  val recResultTable = "recommend.similarTab"
  val top5Table = "recommend.top5Result"
  val userTable= "recommend.user"
  val ratingTable= "recommend.rating"
  val mysqlusername = "root"
  val mysqlpassword = "1234"
  val prop = new Properties
  prop.put("driver", "com.mysql.jdbc.Driver")
  prop.put("user", mysqlusername)
  prop.put("password", mysqlpassword)
}
