# -*- coding: utf-8 -*-
import mysql.connector
# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import json
from tutorial.items import MovieItem


class TutorialPipeline(object):

    def __init__(self):
        self.conn = mysql.connector.connect(user='root', password='123456', database='how2java')
        self.cursor = self.conn.cursor()


    def process_item(self, item, spider):
        insert_sql = """
                            insert into movie(movieid, moviename, directors, actors, posterPath, plotSummary, averageratings, numRatings)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                        """
        self.cursor.execute(insert_sql, (
        item["movieid"], item["moviename"], item["directors"], item["actors"], item["posterPath"], item["plotSummary"], item["averageratings"],
        item["numRatings"]))
        self.conn.commit()

