package com.dream.service;

import com.dream.po.Movie;

import java.util.List;

/**
 * Created by ZXL on 2018/3/29.
 */


public interface AlsService {
    List<Movie> selectAlsMoviesByUserId(Integer userid);
}
