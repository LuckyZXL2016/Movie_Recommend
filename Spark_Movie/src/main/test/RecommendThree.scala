import java.awt.Color
import java.util.Properties
import org.apache.log4j.{Level, Logger}
import org.apache.spark.mllib.evaluation.RegressionMetrics
import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.mllib.recommendation.{ALS, MatrixFactorizationModel, Rating}
import org.apache.spark.rdd.RDD
import org.apache.spark.sql.{Row, SQLContext}
import org.apache.spark.sql.types.{DoubleType, IntegerType, StructField, StructType}
import org.jblas.DoubleMatrix
import org.jfree.chart.{ChartFactory, ChartFrame}
import org.jfree.chart.axis.{AxisLocation, NumberAxis}
import org.jfree.chart.labels.StandardCategoryToolTipGenerator
import org.jfree.chart.plot.DatasetRenderingOrder
import org.jfree.chart.renderer.category.LineAndShapeRenderer
import org.jfree.data.category.DefaultCategoryDataset
import org.joda.time._

import Array._

/**
  * 根据rank,iterations,lambda 的值选出最合适的值
  * 满足Rmse值最小，即ALS模型最好
  */
object RecommendThree {
  val (conf, sc) = init
  private val minSimilarity = 0.6
  val sqlContext = new SQLContext(sc)


  //将数据写入到mysql中去
  def WriteToMySql(input: String): Unit = {
    //    val spark = SparkSession.builder().appName("ConMysql").config(conf).getOrCreate()
    //通过并行化创建RDD
    val recommendRDD = sc.parallelize(Array(input)).map(_.split("::"))
    //通过StructType直接指定每个字段的schema
    val schema = StructType(
      List(
        StructField("movie1ID", IntegerType, true),
        StructField("movie2ID", IntegerType, true),
        StructField("sim", DoubleType, true)
      )
    )
    //将RDD映射到rowRDD
    val rowRDD = recommendRDD.map(p => Row(p(0).toInt, p(1).toInt, p(2).toDouble))
    //将schema信息应用到rowRDD上
    val recommendDataFrame = sqlContext.createDataFrame(rowRDD, schema)
    //创建Properties存储数据库相关属性
    val prop = new Properties()
    prop.put("user", "root")
    prop.put("password", "111111")
    //将数据追加到数据库
    recommendDataFrame.write.mode("append").jdbc("jdbc:mysql://localhost:3306/RECOMMEND", "RECOMMEND.SIM", prop)
  }

  //加载txt文件
  def loadFromTxt(): (RDD[Rating], Map[Int, String]) = {
    //1, 创建用户评分数据
    //2, 创建电影ID与名称对照表
    //3, 显示数据记录数
    //创建用户评分数据
    println("开始读取用户评分数据")
    var rawUserData = sc.textFile("data/ratings.dat")
    //    var rawUserData = sc.textFile("hdfs://master:9000/data/ml-100k/u.data")
    //处理数据
    val rawRatings = rawUserData.map(x => x.split(",").take(3)) //以分隔符过滤文件，并取前三个就可以

    //转换为RDD
    val ratingRDD = rawRatings.map {
      case Array(user, movie, rating) =>
        Rating(user.toInt, movie.toInt, rating.toDouble)
    }
    //    println("共计" + ratingRDD.count.toString + "条rating")

    //创建电影ID与名称对照表
    println("开始读取电影数据")
    var itemRDD = sc.textFile("data/movies.dat")
    //    var itemRDD = sc.textFile("hdfs://master:9000/data/ml-100k/u.item")
    val movieTitle = itemRDD.map(
      line => {
        val arrary = line.split(",").take(2)
        (arrary(0).toInt, arrary(1))
      }
    ).collect().toMap

    //显示数据记录数
    //    val numRatings = ratingRDD.count()
    //    val numUsers = ratingRDD.map(_.user).distinct.count()
    //    val numMovies = ratingRDD.map(_.product).distinct.count()
    //    println("共计： ratings:" + numRatings + ", User: " + numUsers + ", M2ovies: " + numMovies)
    (ratingRDD, movieTitle) //返回值类型

  }

