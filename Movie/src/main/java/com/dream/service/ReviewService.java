package com.dream.service;

import com.dream.po.Review;

import java.util.List;

public interface ReviewService {
//进入个人中心前获取其全部的影评
    List<Review> getReviewListByUserId(Integer id);
}
