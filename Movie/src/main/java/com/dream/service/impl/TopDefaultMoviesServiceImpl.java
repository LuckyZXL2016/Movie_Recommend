package com.dream.service.impl;

import com.dream.common.E3Result;
import com.dream.mapper.TopdefaultmoviesMapper;
import com.dream.po.Movie;
import com.dream.service.TopDefaultMoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TopDefaultMoviesServiceImpl implements TopDefaultMoviesService{
    @Autowired
    private TopdefaultmoviesMapper topdefaultmoviesMapper;
    public List<Movie> SelectRegDefaultMovie(){
        List<Movie> list = topdefaultmoviesMapper.selectRegDefaultMovie();
        return list;
    }
}
