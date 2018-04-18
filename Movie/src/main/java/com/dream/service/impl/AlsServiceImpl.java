package com.dream.service.impl;

import com.dream.mapper.AlstabMapper;
import com.dream.mapper.MovieMapper;
import com.dream.po.AlstabExample;
import com.dream.po.Movie;
import com.dream.service.AlsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ZXL on 2018/3/29.
 */
@Service
public class AlsServiceImpl implements AlsService {

    @Autowired
    private MovieMapper moivemapper;

    @Autowired
    private AlstabMapper alstabMapper;

    @Override
    public List<Movie> selectAlsMoviesByUserId(Integer userid) {
        AlstabExample alstabExample = new AlstabExample();
        AlstabExample.Criteria criteria = alstabExample.createCriteria();
        criteria.andUseridEqualTo(userid);
        List<Integer> alsMovieIds = alstabMapper.selectAlsByExampleStr(alstabExample);
        List<Movie> alsMovieList = new ArrayList<Movie>();
        Movie movie = null;
        for (Integer movieId : alsMovieIds) {
            movie = moivemapper.selectByPrimaryKey(movieId);
            if (movie != null) {
                alsMovieList.add(movie);
            }
        }

        return alsMovieList;
    }
}
