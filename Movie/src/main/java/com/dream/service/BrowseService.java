package com.dream.service;

import com.dream.po.Browse;


public interface BrowseService {
    // 根据用户id获取Browse记录
    Browse getBrowseByUserId(Integer userid);
}
