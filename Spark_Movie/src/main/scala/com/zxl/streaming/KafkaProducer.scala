package com.zxl.streaming

import java.util.Properties

import com.zxl.conf.AppConf
import org.apache.kafka.clients.producer._

/**
  * 从数据库取出测试集的数据，使用kafka producer不断发送
  * 执行命令：
  * spark-submit --class com.zxl.streaming.KafkaProducer --total-executor-cores 2 --executor-memory 3g --jars lib/kafka-clients-0.10.1.0.jar lib/Spark_Movie.jar
  * Created by ZXL on 2018/3/8.
  */
object KafkaProducer extends AppConf {
  def main(args: Array[String]) {
    // 如果数据不加 limit限制，会出现OOM错误
    val testDF = hc.sql("select * from testData limit 10000")
    val prop = new Properties()
    // 指定kafka的 ip地址:端口号
    prop.put("bootstrap.servers", "spark1:9092")
    // 配置可以设定发送消息后是否需要Broker端返回确认，有"0"，"1"，"all"
//    prop.put("acks", "all")
//    prop.put("retries", "0")
//    prop.put("batch.size", "16384")
//    prop.put("linger.ms", "1")
//    prop.put("buffer.memory", "33554432")
    // 设定ProducerRecord发送的key值为String类型
    prop.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer")
    // 设定ProducerRecord发送的value值为String类型
    prop.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer")
    val topic = "movie"
    val testData = testDF.map(x => (topic, x.getInt(0).toString() + "," + x.getInt(1).toString + "," + x.getDouble(2).toString()))
    val producer = new KafkaProducer[String, String](prop)
    // 如果服务器内存不够，会出现OOM错误
    val messages = testData.toLocalIterator

    while (messages.hasNext) {
      val message = messages.next()
      val record = new ProducerRecord[String, String](topic, message._1, message._2)
      println(record)
      producer.send(record)
      // 延迟10毫秒
      Thread.sleep(10)
    }
    producer.close()
    // 会有序列化的问题
    //for (x <- testData) {
    //  val message = x
    //  val record = new ProducerRecord[String, String]("test", message._1, message._2)
    //  println(record)
    //  producer.send(record)
    //  Thread.sleep(1000)
    //}

    // 不用testData.map或者foreach，因为这两种方法会让你的数据做分布式计算，在计算时，处理数据是无序的。
    // testData.foreach
  }
}