  //加载CSV文件
  def loadFromCSV(): (RDD[Rating], Map[Int, String]) = {
    val sqlContext = new SQLContext(sc)

    val filePathR = "hdfs://master:9000/data/ml-20m/ratings.csv"

    val rawRatingsData = sqlContext.read
      .format("com.databricks.spark.csv")
      .option("header", "true")
      .option("inferschema", "true")
      .load(filePathR)

    rawRatingsData.printSchema //打印出表结构
    val ratingsRDD = rawRatingsData.rdd.map {
      row =>
        Rating(row.getInt(0), row.getInt(1), row.getDouble(2))
    }
    println(ratingsRDD.count + ", " + ratingsRDD.map(_.user).distinct.count + ", " + ratingsRDD.map(_.product).distinct.count)

    //将电影id与电影名一一对应
    val rawMoviesData = new SQLContext(sc)
    val filePath = "hdfs://master:9000/data/ml-20m/movies.csv"

    val df = rawMoviesData.read
      .format("com.databricks.spark.csv")
      .option("header", "true")
      .option("inferschema", "true")
      .load(filePath)

    df.printSchema() //打印出表结构
    val moviesRDD = df.rdd.map {
      row =>
        (row.getInt(0), row.getString(1))
    }.collect.toMap
    (ratingsRDD, moviesRDD)

  }

  //初始化操作sc
  def init(): (SparkConf, SparkContext) = {
//        val conf = new SparkConf()
//          .setMaster("spark://master:7077")
//          .setAppName("TXTRecommendThree")
//          .setJars(List("/home/origin/IdeaProjects/day04/out/artifacts/day04_jar/day04.jar"))
//          .set("spark.executor.memory", "2G")
//          .set("spark.driver.allowMultipleContexts", "true")


    val conf = new SparkConf()
      .setMaster("local[4]")
      .setAppName("RecommendThree")


    val sc = new SparkContext(conf)
    (conf, sc)
  }

  //设置日志级别
  def SetLogger = {
    Logger.getLogger("org").setLevel(Level.OFF)
    Logger.getLogger("com").setLevel(Level.OFF)
    System.setProperty("spark.ui.showConsoleProgress", "false")
    Logger.getRootLogger().setLevel(Level.OFF)
  }

  //针对某一具体用户推荐top几电影
  def RecommendMovies(model: MatrixFactorizationModel, movieTitle: Map[Int, String], inputUserID: Int) = {
    val RecommendMovie = model.recommendProducts(inputUserID, 10) //向用户推荐10部电影
    var i = 1
    println("针对" + inputUserID + "这一具体用户推荐以下10部电影")
    RecommendMovie.foreach {
      r =>
        println(i.toString + ", " + movieTitle(r.product) + ", 评分：" + r.rating.toString + ".")
        i += 1
    }
  }

  //准备数据
  def PrepareData(): (RDD[Rating], RDD[Rating], RDD[Rating], Map[Int, String]) = {
    //    val (ratingsRDD, moviesTitle) = loadFromCSV
    val (ratingsRDD, moviesTitle) = loadFromTxt()
    //4, 随即划分数据
    val Array(trainData, validationData, testData) = ratingsRDD.randomSplit(Array(0.8, 0.1, 0.1))
    //    println("trainData: " + trainData.count() + ", validationData: " + validationData.count() + ", " + "testDat: " + testData.count())

    (trainData, validationData, testData, moviesTitle) //movieTitle没有返回
  }


  //推荐选择函数
  def recommend(model: MatrixFactorizationModel, movieTitle: Map[Int, String]) = {
    var choose = ""
    while (choose != "3") {
      println("请选择要推荐类型：1, 针对用户推荐电影；2, 针对电影推荐给感兴趣的用户；3，离开！")
      choose = Console.readLine
      if (choose == "1") {
        println("请输入用户id： ")
        val inputUserId = Console.readLine //读取用户id
        RecommendMovies(model, movieTitle, inputUserId.toInt)
      } else if (choose == "2") {
        println("请输入电影的id： ")
        val inputMovieId = Console.readLine //从屏幕读取电影id
        RecommendUsers(model, movieTitle, inputMovieId.toInt)
      }
    }
  }

  //把某一个电影推荐给特定的用户群体
  def RecommendUsers(model: MatrixFactorizationModel, movieTitle: Map[Int, String], inputMovieID: Int) = {
    val RecommendUser = model.recommendUsers(inputMovieID, 10) //读取针对inputMovieID推荐前10位用户
    var i = 1
    println("针对电影id" + inputMovieID + "， 电影名： " + movieTitle(inputMovieID.toInt) + "推荐下列用户id： ")
    RecommendUser.foreach {
      r =>
        println(i.toString + ", 用户id： " + r.user + ", 评分： " + r.rating)
        i += 1
    }
  }

