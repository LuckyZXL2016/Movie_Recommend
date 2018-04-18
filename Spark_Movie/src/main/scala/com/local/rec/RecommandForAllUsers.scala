package com.local.rec

import java.io.{File, PrintWriter}

import com.local.caseclass.Result1
import com.local.conf.AppConf
import com.local.utils.ToMySQLUtils

//import com.southeast.caseclass.Result
import org.apache.spark.mllib.recommendation.MatrixFactorizationModel
import org.apache.spark.sql.SaveMode

/**
  * Created by ZXL on 2018/3/2.
  */
object RecommandForAllUsers extends AppConf {
  def main(args: Array[String]) {
    val modelpath = "model/"
    val model = MatrixFactorizationModel.load(sc, modelpath)

    //读取ratings.txt文件，获取所有的uerId
    val uIds = sc.textFile("data/ratings.dat").map(line => {
      val fields = line.split("\t")
      fields(0).toInt
    }).distinct().toLocalIterator

    while (uIds.hasNext) {
      val uid = uIds.next()
      val rec = model.recommendProducts(uid, 5)


      val result = rec.map(x => x.user.toString() + "|"
        + x.product.toString() + "|" + x.rating.toString())

      import sqlContext.implicits._
      val resultDFArray = sc.parallelize(result)

      val res=resultDFArray.map(line=>{
        val fields=line.split("\\|")
        (fields(0).toInt,fields(1))
      })

      val result1DF=res.reduceByKey((a,b)=>(a+","+b)).map(line=>{
        Result1(line._1.toInt,line._2.trim().toString)
      }).toDF

      ToMySQLUtils.toMySQL(result1DF, "rec_movie", SaveMode.Append)
    }
  }
}
