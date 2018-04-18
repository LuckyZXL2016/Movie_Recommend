package com.dream.service.impl;

import com.dream.mapper.UserMapper;
import com.dream.po.User;
import com.dream.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    @Override
    public User getUserById(Integer id) {
        User user = userMapper.selectByPrimaryKey(id);
        return user;
    }

    @Override
    public void updateUser(Integer userid, String password, String email) {

        String md5Pass = DigestUtils.md5DigestAsHex(password.getBytes());
        User user = new User();
        user.setUserid(userid);
        user.setPassword(md5Pass);
        user.setEmail(email);
        userMapper.updateByPrimaryKeySelective(user);
    }
}
