package com.zxl.datacleaner

import org.apache.spark.sql.{SaveMode, SQLContext}
import org.apache.spark.sql.hive._
import org.apache.spark.{SparkContext, SparkConf}

import com.zxl.caseclass._

/**
  * 用于原始数据的清洗
  * Created by ZXL on 2018/2/6.
  */
object ETL {
  def main(args: Array[String]) {
    val localClusterURL = "local[2]"
    val clusterMasterURL = "spark://spark1:7077"
    val conf = new SparkConf().setAppName("ETL").setMaster(clusterMasterURL)
    val sc = new SparkContext(conf)
    val sqlContext = new SQLContext(sc)
    val hc = new HiveContext(sc)
    import sqlContext.implicits._

    // 设置RDD的partition的数量一般以集群分配给应用的CPU核数的整数倍为宜。
    val minPartitions = 8
    // spark-submit --class com.zxl.datacleaner.ETL lib/Spark_Movie.jar
    // 通过case class来定义Links的数据结构，数据的schema，适用于schama已知的数据
    // 也可以通过StructType的方式，适用于schema未知的数据，具体参考文档：
    //    http://spark.apache.org/docs/1.6.2/sql-programming-guide.html#programmatically-specifying-the-schema
    val links = sc.textFile("hdfs://spark1:9000/movie/data/links.txt", minPartitions).filter { !_.endsWith(",") } //e
      .map(_.split(",")).map(x => Links(x(0).trim.toInt, x(1).trim.toInt, x(2).trim().toInt)).toDF()

    val movies = sc.textFile("hdfs://spark1:9000/movie/data/movies.txt", minPartitions).filter { !_.endsWith(",") }
      .map(_.split(",")).map(x => Movies(x(0).trim().toInt, x(1).trim(), x(2).trim())).toDF()

    val ratings = sc.textFile("hdfs://spark1:9000/movie/data/ratings.txt", minPartitions).filter { !_.endsWith(",") }
      .map(_.split(",")).map(x => Ratings(x(0).trim().toInt, x(1).trim().toInt, x(2).trim().toDouble, x(3).trim().toInt)).toDF()

    val tags = sc.textFile("hdfs://spark1:9000/movie/data/tags.txt", minPartitions).filter { !_.endsWith(",") }.map(x=>rebuild(x)).map(_.split(",")).map(x => Tags(x(0).trim().toInt, x(1).trim().toInt, x(2).trim(), x(3).trim().toInt)).toDF()


    // 通过数据写入到HDFS，将表存到hive中
    // links
    links.write.mode(SaveMode.Overwrite).parquet("/tmp/links")
    hc.sql("drop table if exists links")
    hc.sql("create table if not exists links(movieId int,imdbId int,tmdbId int) stored as parquet")
    hc.sql("load data inpath '/tmp/links' overwrite into table links")

    //movies
    movies.write.mode(SaveMode.Overwrite).parquet("/tmp/movies")
    hc.sql("drop table if exists movies")
    hc.sql("create table if not exists movies(movieId int,title string,genres string) stored as parquet")
    hc.sql("load data inpath '/tmp/movies' overwrite into table movies")

    //ratings
    ratings.write.mode(SaveMode.Overwrite).parquet("/tmp/ratings")
    hc.sql("drop table if exists ratings")
    hc.sql("create table if not exists ratings(userId int,movieId int,rating double,timestamp int) stored as parquet")
    hc.sql("load data inpath '/tmp/ratings' overwrite into table ratings")

    //tags
    tags.write.mode(SaveMode.Overwrite).parquet("/tmp/tags")
    hc.sql("drop table if exists tags")
    hc.sql("create table if not exists tags(userId int,movieId int,tag string,timestamp int) stored as parquet")
    hc.sql("load data inpath '/tmp/tags' overwrite into table tags")

  }

  // tags中大部分数据格式如下：
  //    4208,260,Action-packed,1438012536
  // 但会出现如下的数据：
  //    4208,260,"Family,Action-packed",1438012562
  // 这样对数据split后插入hive中就会出错,需清洗数据：
  //    4208,260,"Family,Action-packed",1438012562 => 4208,260,FamilyAction-packed,1438012562
  private def rebuild(input:String):String = {
    val a = input.split(",")
    val head = a.take(2).mkString(",")
    val tail = a.takeRight(1).mkString
    val b = a.drop(2).dropRight(1).mkString.replace("\"", "")
    val output = head + "," + b + "," + tail
    output
  }
}
