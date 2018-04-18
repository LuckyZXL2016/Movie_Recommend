package com.zxl.datacleaner

import org.apache.spark.mllib.recommendation.{ALS, Rating}
import org.apache.spark.sql.{SaveMode, SQLContext}
import org.apache.spark.sql.hive.HiveContext
import org.apache.spark.{SparkContext, SparkConf}

/**
  * 测试对数据建立模型
  * spark中提交方式：
  *   spark-submit --class com.zxl.datacleaner.RatingData lib/Spark_Movie.jar
  * Created by ZXL on 2018/2/28.
  */
object RatingData {
  def main(args: Array[String]) {
    val localClusterURL = "local[2]"
    val clusterMasterURL = "spark://spark1:7077"
    val conf = new SparkConf().setAppName("RatingData").setMaster(clusterMasterURL)
    val sc = new SparkContext(conf)
    val sqlContext = new SQLContext(sc)
    val hc = new HiveContext(sc)

    // RDD[UserRating]需要从原始表中提取userid,movieid,rating数据
    // 并把这些数据切分成训练集和测试集数据
    // 调用cache table tableName即可将一张表缓存到内存中，来极大的提高查询效率
    val ratings = hc.sql("cache table ratings")
    // 取第一行第一列元素
    val count = hc.sql("select count(*) from ratings").first().getLong(0)
    val percent = 0.6
    val trainingdatacount = (count * percent).toInt
    val testdatacount = (count * (1 - percent)).toInt

    // 用scala feature:String Interpolation来往SQL语句中传递参数
    // order by limit的时候，需要注意OOM(Out Of Memory)的问题
    // 将数据按时间升序排序
    val trainingDataAsc = hc.sql(s"select userId,movieId,rating from ratings order by timestamp asc")
    trainingDataAsc.write.mode(SaveMode.Overwrite).parquet("/tmp/trainingDataAsc")
    hc.sql("drop table if exists trainingDataAsc")
    hc.sql("create table if not exists trainingDataAsc(userId int,movieId int,rating double) stored as parquet")
    hc.sql("load data inpath '/tmp/trainingDataAsc' overwrite into table trainingDataAsc")

    // 将数据按时间降序排序
    val trainingDataDesc = hc.sql(s"select userId,movieId,rating from ratings order by timestamp desc")
    trainingDataDesc.write.mode(SaveMode.Overwrite).parquet("/tmp/trainingDataDesc")
    hc.sql("drop table if exists trainingDataDesc")
    hc.sql("create table if not exists trainingDataDesc(userId int,movieId int,rating double) stored as parquet")
    hc.sql("load data inpath '/tmp/trainingDataDesc' overwrite into table trainingDataDesc")

    // 获取60%数据进行训练模型
    val trainingData = hc.sql(s"select * from trainingDataAsc limit $trainingdatacount")
    trainingData.write.mode(SaveMode.Overwrite).parquet("/tmp/trainingData")
    hc.sql("drop table if exists trainingData")
    hc.sql("create table if not exists trainingData(userId int,movieId int,rating double) stored as parquet")
    hc.sql("load data inpath '/tmp/trainingData' overwrite into table trainingData")

    // 获取40%数据进行测试模型
    val testData = hc.sql(s"select * from trainingDataDesc limit $testdatacount")
    testData.write.mode(SaveMode.Overwrite).parquet("/tmp/testData")
    hc.sql("drop table if exists testData")
    hc.sql("create table if not exists testData(userId int,movieId int,rating double) stored as parquet")
    hc.sql("load data inpath '/tmp/testData' overwrite into table testData")

    // val ratingRDD = hc.sql("select * from trainingData").rdd.map(x => UserRating(x.getInt(0),x.getInt(1),x.getDouble(2)))

    // 测试构造模型
    // ratingRDD：数据集
    // rank：对应的是隐因子的个数，这个值设置越高越准，但是也会产生更多的计算量。一般将这个值设置为10-200
    //      隐因子：如一部电影，决定它评分的有导演、主演、特效和剧本4个隐因子
    // iterations：对应迭代次数，一般设置个10就够了；
    // lambda：该参数控制正则化过程，其值越高，正则化程度就越深。一般设置为0.01
    // val model = ALS.train(ratingRDD, 1, 10, 0.01)
  }
}
