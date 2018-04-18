package com.dream.mapper;

import com.dream.po.Review;
import com.dream.po.ReviewExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ReviewMapper {
    int countByExample(ReviewExample example);

    int deleteByExample(ReviewExample example);

    int deleteByPrimaryKey(Integer reviewid);

    int insert(Review record);

    int insertSelective(Review record);

    List<Review> selectByExample(ReviewExample example);

    Review selectByPrimaryKey(Integer reviewid);

    Review selectByUseridandMovieid(Integer userid,Integer movieid);

    int updateByExampleSelective(@Param("record") Review record, @Param("example") ReviewExample example);

    int updateByExample(@Param("record") Review record, @Param("example") ReviewExample example);

    int updateByPrimaryKeySelective(Review record);

    int updateByPrimaryKey(Review record);
}