  //计算rmse
  def computeRmse(model: MatrixFactorizationModel, RatingRDD: RDD[Rating]): Double = {

    //创建用户id-影片id RDD
    val testingData = RatingRDD.map {
      case Rating(user, product, rating) =>
        (user, product)
    }
    //创建（用户id，影片id）-预测评分
    val prediction = model.predict(testingData).map {
      case Rating(user, product, rating) =>
        ((user, product), rating)
    }

    //创建用户-影片实际评分，并将其与上面创建的预测评分RDD join起来
    val realPredict = RatingRDD.map {
      case Rating(user, product, rating) =>
        ((user, product), rating)
    }.join(prediction)

    //创建预测评分-实际评分RDD
    val predictedAndTrue = realPredict.map {
      case ((user, product), (actual, predicted)) =>
        (actual, predicted)
    }

    //创建RegressionMetrics对象
    val regression = new RegressionMetrics(predictedAndTrue)
    //返回rmse
    regression.rootMeanSquaredError
  }

  def trainModel(trainData: RDD[Rating], validationData: RDD[Rating], rank: Int, Iterations: Int, lambda: Double): (Double, Double) = {
    val startTime = new DateTime()
    val model = ALS.train(trainData, rank, Iterations, lambda)
    val endTime = new DateTime()
    val Rmse = computeRmse(model, validationData)
    val duration = new Duration(startTime, endTime)
    //    val str = "rank is " + rank + ", Iterations is " + Iterations + ", lambda is " + lambda + ", Rmse is " + Rmse + ", duraion.getMill is " + duration.getMillis.toString
    /*val str =*/
    println(f"训练参数：rank:$rank%3d,iterations:$Iterations%.2f ,lambda = $lambda%.2f 结果 Rmse=$Rmse%.2f" + "训练需要时间" + duration.getMillis + "毫秒")
    (Rmse, duration.getStandardSeconds)
  }

  def evaluateParameter(trainData: RDD[Rating], validationData: RDD[Rating], evaluateParameters: String, rankArray: Array[Int], numIterationArray: Array[Int], lambdaArray: Array[Double]) = {

    var dataBarChart = new DefaultCategoryDataset()

    var dataLineChart = new DefaultCategoryDataset()
    for (rank <- rankArray; numIterations <- numIterationArray; lambda <- lambdaArray) {
      val (rmse, time) = trainModel(trainData, validationData, rank, numIterations, lambda)
      val parameterData =
        evaluateParameters match {
          case "rank" => rank;
          case "numIterations" => numIterations;
          case "lambda" => lambda
        }
      dataBarChart.addValue(rmse, evaluateParameters, parameterData.toString())
      dataLineChart.addValue(time, "Time", parameterData.toString())
    }
    Chart.plotBarLineChart("ALS evaluations " + evaluateParameters, evaluateParameters, "RMSE", 0.58, 5, "Time", dataBarChart, dataLineChart)
  }

  //交叉评估参数
  def evaluateAllParameter(trainData: RDD[Rating], validationData: RDD[Rating], rankArray: Array[Int], numIterationsArray: Array[Int], lambdaArray: Array[Double]): MatrixFactorizationModel = {

    val evaluations = for (rank <- rankArray; numIterations <- numIterationsArray; lambda <- lambdaArray) yield {
      val rmse = trainModel(trainData, validationData, rank, numIterations, lambda)
      (rank, numIterations, lambda, rmse)
    }

    val Eval = (evaluations.sortBy(_._4))
    val BestEval = Eval(0)
    //    println("最佳model参数 rank： " + BestEval._1 + ", iterations: " + BestEval._2 + ", lambda: " + BestEval._3 + ", result： " + BestEval._4)
    /*val str =*/
    println("bestModel rank： " + BestEval._1 + ", iterations: " + BestEval._2 + ", lambda: " + BestEval._3 + ", result： " + BestEval._4 + ".")
    val bestModel = ALS.train(trainData, BestEval._1, BestEval._2, BestEval._3)
    bestModel
  }

  //训练评估函数 新增
  def trainValidation(trainData: RDD[Rating], validationData: RDD[Rating]): MatrixFactorizationModel = {
    println("-------评估参数使用------------")

    evaluateParameter(trainData, validationData, "rank", Array(5, 10, 15, 20, 50, 100), Array(10), Array(0.1))

    println("-------评估numIterations-------")
    evaluateParameter(trainData, validationData, "numIterations", Array(10), Array(5, 10, 15, 20, 25), Array(0.1))

    println("-------评估lambda---------")
    evaluateParameter(trainData, validationData, "lambda", Array(10), Array(10), Array(0.05, 0.1, 1, 5, 10.0))

    println("-----------所有参数交叉评估找出最好的参数组合")
    val bestModel = evaluateAllParameter(trainData, validationData, Array(5, 10, 15, 20, 25), Array(5, 10, 15, 20, 25), Array(0.05, 0.1, 1, 5, 10.0))

    bestModel
  }


