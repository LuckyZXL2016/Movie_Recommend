package com.dream.service;

import com.dream.common.E3Result;
import com.dream.common.Page;
import com.dream.po.Admin;

/**
 * Created by ZXL on 2018/3/2.
 */
public interface AdminService {
    E3Result adminLogin(String adminname, String adminpassword);
    // 管理员列表
    public Page<Admin> findAdminList(Integer page, Integer rows, String username);
    // 删除用户
    public void deleteAdmin(Integer id);
    // 编辑管理员
    public Admin getAdminById(Integer id);
    // 更新管理员信息
    public void updateAdmin(Admin admin);
    // 添加管理员
    public void addAdmin(Admin admin);
}
