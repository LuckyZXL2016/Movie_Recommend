package com.zxl.datacleaner

import com.zxl.conf.AppConf
import org.apache.spark.sql.SaveMode

/**
  * 默认推荐电影方案二
  * Created by ZXL on 2018/3/11.
  */
object PopularMovies2 extends AppConf {
  def main(args: Array[String]) {

    // 最终的表里应该是5部默认推荐的电影的名称
    val moviesRatingCount = hc.sql("select count(*) c ,movieid from trainingdata group by movieid order by c desc")
    val top5 = moviesRatingCount.limit(5)
    top5.registerTempTable("top5")
    val top5DF = hc.sql("select a.title from movies a join top5 b on a.movieid=b.movieid")
    top5DF.write.mode(SaveMode.Overwrite).parquet("/tmp/top5DF")
    hc.sql("drop table if exists top5DF")
    hc.sql("create table if not exists top5DF(title string) stored as parquet")
    hc.sql("load data inpath '/tmp/top5DF' overwrite into table top5DF")
  }
}
