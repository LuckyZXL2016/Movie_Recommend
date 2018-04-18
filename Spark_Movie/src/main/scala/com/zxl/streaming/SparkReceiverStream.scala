package com.zxl.streaming

import com.zxl.conf.AppConf
import org.apache.spark.storage.StorageLevel
import org.apache.spark.streaming.kafka.KafkaUtils
import org.apache.spark.streaming.{StreamingContext, Duration}

/**
  * Created by ZXL on 2018/3/11.
  */
object SparkReceiverStream extends AppConf {
  def main(args: Array[String]) {
    val batchDuration = new Duration(5)
    val ssc = new StreamingContext(sc, batchDuration)
    val validusers = hc.sql("select * from trainingData")

    val modelpath = "/tmp/BestModel/0.5295311925919642"
    val broker = "spark1:9092"
    val topics = Map("movie" -> 1)
    val kafkaParams = Map("broker" -> "spark1:9092")
    val zkQuorum = "spark1:9092"
    val groupId = 1
    val storageLevel = StorageLevel.MEMORY_ONLY
    // 创建SparkStreaming接收kafka消息队列数据的第2种方式
    // Receiver base approach,这种方式是把sparkstreaming当作一个consumer来消费kafka中的消息，
    // 可以通过启用WAL的方式来把这个stream做成强一致性.push的方式
    val kafkaStream = KafkaUtils.createStream(ssc, zkQuorum, "1", topics, storageLevel)
  }
}
