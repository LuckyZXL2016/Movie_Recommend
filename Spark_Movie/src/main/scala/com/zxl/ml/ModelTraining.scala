package com.zxl.ml

import com.zxl.conf.AppConf
import org.apache.spark.mllib.recommendation.{ALS, Rating}

/**
  * 训练多个模型，取其中最好，即取RMSE(均方根误差)值最小的模型
  * Created by ZXL on 2018/3/4.
  */
object ModelTraining extends AppConf {
  def main(args: Array[String]) {
    // 训练集，总数据集的60%
    val trainingData = hc.sql("select * from trainingData")
    // 测试集，总数据集的40%
    val testData = hc.sql("select * from testData")
    // 训练集，转为Rating格式
    val ratingRDD = hc.sql("select * from trainingData").rdd.map(x => Rating(x.getInt(0), x.getInt(1), x.getDouble(2)))
    // 用于计算模型的RMSE
    val training2 = ratingRDD.map{
      case Rating(userid, movieid, rating) => (userid, movieid)
    }
    // 测试集，转为Rating格式
    val testRDD = testData.rdd.map(x => Rating(x.getInt(0), x.getInt(1), x.getDouble(2)))
    val test2 = testRDD.map {case Rating(userid, movieid, rating) => ((userid, movieid), rating)}

    // 特征向量的个数
    val rank = 1
    // 正则因子
    // val lambda = List(0.001, 0.005, 0.01, 0.015)
    val lambda = List(0.001, 0.005, 0.01)
    // 迭代次数
    val iteration = List(10, 20, 30)
    var bestRMSE = Double.MaxValue
    var bestIteration = 0
    var bestLambda = 0.0

    // persist可以根据情况设置其缓存级别
    ratingRDD.persist()
    training2.persist()
    test2.persist()
    for (l <- lambda; i <- iteration) {
      val model = ALS.train(ratingRDD, rank, i, l)
      val predict = model.predict(training2).map{
        // 根据(userid, movieid)预测出相对应的rating
        case Rating(userid, movieid, rating) => ((userid, movieid), rating)
      }
      // 根据(userid, movieid)为key，将提供的rating与预测的rating进行比较
      val predictAndFact = predict.join(test2)
      // 计算RMSE(均方根误差)
      val MSE = predictAndFact.map{
        case((user, product), (r1, r2)) =>
          val err = r1 - r2
          err * err
      }.mean()
      val RMSE = math.sqrt(MSE)
      // RMSE越小，代表模型越精确
      if(RMSE < bestRMSE) {
        model.save(sc, s"/tmp/BestModel/$RMSE")
        bestRMSE = RMSE
        bestIteration = i
        bestLambda = l
      }
      println(s"Best model is located in /tmp/BestModel/$RMSE")
      println(s"Best RMSE is $bestRMSE")
      println(s"Best Iteration is $bestIteration")
      println(s"Best Lambda is $bestLambda")
    }
  }
}
