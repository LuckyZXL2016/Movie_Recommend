package com.local.utils

import org.apache.spark.sql.{DataFrame, SaveMode}

/**
  * Created by Hero on 2018/3/1.
  */
object ToMySQLUtils {
  def toMySQL(df:DataFrame,tableName:String,saveMode: SaveMode): Unit ={
    //df.registerTempTable(tableName)

    val prop=new java.util.Properties
    prop.setProperty("user","root")
    prop.setProperty("password","88888888")

    df.write.mode(saveMode).jdbc("jdbc:mysql://localhost:3306/movie",tableName,prop)
  }
}
