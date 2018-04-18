package com.local.datacleaner

import com.local.caseclass.Ratings
import com.local.conf.AppConf
import com.local.utils.ToMySQLUtils
import org.apache.spark.sql.SaveMode

object RatingsETL extends AppConf{
  def main(args: Array[String]) {
    val ratingsRDD=sc.textFile("traindata/training.dat").map(line=>{
      val fields=line.split("\t")
      Ratings(fields(0).toInt,fields(1).toInt,fields(2).toDouble)
    })

    import sqlContext.implicits._
    val ratingsDF=ratingsRDD.toDF
    ToMySQLUtils.toMySQL(ratingsDF,"rating",SaveMode.Append)
  }
}
