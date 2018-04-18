package com.dream.service;
import org.springframework.web.bind.annotation.PathVariable;
import com.dream.po.Browse;
import com.dream.po.User;
import com.dream.common.E3Result;

/**
 * Created by ZXL on 2018/3/1.
 */
public interface RegisterService {
    //检查输入是否合法实时检测
    public E3Result checkData(String param, int type);
    //注册用户
    public E3Result register(User user);
    public void selectFavorite(Browse browse);//注册时候写入用户喜欢的电影
    //点击注册按钮时候检查合法性
    E3Result checkDataBoth(@PathVariable String paramName, @PathVariable String paramEmail, @PathVariable Integer type);

}
