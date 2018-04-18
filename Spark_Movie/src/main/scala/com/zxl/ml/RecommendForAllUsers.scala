package com.zxl.ml

import com.zxl.caseclass.Result
import com.zxl.conf.AppConf
import org.apache.spark.SparkContext
import org.apache.spark.mllib.recommendation.{Rating, MatrixFactorizationModel}
import org.apache.spark.sql.{SaveMode, SQLContext}
import org.apache.phoenix.spark._

/**
  * 实现为所有用户推荐
  * 集群中提交这个main进行运行时，需要通过--jars来把mysql的驱动jar包所在的路径添加到classpath
  *       spark-submit --class com.zxl.ml.RecommendForAllUsers --jars lib/mysql-connector-java-5.1.35-bin.jar lib/Spark_Movie.jar
  * 按照pom.xml中指定的版本，安装hbase1.2.6以及phoenix4.9
  * 如果需要写入到Phoenix,则也需要添加一些相关的jar包添加到classpath
  * Created by ZXL on 2018/3/6.
  */
object RecommendForAllUsers extends AppConf {
  def main(args: Array[String]) {
    val users = hc.sql("select distinct(userId) from trainingData order by userId asc")
    val allusers = users.rdd.map(_.getInt(0)).toLocalIterator

    // 方法1，可行，但是效率不高，一条条取
    val modelpath = "hdfs://spark1:9000/tmp/BestModel/0.5295311925919642"
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

    // 把推荐结果写入到phoenix+hbase,通过DF操作，不推荐。
    val hbaseConnectionString = "localhost"
    val userTupleRDD = users.rdd.map { x => Tuple3(x.getInt(0), x.getInt(1), x.getDouble(2)) }
    // zkUrl需要按照hbase配置的zookeeper的url来设置，本地模式就写localhost
    userTupleRDD.saveToPhoenix("NGINXLOG_P", Seq("USERID", "MOVIEID", "RATING"), zkUrl = Some(hbaseConnectionString))

    // 把推荐结果写入到phoenix+hbase,通过DF操作，不推荐。
    def writeRecResultToHbase(uid: Array[Rating], sqlContext: SQLContext, sc: SparkContext) {
      val uidString = uid.map(x => x.user.toString() + "|"
        + x.product.toString() + "|" + x.rating.toString())
      import sqlContext.implicits._
      val uidDF = sc.parallelize(uidString).map(_.split("|")).map(x => Result(x(0).trim().toInt, x(1).trim.toInt, x(2).trim().toDouble)).toDF
      // zkUrl需要按照hbase配置的zookeeper的url来设置
      uidDF.save("org.apache.phoenix.spark", SaveMode.Overwrite, Map("table" -> "phoenix_rec", "zkUrl" -> "localhost:2181"))
    }
  }
}
