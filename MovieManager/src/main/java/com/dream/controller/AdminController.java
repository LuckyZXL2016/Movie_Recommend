package com.dream.controller;


import com.dream.common.E3Result;
import com.dream.common.Page;
import com.dream.po.Admin;
import com.dream.service.AdminService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
public class AdminController {

    @Autowired
    private AdminService adminService;

    @RequestMapping("/")
    public String showLogin(){

        return "adminLogin";
    }

    @RequestMapping("/{page}")
    public String showPage(@PathVariable String page){
        return page;
    }

//    @RequestMapping(value="/admin/login",method = RequestMethod.POST)
//    @ResponseBody
//    public E3Result login(String adminname, String adminpassword, Model model, HttpServletRequest request) {
//        E3Result e3Result = adminService.adminLogin(adminname, adminpassword);
//        Admin admin = null;
//        // 判断是否登录成功
//        if (e3Result.getStatus() == 200) {
//            admin= (Admin) e3Result.getData();
//        }
//        model.addAttribute("admin", admin);
//        request.getSession().setAttribute("admin", admin);
//        // 返回结果
//        return e3Result;
//    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public E3Result login(String adminname, String adminpassword, Model model) {
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(adminname, adminpassword);
        try {
            subject.login(token);
        } catch (UnknownAccountException e) {
            e.printStackTrace();
            model.addAttribute("userName", "用户名错误！");
            return E3Result.build(500, "用户名错误");
        } catch (IncorrectCredentialsException e) {
            e.printStackTrace();
            model.addAttribute("passwd", "密码错误");
            return E3Result.build(500, "密码错误" );
        }
        return E3Result.ok();
    }


    @RequestMapping(value = "/admin/list")
    @RequiresRoles("admin")
    public String getUserList(@RequestParam(defaultValue="1")Integer page, @RequestParam(defaultValue="10")Integer rows, String adminname, Model model) {

        Page<Admin> admins = adminService.findAdminList(page, rows, adminname);
        model.addAttribute("page", admins);
        model.addAttribute("adminname", adminname);
        return "adminManage";
    }

    @RequestMapping("/admin/delete")
    @ResponseBody
    public String deleteAdmin(Integer id) {
        adminService.deleteAdmin(id);
        return "OK";
    }

    @RequestMapping("/admin/edit")
    @ResponseBody
    public Admin getAdminById(Integer id) {
        Admin admin = adminService.getAdminById(id);
        return admin;
    }

    @RequestMapping("/admin/update")
    @ResponseBody
    public String updateAdmin(Admin admin) {
        adminService.updateAdmin(admin);
        return "OK";
    }

    @RequestMapping("/admin/add")
    @ResponseBody
    public String addAdmin(Admin admin) {
        adminService.addAdmin(admin);
        return "OK";
    }
}
