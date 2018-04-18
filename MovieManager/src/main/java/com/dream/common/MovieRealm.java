package com.dream.common;

import com.dream.mapper.AdminMapper;
import com.dream.po.Admin;
import com.dream.po.AdminExample;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MovieRealm extends AuthorizingRealm{

    @Autowired
    private AdminMapper adminMapper;

    // 授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        Admin admin = (Admin)principalCollection.getPrimaryPrincipal();
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        // 根据用户名查询用户拥有的角色
//        AdminExample adminExample = new AdminExample();
//        AdminExample.Criteria criteria = adminExample.createCriteria();
//        criteria.andAdminnameEqualTo(adminname);
//        List<Admin> list = adminMapper.selectByExample(adminExample);
        Set<String> roleNames = new HashSet<String>();
        if (0 == admin.getRole()) {
            roleNames.add("admin");
        } else {
            roleNames.add("user");
        }
        // 将角色名称提供给info
        authorizationInfo.setRoles(roleNames);

        return authorizationInfo;
    }

    // 认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {

        System.out.println("----执行了认证方法----");
        UsernamePasswordToken mytoken = (UsernamePasswordToken) authenticationToken;
        String adminName = mytoken.getUsername();
        // 根据用户名查询数据库
        AdminExample example = new AdminExample();
        AdminExample.Criteria criteria = example.createCriteria();
        criteria.andAdminnameEqualTo(adminName);
        List<Admin> list = adminMapper.selectByExample(example);

        if (list == null || list.size() == 0) {
            // 返回登录失败
            return null;
        }
        Admin admin = list.get(0);
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(admin, admin.getAdminpassword(), this.getName());
        return info;
    }
}
