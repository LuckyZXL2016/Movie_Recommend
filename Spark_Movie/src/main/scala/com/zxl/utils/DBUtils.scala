package com.zxl.utils

import java.sql.{Connection, DriverManager}


/**
  * 数据库连接文件
  * Created by ZXL on 2018/3/18.
  */
object DBUtils {
  val url = "jdbc:mysql://movie2:3306/recommend?useUnicode=true&characterEncoding=utf-8"
  val username = "root"
  val password = "88888888"

  classOf[com.mysql.jdbc.Driver]

  def getConnection(): Connection = {
    DriverManager.getConnection(url, username, password)
  }

  def close(conn: Connection): Unit = {
    try{
      if(!conn.isClosed() || conn != null){
        conn.close()
      }
    }
    catch {
      case ex: Exception => {
        ex.printStackTrace()
      }
    }
  }
}
