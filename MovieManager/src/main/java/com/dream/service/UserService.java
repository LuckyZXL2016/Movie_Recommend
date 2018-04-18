package com.dream.service;

import com.dream.common.Page;
import com.dream.po.User;

public interface UserService {

    // 查询用户列表
    public Page<User> findUserList(Integer page, Integer rows, String username);
    // 删除用户
    public void deleteUser(Integer id);
    // 编辑用户
    public User getUserById(Integer id);
    // 更新用户信息
    public void updateUser(User user);
    // 添加用户
    public void addUser(User user);
}
