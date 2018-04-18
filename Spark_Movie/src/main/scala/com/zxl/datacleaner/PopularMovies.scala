package com.zxl.datacleaner

import com.zxl.conf.AppConf
import org.apache.spark.sql.SaveMode

/**
  * 新用户没有观看记录
  * 默认推荐播放量前5的电影
  * Created by ZXL on 2018/3/11.
  */
object PopularMovies extends AppConf {

  def main(args: Array[String]) {

    val pop = hc.sql("select count(*) as c ,movieId from trainingData group by movieId order by c desc")
    val pop5 = pop.select("movieId").limit(5)
    pop5.registerTempTable("pop5")
    val pop5result = hc.sql("select a.movieId,a.title from movies a join pop5 b where a.movieId=b.movieId")
    pop5result.write.mode(SaveMode.Overwrite).parquet("/tmp/pop5result")
    hc.sql("drop table if exists pop5result")
    hc.sql("create table if not exists pop5result(movieId int,title string) stored as parquet")
    hc.sql("load data inpath '/tmp/pop5result' overwrite into table pop5result")
  }
}