  //计算物品相似度
  def cosineSimilarity(vector1: DoubleMatrix, vector2: DoubleMatrix): Double = vector1.dot(vector2) / (vector1.norm2() * vector2.norm2())

  //计算所有物品相似度并且将大于0.5的存储到文件
  def calculateAllCosineSimilarity(model: MatrixFactorizationModel): Unit = {
    val productsVectorRdd = model.productFeatures.map {
      case (movieId, factor) =>
        val factorVector = new DoubleMatrix(factor)
        (movieId, factorVector)
    }
    println("Hello,world!")

    val productsSimilarity = productsVectorRdd.cartesian(productsVectorRdd)
      .filter { case ((movieId1, vector1), (movieId2, vector2)) => movieId1 != movieId2 }
      .map { case ((movieId1, vector1), (movieId2, vector2)) =>
        val sim = cosineSimilarity(vector1, vector2)
        (movieId1, movieId2, sim)
      }.filter(_._3 >= minSimilarity)


    val similarity = productsSimilarity.map { case (movieId1, movieId2, sim) =>
//      WriteToMySql(movieId1.toString + "::" + movieId2.toString + "::" + sim.toString)
      println(movieId1.toString + "::" + movieId2.toString + "::" + sim.toString)
    }


    productsVectorRdd.unpersist()
    productsSimilarity.unpersist()
  }

  def main(args: Array[String]): Unit = {
    SetLogger
    println("=====================================数据准备============================================")
    val (trainData, validationData, testData, movieTitle) = PrepareData()
    println("=====================================训练验证============================================")
    val bestModel = trainValidation(trainData, validationData)
    println("=====================================测试阶段============================================")
    val testRmse = computeRmse(bestModel, testData)
    println("使用testData测试bestModel， " + ", 结果 rmse = " + testRmse)
    calculateAllCosineSimilarity(bestModel)
    // bestModel.save(sc, "hdfs://master:9000/data/model") //保存模型
    bestModel.save(sc, "model1") //保存模型

    trainData.unpersist()
    validationData.unpersist()
    testData.unpersist()
  }

}

//
object Chart {
  def plotBarLineChart(Title: String, xLabel: String, yBarLabel: String, yBarMin: Double, yBarMax: Double, yLineLabel: String, dataBarChart: DefaultCategoryDataset, dataLineChart: DefaultCategoryDataset): Unit = {

    //画出Bar Chart
    val chart = ChartFactory
      .createBarChart(
        "Bar Chart", // Bar Chart 标题
        xLabel, // X轴标题
        yBarLabel, // Bar Chart 标题 y轴标题l
        dataBarChart, // Bar Chart数据
        org.jfree.chart.plot.PlotOrientation.VERTICAL, //画图方向垂直
        true, // 包含 legend
        true, // 显示tooltips
        false // 不要URL generator
      );
    //取得plot
    val plot = chart.getCategoryPlot();
    plot.setBackgroundPaint(new Color(0xEE, 0xEE, 0xFF));
    plot.setDomainAxisLocation(AxisLocation.BOTTOM_OR_RIGHT);
    plot.setDataset(1, dataLineChart);
    plot.mapDatasetToRangeAxis(1, 1)
    //画直方图y轴
    val vn = plot.getRangeAxis();
    vn.setRange(yBarMin, yBarMax);
    vn.setAutoTickUnitSelection(true)
    //画折线图y轴
    val axis2 = new NumberAxis(yLineLabel);
    plot.setRangeAxis(1, axis2);
    val renderer2 = new LineAndShapeRenderer()
    renderer2.setToolTipGenerator(new StandardCategoryToolTipGenerator());
    //设置先画直方图,再画折线图以免折线图被盖掉
    plot.setRenderer(1, renderer2);
    plot.setDatasetRenderingOrder(DatasetRenderingOrder.FORWARD);
    //创建画框
    val frame = new ChartFrame(Title, chart);
    frame.setSize(500, 500);
    frame.pack();
    frame.setVisible(true)
  }
}
