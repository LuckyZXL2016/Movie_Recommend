package com.dream.po;

import java.util.Date;

public class Browse {
    private Integer browseid;

    private Integer userid;

    private String movieids;

    private Date browsetime;

    public Integer getBrowseid() {
        return browseid;
    }

    public void setBrowseid(Integer browseid) {
        this.browseid = browseid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getmovieids() {
        return movieids;
    }

    public void setmovieids(String movieids) {
        this.movieids = movieids;
    }

    public Date getBrowsetime() {
        return browsetime;
    }

    public void setBrowsetime(Date browsetime) {
        this.browsetime = browsetime;
    }
}
