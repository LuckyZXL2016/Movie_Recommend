import scrapy
import json
from scrapy.conf import settings
from tutorial.items import MovieItem

class DmozSpider(scrapy.spiders.Spider):
    name = "demo"
    movie_id = 1
    #handle_httpstatus_list = [401]
    allowed_domains = ["movielens.org"]
    start_urls = ["https://movielens.org/api/movies/"]

    cookie = settings['COOKIE']  # 带着Cookie向网页发请求
    headers = {
        'Connection': 'keep - alive',  # 保持链接状态
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36'
    }

    def start_requests(self):
        yield scrapy.Request(url=self.start_urls[0]+str(self.movie_id), headers=self.headers, cookies=self.cookie)


    def parse(self, response):
        #filename = response.url.split("/")[-2]

        #filename = "movies"
        #with open(filename, 'ab') as f:
        # f.write(response.body)

        item = MovieItem()
        entity = json.loads(response.body)
        movie = entity['data']['movieDetails']['movie']
        item['movieid']= entity['data']['movieDetails']['movieId']
        item['moviename'] = movie['title']
        item['directors'] = ",".join(movie['directors'])
        item['actors'] = ",".join(movie['actors'])
        item['posterPath']  = movie['posterPath']
        item['plotSummary']  = movie['plotSummary']
        item['averageratings']  = movie['avgRating']
        item['numRatings']  = movie['numRatings']
        yield item

        while self.movie_id<140215:
            self.movie_id += 1
            url = self.start_urls[0]+str(self.movie_id)
            yield scrapy.Request(url, dont_filter=True, callback=self.parse)












