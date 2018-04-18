package com.zxl.datacleaner

import com.zxl.caseclass.{UserRating, Users}
import com.zxl.conf.AppConf
import com.zxl.datacleaner.UserETL._
import org.apache.spark.sql.SaveMode

/**
  * Created by ZXL on 2018/3/18.
  */
object RatingETL extends AppConf {

  def main(args: Array[String]) {

    import sqlContext.implicits._

    // 2 读取样本数据
    val data_path = "hdfs://movie1:9000/movie/data/ratings.txt"
    val data = sc.textFile(data_path, 8)
    val userdata = data.map(_.split(",")).map(f => UserRating(f(0).toInt,f(1).toInt,f(2).toDouble)).cache()

    val userDF = userdata.toDF()
    // 存储结果至数据库
    userDF.write.mode(SaveMode.Append).jdbc(jdbcURL, ratingTable, prop)
  }
}
