package com.local.ml

import com.local.conf.AppConf
import org.apache.spark.mllib.recommendation.{ALS, MatrixFactorizationModel, Rating}
import org.apache.spark.rdd.RDD

/**
  * Created by ZXL on 2018/3/1.
  */
object ModelTraining extends AppConf{
  def computeRmse(model:MatrixFactorizationModel,data:RDD[Rating]):Double={
    val predict=model.predict(data.map(x=>(x.user,x.product)))

    val predictionsAndRatings=predict.map(x=>{
      ((x.user,x.product),x.rating)
    }).join(data.map(x=>((x.user,x.product),x.rating))).values

    val MSE = predictionsAndRatings.map {x=>
      (x._1-x._2)*(x._1-x._2)
    }.mean()
    MSE
  }

  def main(args: Array[String]) {
    //读取电影信息
    val movies=sc.textFile("data/movies.dat").map(line=>{
      val fields=line.split("\\|")
      (fields(0).toInt,fields(1))
    }).collect().toMap

    //读取评分数据
    val ratings=sc.textFile("data/ratings.dat").map(line=>{
      val fields=line.split("\t")
      val rating=Rating(fields(0).toInt,fields(1).toInt,fields(2).toDouble)
      val timestamp=fields(3).toLong%10
      (timestamp,rating)
    })

    //输出基本信息
    val numRatings=ratings.count()
    val numUsers=ratings.map(_._2.user).distinct().count()
    val numMovies=ratings.map(_._2.product).distinct().count()
    println("Got"+numRatings+" ratings from "+numUsers+" users on "+numMovies+" movies")


    //训练集：验证集：测试集=6：2：2
    val training=ratings.filter(x=>x._1<6).map(x=>x._2)
    val validation=ratings.filter(x=>x._1>=6 && x._1<8).map(x=>x._2)
    val test=ratings.filter(x=>x._1>=8).map(x=>x._2)

    val numTraining=training.count()
    val numValidation=validation.count()
    val numTest=test.count()
    println("Trainging:"+numTraining+",Validation:"+numValidation+",Test:"+numTest)

    //使用不同参数训练协同过滤模型
    val ranks=List(10,20,50,60,70,80,90,100)
    val lambds=List(0.001, 0.005, 0.01, 0.015, 0.02, 0.1)
    val numIters=List(10,20)

    var bestValidationRmse=Double.MaxValue
    var bestRank=1
    var bestLamba = 0.0
    var bestNumIter = 0
    var bestModel=ALS.train(training,bestRank,bestNumIter,bestLamba)

    for(rank<-ranks;lambd<-lambds;numIter<-numIters){
      val model=ALS.train(training,rank,numIter,lambd)
      val validationRmse=computeRmse(model,validation)
      if(validationRmse<bestValidationRmse){
        bestModel = model
        bestValidationRmse = validationRmse
        bestRank = rank
        bestLamba=lambd
        bestNumIter = numIter
      }
    }

    val testRmse=computeRmse(bestModel,test)

    bestModel.save(sc,"model/")

    println("The best model was trained with rank= "+bestRank+
    " and lamba= "+bestLamba+
      ", and numIter= "+bestNumIter+
      ", and its RMSE on the test set is "+testRmse+".")


    /*val minPartitions = 8
    //1获取训练数据
    val trainRDD = sc.textFile("data/ratings.txt", minPartitions).map(line => {
      line.split("\t").take(3)
    })
    val trainData = trainRDD.map {
      case Array(user, movie, rating) => UserRating(user.toInt, movie.toInt, rating.toDouble)
    }
    val model=ALS.train(trainData,50,10,0.01) */



    //model.save(sc,"model/")

   /* val trainProducts = trainData.map {
      case UserRating(user, movie, rating) => (user, movie)
    }

    //2获取测试数据
    val testRDD = sc.textFile("data/u1.test", minPartitions).map(line => {
      line.split("\t").take(3)
    })
    val testData = testRDD.map {
      case Array(user, movie, rating) => UserRating(user.toInt, movie.toInt, rating.toDouble)
    }
    val testProducts = testData.map {
      case UserRating(user, movie, rating) => ((user, movie), rating)
    }

    //特征向量的个数
    val rank = 1
    //正则因子
    val lambda = List(0.001, 0.005, 0.01, 0.015, 0.02, 0.1)
    //迭代次数
    val iteration = List(10, 15)
    var bestRMSE = Double.MaxValue
    var bestIteration = 0
    var bestLambda = 0.0
    var bestModel=ALS.train(testData,rank,bestIteration,bestLambda)

    for (lam <- lambda; i <- iteration) {
      //训练模型
      val model = ALS.train(trainData, rank, i, lam)

      //获取结果
      val predict = model.predict(trainProducts).map {
        case UserRating(user, movie, rating) => ((user, movie), rating)
      }

      //将结果与实际比对
      val predictAndFact = predict.join(testProducts)
      val MSE = predictAndFact.map {
        case ((user, product), (r1, r2)) =>
          val err = r1 - r2
          err * err
      }.mean()
      val RMSE = math.sqrt(MSE)
      //RMSE越小，代表模型越精确
      if (RMSE < bestRMSE) {
        bestModel=model
        bestRMSE = RMSE
        bestIteration = i
        bestLambda = lam
      }
    }
    bestModel.save(sc,"model/")
    println(s"Best RMSE is $bestRMSE")
    println(s"Best Iteration is $bestIteration")
    println(s"Best Lambda is $bestLambda")*/
  }
}

