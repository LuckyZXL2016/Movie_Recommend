package com.zxl.ml

import com.zxl.conf.AppConf
import org.apache.spark.ml.Pipeline
import org.apache.spark.ml.recommendation.ALS

/**
  * 通过Spark.ML的包来做DF的数据做机器学习
  * 封装的是一些high-level的API。直接使用dataframe来做训练集和测试集。
  * Created by ZXL on 2018/3/11.
  */
object PipelineModel extends AppConf {
  val trainData = hc.sql("select * from trainingData").withColumnRenamed("userid", "user").withColumnRenamed("movieid", "item")
  val testData = hc.sql("select * from testData").withColumnRenamed("userid", "user").withColumnRenamed("movieid", "item")
  // 100为迭代次数，1为隐因子，1.0为回归系数
  val als = new ALS().setMaxIter(100).setRank(1).setRegParam(1.0)
  val p = new Pipeline().setStages(Array(als))
  trainData.cache()
  testData.cache()
  // 根据Pipeline生成模型
  val model = p.fit(trainData)
  // rating为表中已有的数据，prediction为计算出的预测值
  val test = model.transform(testData).select("rating", "prediction")
  // mean()为取平均值
  val MSE = test.map(x => math.pow(x.getDouble(0) - x.getFloat(1),2)).mean()
  val RMSE = math.sqrt(MSE)
  model.save("/tmp/ml/ALSmodel")
}
