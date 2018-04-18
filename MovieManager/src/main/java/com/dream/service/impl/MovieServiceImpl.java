package com.dream.service.impl;

import com.dream.common.Page;
import com.dream.mapper.CategoryMapper;
import com.dream.mapper.MovieMapper;
import com.dream.mapper.MoviecategoryMapper;
import com.dream.mapper.ReviewMapper;
import com.dream.po.*;
import com.dream.service.MovieService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;

@Service("movieService")
@Transactional
public class MovieServiceImpl implements MovieService{

    @Autowired
    private MovieMapper movieMapper;
    @Autowired
    private CategoryMapper categoryMapper;
    @Autowired
    private MoviecategoryMapper moviecategoryMapper;

    @Override
    public Page<NewMovie> findMovieList(Query query) {
        Page<NewMovie> page = new Page<NewMovie>();
        page.setSize(10);
        query.setSize(10);
        if (null != query) {
            //判断当前页
            if (null != query.getPage()) {
                page.setPage(query.getPage());
                query.setStartRow((query.getPage() - 1) * query.getSize());
            }
            if (null != query.getMovieName() && !"".equals(query.getMovieName().trim())) {
                query.setMovieName(query.getMovieName().trim());
            }
            if (0 != (query.getCategoryId())) {
                query.setCategoryId(query.getCategoryId());
            }
            page.setTotal(movieMapper.movieCount(query));
            List<NewMovie> newMovieList = new ArrayList<>();
            List<Movie> movieList = movieMapper.selectMovieListByQuery(query);
            for (Movie movie: movieList) {
                NewMovie newMovie = getMovieById(movie.getMovieid());
                newMovieList.add(newMovie);
            }
            page.setRows(newMovieList);
        }
        return page;
    }

    // 删除电影
    @Override
    public void deleteMovie(Integer id) {
        MoviecategoryExample moviecategoryExample = new MoviecategoryExample();
        MoviecategoryExample.Criteria criteria = moviecategoryExample.createCriteria();
        criteria.andMovieidEqualTo(id);
        moviecategoryMapper.deleteByExample(moviecategoryExample);
        movieMapper.deleteByPrimaryKey(id);
    }

    @Override
    public List<Category> selectCategory() {
        CategoryExample example = new CategoryExample();
        List<Category> list = categoryMapper.selectByExample(example);
        return list;
    }

    // 更新电影信息
    @Override
    public void updateMovie(Movie movie, String[] categoryIds) {
        movieMapper.updateByPrimaryKey(movie);
        // 拿到电影的id
        int movieid = movie.getMovieid();
        // 删除原来的电影分类,再加入
        MoviecategoryExample example = new MoviecategoryExample();
        MoviecategoryExample.Criteria criteria = example.createCriteria();
        criteria.andMovieidEqualTo(movieid);
        moviecategoryMapper.deleteByExample(example);

        for (String categoryId: categoryIds) {
            Moviecategory moviecategory = new Moviecategory();
            // 将分类id转为int型
            int tempcategoryId = Integer.parseInt(categoryId);

            moviecategory.setMovieid(movieid);
            moviecategory.setCategoryid(tempcategoryId);
            moviecategoryMapper.insert(moviecategory);

        }
    }

    // 添加电影

    @Override
    public void addMovie(Movie movie, String[] categoryIds) {
        movieMapper.insert(movie);

        int movieid = movie.getMovieid();

        for (String categoryId: categoryIds) {
            Moviecategory moviecategory = new Moviecategory();
            int tempcategoryId = Integer.parseInt(categoryId);
            moviecategory.setMovieid(movieid);
            moviecategory.setCategoryid(tempcategoryId);

            moviecategoryMapper.insert(moviecategory);
        }
    }

    //根据电影id获取该条电影记录(包括类别）
    @Override
    public NewMovie getMovieById(Integer id) {
        NewMovie newMovie = new NewMovie();
        //根据电影id获取该条电影记录并给newMovie
        Movie movie = movieMapper.selectByPrimaryKey(id);
        newMovie.setMovieid(movie.getMovieid());
        newMovie.setMoviename(movie.getMoviename());
        newMovie.setShowyear(movie.getShowyear());
//        newMovie.setNation(movie.getNation());
        newMovie.setDirector(movie.getDirector());
        newMovie.setLeadactors(movie.getLeadactors());
//        newMovie.setScreenwriter(movie.getScreenwriter());
        newMovie.setPicture(movie.getPicture());
        newMovie.setAverating(movie.getAverating());
        newMovie.setNumrating(movie.getNumrating());
        newMovie.setDescription(movie.getDescription());
        //根据电影id查询电影对应的类别
        MoviecategoryExample example = new MoviecategoryExample();
        MoviecategoryExample.Criteria criteria = example.createCriteria();
        criteria.andMovieidEqualTo(id);
        List<Moviecategory> list = moviecategoryMapper.selectByExample(example);
        //定义一个临时的list
        List temps = new ArrayList();
        //
        String categoryname = " ";
        //将符合条件的id放到list里
        for(Moviecategory mc:list){
            int temId = mc.getCategoryid();
            temps.add(temId);
            Category category = categoryMapper.selectByPrimaryKey(temId);
            categoryname = categoryname + category.getCategory() + "/" ;
        }
        //list转为数组并放到newMovie对象中
        Integer[] arrs =  (Integer[]) temps.toArray(new Integer[temps.size()]);
        newMovie.setCategoryid(arrs);

        // 设置newMovie的category名称
        newMovie.setCategoryname(categoryname);
        return newMovie;
    }
}
