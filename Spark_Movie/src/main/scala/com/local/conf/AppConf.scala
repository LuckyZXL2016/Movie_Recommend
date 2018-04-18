package com.local.conf

import com.local.utils.LoggerLevels
import org.apache.spark._
import org.apache.spark.sql._


trait AppConf {
  //去除提示信息
  LoggerLevels.setStreamingLogLevels()

  val conf=new SparkConf().setAppName("AppConf").setMaster("local")
  val sc=new SparkContext(conf)

  val sqlContext = new SQLContext(sc)
}