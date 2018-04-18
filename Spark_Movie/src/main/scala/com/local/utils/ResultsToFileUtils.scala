package com.local.utils

import java.io.{File, PrintWriter}

object ResultsToFileUtils {
  def toFile(filePath: String, content: String): Unit = {
    val writer = new PrintWriter(new File(filePath)) //当前工程根目录下
    writer.append(content + "\r\n")
    writer.close()
  }
}
