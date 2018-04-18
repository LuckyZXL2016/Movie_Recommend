package com.local.datacleaner

import com.local.caseclass.ShowMovie
import com.local.conf.AppConf
import com.local.utils.ToMySQLUtils
import org.apache.spark.sql.SaveMode

/**
  * Created by ZXL on 2018/3/8.
  */
object ShowMovieETL extends AppConf{
  def main(args: Array[String]) {
  /*  val rdd=sc.textFile("data/training.dat").map(line=>{
      val fields=line.split("\t")
    })*/

    val movieIds=sc.textFile("data/training.dat").map(line=>{
      val fields=line.split("\t")
      ShowMovie(fields(1).toInt)
    }).distinct()


    import sqlContext.implicits._
    val movieIdsDF=movieIds.toDF()

    ToMySQLUtils.toMySQL(movieIdsDF,"show_movies",SaveMode.Append)
  }
}
