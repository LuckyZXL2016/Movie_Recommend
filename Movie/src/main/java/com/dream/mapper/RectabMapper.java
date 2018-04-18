package com.dream.mapper;

import com.dream.po.Rectab;
import com.dream.po.RectabExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface RectabMapper {
    int countByExample(RectabExample example);

    int deleteByExample(RectabExample example);

    int insert(Rectab record);

    int insertSelective(Rectab record);

    List<Rectab> selectByExample(RectabExample example);

    int updateByExampleSelective(@Param("record") Rectab record, @Param("example") RectabExample example);

    int updateByExample(@Param("record") Rectab record, @Param("example") RectabExample example);

    void update(Rectab rectab);
}