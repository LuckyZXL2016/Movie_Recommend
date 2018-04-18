package com.local.datacleaner

import com.local.conf.AppConf
import org.apache.spark.mllib.recommendation.Rating

object TrainETL extends AppConf{
  def main(args: Array[String]) {
    val ratings=sc.textFile("data/ratings.dat").map(line=>{
      val fields=line.split("\t")
      val rating=Rating(fields(0).toInt,fields(1).toInt,fields(2).toDouble)
      val timestamp=fields(3).toLong%10
      (timestamp,rating)
    })

    val training=ratings.filter(x=>x._1<6).map(x=>{
      x._2.user+"\t"+x._2.product+"\t"+x._2.rating
    })

    training.saveAsTextFile("data/training")
  }
}
