package com.local.rec

//import com.southeast.caseclass.Result
import com.local.conf.AppConf
import org.apache.spark.mllib.recommendation.MatrixFactorizationModel

/**
  * Created by ZXL on 2018/3/1.
  */
object Recommand extends AppConf{
  def main(args: Array[String]) {
    val modelpath = "model/"
    val model = MatrixFactorizationModel.load(sc, modelpath)

    val uid=6
    val rec = model.recommendProducts(uid, 5)

    val result = rec.map(x => x.user.toString() + "|"
      + x.product.toString() + "|" + x.rating.toString())
    val resultDFArray = sc.parallelize(result)
    val res=resultDFArray.map(line=>{
      val fields=line.split("\\|")
      (fields(0).toInt,fields(1))
    })

    res.reduceByKey((a,b)=>(a+","+b)).map(line=>{
      line._1+"\t"+line._2
    }).saveAsTextFile("data/movie")
  }
}
