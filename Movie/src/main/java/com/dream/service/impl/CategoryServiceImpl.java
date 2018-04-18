package com.dream.service.impl;
import com.dream.common.E3Result;
import com.dream.mapper.CategoryMapper;
import com.dream.po.Category;
import com.dream.po.CategoryExample;
import com.dream.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryMapper CategoryMapper;
    @Override
    public E3Result GetAllCategory()
    {
        CategoryExample example = new CategoryExample();
        CategoryExample.Criteria criteria = example.createCriteria();
        // 执行查询
        List<Category> list = CategoryMapper.selectByExample(example);
        if (list == null || list.size() == 0) {
            return E3Result.build(400, "获取分类标签错误");
        }
        return E3Result.ok(list);

    }
}
