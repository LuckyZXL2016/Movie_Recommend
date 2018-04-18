package com.dream.service;

import com.dream.common.E3Result;
import com.dream.po.Review;

public interface StarService {
    public void  setStar(Review review);
    //搜索影评,用于用户评价一部电影后立即获取其评价的信息
    E3Result SortReviewByUseridandMovieid(Integer userid,Integer movieid);
}
