package com.dream.service.impl;

import com.dream.common.Page;
import com.dream.mapper.BrowseMapper;
import com.dream.mapper.RectabMapper;
import com.dream.mapper.ReviewMapper;
import com.dream.mapper.UserMapper;
import com.dream.po.*;
import com.dream.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ReviewMapper reviewMapper;

    @Autowired
    private BrowseMapper browseMapper;

    @Autowired
    private RectabMapper rectabMapper;

    @Override
    public Page<User> findUserList(Integer page, Integer rows, String username) {
        User user = new User();

        if (StringUtils.isNotBlank(username)) {
            user.setUsername(username);
        }
        // 当前页
        user.setStart((page-1)*rows);
        // 每页数
        user.setRows(rows);
        List<User> users = userMapper.selectUserList(user);
        // 总记录
        Integer count = userMapper.selectUserListCount(user);
        Page<User> result = new Page<>();
        result.setPage(page);
        result.setRows(users);
        result.setSize(rows);
        result.setTotal(count);
        return result;
    }
    //删除用户信息
    @Override
    public void deleteUser(Integer id) {

        //删除评论表的用户信息
        ReviewExample reviewExample = new ReviewExample();
        ReviewExample.Criteria criteria1 = reviewExample.createCriteria();
        criteria1.andUseridEqualTo(id);
        List<Review> reviewList = reviewMapper.selectByExample(reviewExample);
        if(reviewList != null) {
            reviewMapper.deleteByExample(reviewExample);
        }

        //删除喜欢收藏表的用户信息
        BrowseExample browseExample = new BrowseExample();
        BrowseExample.Criteria criteria2 = browseExample.createCriteria();
        criteria2.andUseridEqualTo(id);
        List<Browse> browseList = browseMapper.selectByExample(browseExample);
        if(browseList != null) {
            browseMapper.deleteByExample(browseExample);
        }

        //删除推荐表的用户信息
        RectabExample rectabExample = new RectabExample();
        RectabExample.Criteria criteria3 = rectabExample.createCriteria();
        criteria3.andUseridEqualTo(id);
        List<Rectab> rectabList = rectabMapper.selectByExample(rectabExample);
        if(rectabList != null) {
            rectabMapper.deleteByExample(rectabExample);
        }

        //删除用户表的个人信息
        userMapper.deleteByPrimaryKey(id);
    }

    @Override
    public User getUserById(Integer id) {
        User user = userMapper.selectByPrimaryKey(id);
        return user;
    }

    @Override
    public void updateUser(User user) {
        userMapper.updateByPrimaryKey(user);
    }

    @Override
    public void addUser(User user) {
        String md5Pass = DigestUtils.md5DigestAsHex(user.getPassword().getBytes());
        user.setPassword(md5Pass);
        userMapper.insert(user);
    }
}
