package com.zxl.ml

import java.util.Properties

import com.zxl.caseclass.Result
import com.zxl.conf.AppConf
import org.apache.phoenix.spark._
import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.mllib.recommendation.{MatrixFactorizationModel, Rating}
import org.apache.spark.sql.{SQLContext, SaveMode}

/**
  * 实现为所有用户推荐
  * 集群中提交这个main进行运行时，需要通过--jars来把mysql的驱动jar包所在的路径添加到classpath
  *       spark-submit --class com.zxl.ml.RecommendForAllUsers --jars lib/mysql-connector-java-5.1.35-bin.jar lib/Spark_Movie.jar
  * 按照pom.xml中指定的版本，安装hbase1.2.6以及phoenix4.9
  * 如果需要写入到Phoenix,则也需要添加一些相关的jar包添加到classpath
  * Created by ZXL on 2018/3/6.
  */
object RecommendForAllUsers2 {
  def main(args: Array[String]) {

    val conf = new SparkConf().setMaster("local[2]").setAppName("RecommendForAllUsers2")
    val sc = new SparkContext(conf)
    val sqlContext = new SQLContext(sc)

    val jdbcURL = "jdbc:mysql://movie2:3306/recommend?useUnicode=true&characterEncoding=utf-8"
    val alsTable = "recommend.alsTab"
    val recResultTable = "recommend.similarTab"
    val top5Table = "recommend.top5Result"
    val userTable= "recommend.user"
    val ratingTable= "recommend.rating"
    val mysqlusername = "root"
    val mysqlpassword = "1234"
    val prop = new Properties
    prop.put("driver", "com.mysql.jdbc.Driver")
    prop.put("user", mysqlusername)
    prop.put("password", mysqlpassword)

    val users = sqlContext.read.jdbc(jdbcURL, "user_mv", prop).dropDuplicates(Seq("userId"))
    val allusers = users.rdd.map(_.getInt(0)).toLocalIterator

    // 方法1，可行，但是效率不高，一条条取
    val modelpath = "model1"
    val model = MatrixFactorizationModel.load(sc, modelpath)
    while (allusers.hasNext) {
      val rec = model.recommendProducts(allusers.next(), 5)
      writeRecResultToMysql(rec, sqlContext, sc)
      // writeRecResultToSparkSQL(rec)，写入到SPARK-SQL(DataFrame)+hive，同ETL。
      // writeRecResultToHbase(rec, sqlContext, sc)
    }

    // 方法2，不可行，因为一次将矩阵表全部加载到内存，消耗资源太大
    // val recResult = model.recommendProductsForUsers(5)

    def writeRecResultToMysql(uid: Array[Rating], sqlContext: SQLContext, sc: SparkContext) {
      val uidString = uid.map(x => x.user.toString() + ","
        + x.product.toString() + "," + x.rating.toString())

      import sqlContext.implicits._
      val uidDFArray = sc.parallelize(uidString)
      val uidDF = uidDFArray.map(_.split(",")).map(x => Result(x(0).trim().toInt, x(1).trim.toInt, x(2).trim().toDouble)).toDF
      // 写入mysql数据库，数据库配置在 AppConf中
      uidDF.write.mode(SaveMode.Append).jdbc(jdbcURL, alsTable, prop)
    }

  }
}
