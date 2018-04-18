package com.zxl.streaming

import kafka.serializer.StringDecoder
import org.apache.spark.SparkConf
import org.apache.spark.mllib.recommendation.MatrixFactorizationModel
import org.apache.spark.sql.hive.HiveContext
import org.apache.spark.streaming.kafka.KafkaUtils
import org.apache.spark.streaming.{StreamingContext, Duration}


/**
  * 接收kafka产生的数据，进行处理
  * Created by ZXL on 2018/3/11.
  */
object SparkDirectStream {

  def main(args: Array[String]) {
    val conf = new SparkConf().setAppName("SparkDirectStream").setMaster("spark://spark1:7077")
    // Duration对象中封装了时间的一个对象，它的单位是ms.
    val batchDuration = new Duration(5000)
    // batchDuration为时间间隔
    val ssc = new StreamingContext(conf, batchDuration)
    val hc = new HiveContext(ssc.sparkContext)
    // 训练数据中是否有该用户
    val validusers = hc.sql("select * from trainingData")
    val userlist = validusers.select("userId")

    val modelpath = "/tmp/BestModel/0.5295311925919642"
    val broker = "spark1:9092"
    println("#################################################")
    // val topics = "movie".split(",").toSet
    val topics = Set("movie")
    // val kafkaParams = Map("bootstrap.servers" -> "spark1:9092")
    val kafkaParams = Map("metadata.broker.list" -> "spark1:9092")

    def exist(u: Int): Boolean = {
      val userlist = hc.sql("select distinct(userid) from trainingdata").rdd.map(x => x.getInt(0)).toArray()
      userlist.contains(u)
    }

    // 为没有登录的用户推荐电影的策略：
    // 1.推荐观看人数较多的电影，采用这种策略
    // 2.推荐最新的电影
    val defaultrecresult = hc.sql("select * from top5DF").rdd.toLocalIterator
    println("#################################################")
    // 创建SparkStreaming接收kafka消息队列数据的2种方式
    // 一种是Direct approache,通过SparkStreaming自己主动去Kafka消息队
    // 列中查询还没有接收进来的数据，并把他们拿到sparkstreaming中。
    val kafkaDirectStream = KafkaUtils.createDirectStream[String, String, StringDecoder, StringDecoder](ssc, kafkaParams, topics)

    val model = MatrixFactorizationModel.load(ssc.sparkContext, modelpath)

    val messages = kafkaDirectStream.foreachRDD { rdd =>
      println(rdd)
      val userrdd = rdd.map(x => x._2.split(",")).map(x => x(1)).map(_.toInt)
      val validusers = userrdd.filter(user => exist(user))
      val newusers = userrdd.filter(user => !exist(user))
      // 采用迭代器的方式来避开对象不能序列化的问题。
      // 通过对RDD中的每个元素实时产生推荐结果，将结果写入到redis，或者其他高速缓存中，来达到一定的实时性。
      // 2个流的处理分成2个sparkstreaming的应用来处理。
      val validusersIter = validusers.toLocalIterator
      val newusersIter = newusers.toLocalIterator
      while (validusersIter.hasNext) {
        val recresult = model.recommendProducts(validusersIter.next, 5)
        println("below movies are recommended for you :")
        println(recresult)
      }
      while (newusersIter.hasNext) {
        println("below movies are recommended for you :")
        for (i <- defaultrecresult) {
          println(i.getString(0))
        }
      }
    }
    ssc.start()
    ssc.awaitTermination()
  }
}

