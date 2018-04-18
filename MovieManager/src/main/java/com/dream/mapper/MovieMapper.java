package com.dream.mapper;

import com.dream.po.Movie;
import com.dream.po.MovieExample;
import java.util.List;

import com.dream.po.Query;
import org.apache.ibatis.annotations.Param;

public interface MovieMapper {
    int countByExample(MovieExample example);

    int deleteByExample(MovieExample example);

    int deleteByPrimaryKey(Integer movieid);

    int insert(Movie record);

    int insertSelective(Movie record);

    List<Movie> selectByExample(MovieExample example);

    Movie selectByPrimaryKey(Integer movieid);

    int updateByExampleSelective(@Param("record") Movie record, @Param("example") MovieExample example);

    int updateByExample(@Param("record") Movie record, @Param("example") MovieExample example);

    int updateByPrimaryKeySelective(Movie record);

    int updateByPrimaryKey(Movie record);

    List<Movie> selectMovieList(Movie movie);
    Integer selectMovieListCount(Movie movie);
    void updateMovie(Movie movie);

    //总条数
    public Integer movieCount(Query query);
    //结果集
    public List<Movie> selectMovieListByQuery(Query query);


}