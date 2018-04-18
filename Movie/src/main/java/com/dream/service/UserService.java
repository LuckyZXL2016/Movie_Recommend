package com.dream.service;

import com.dream.po.User;

public interface UserService {

    // 编辑用户（好像暂未用到?谁写的）
    public User getUserById(Integer id);

    // 更新用户信息用于修改密码
    public void updateUser(Integer userid, String password, String email);
}
