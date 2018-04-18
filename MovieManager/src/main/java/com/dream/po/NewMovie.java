package com.dream.po;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class NewMovie {
    private Integer movieid;

    private String moviename;

    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date showyear;

    private String nation;

    private String director;

    private String leadactors;

    private String screenwriter;

    private String picture;

    private Integer[] categoryid;

    private String categoryname;

    // 新加入的三个字段
    private Double averating;

    private Integer numrating;

    private String description;

    public Double getAverating() {
        return averating;
    }

    public void setAverating(Double averating) {
        this.averating = averating;
    }

    public Integer getNumrating() {
        return numrating;
    }

    public void setNumrating(Integer numrating) {
        this.numrating = numrating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer[] getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(Integer[] categoryid) {
        this.categoryid = categoryid;
    }


    public String getCategoryname() {
        return categoryname;
    }

    public void setCategoryname(String categoryname) {
        this.categoryname = categoryname;
    }

    public Integer getMovieid() {
        return movieid;
    }

    public void setMovieid(Integer movieid) {
        this.movieid = movieid;
    }

    public String getMoviename() {
        return moviename;
    }

    public void setMoviename(String moviename) {
        this.moviename = moviename;
    }

    public Date getShowyear() {
        return showyear;
    }

    public void setShowyear(Date showyear) {
        this.showyear = showyear;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getLeadactors() {
        return leadactors;
    }

    public void setLeadactors(String leadactors) {
        this.leadactors = leadactors;
    }

    public String getScreenwriter() {
        return screenwriter;
    }

    public void setScreenwriter(String screenwriter) {
        this.screenwriter = screenwriter;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }


}