package com.dream.service.impl;
import com.dream.common.E3Result;
import com.dream.common.Page;
import com.dream.mapper.AdminMapper;
import com.dream.po.Admin;
import com.dream.po.AdminExample;
import com.dream.service.AdminService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;
@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private AdminMapper adminMapper;

    @Override
    public E3Result adminLogin(String adminname, String adminpassword) {
        // 1、判断账号和密码是否正确
        // 根据账号查询管理员信息
        AdminExample example = new AdminExample();
        AdminExample.Criteria criteria = example.createCriteria();
        criteria.andAdminnameEqualTo(adminname);
        // 执行查询
        List<Admin> list = adminMapper.selectByExample(example);
        if (list == null || list.size() == 0) {
            // 返回登录失败
            return E3Result.build(400, "用户名或密码错误");
        }
        // 取用户信息
        Admin admin = list.get(0);
        // 判断密码是否正确
        if (!DigestUtils.md5DigestAsHex(adminpassword.getBytes()).equals(admin.getAdminpassword())) {
            // 2、如果不正确，返回登录失败
            return E3Result.build(400, "用户名或密码错误");
        } else {
            return E3Result.ok(admin);
        }
    }

    @Override
    public Page<Admin> findAdminList(Integer page, Integer rows, String adminname) {
        Admin admin = new Admin();
        if (StringUtils.isNotBlank(adminname)) {
            admin.setAdminname(adminname);
        }
        // 当前页
        admin.setStart((page-1)*rows);
        // 每页数
        admin.setRows(rows);
        List<Admin> admins = adminMapper.selectAdminList(admin);
        // 总记录
        Integer count = adminMapper.selectAdminListCount(admin);
        Page<Admin> result = new Page<>();
        result.setPage(page);
        result.setRows(admins);
        result.setSize(rows);
        result.setTotal(count);
        return result;
    }

    @Override
    public void deleteAdmin(Integer id) {
        adminMapper.deleteByPrimaryKey(id);
    }

    @Override
    public Admin getAdminById(Integer id) {
        Admin admin = adminMapper.selectByPrimaryKey(id);
        return admin;
    }

    @Override
    public void updateAdmin(Admin admin) {
        adminMapper.updateByPrimaryKey(admin);
    }

    @Override
    public void addAdmin(Admin admin) {
        admin.setRole(1);
        System.out.println("**************************"+admin.getRole());
        adminMapper.insert(admin);
    }
}
