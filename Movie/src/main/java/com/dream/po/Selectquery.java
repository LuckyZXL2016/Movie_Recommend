package com.dream.po;

public class Selectquery {
    private int category;//替换喜欢查询则为userid
    private int molimit;//替换喜欢查询则为boollike
    private String sort;//替换喜欢查询则为,movieid
    public Integer getCategory() {
        return category;
    }

    public void setCategoryid(Integer category) {
        this.category = category;
    }

    public Integer getmolimit() {
        return molimit;
    }

    public void setmolimit(Integer molimit) {
        this.molimit=molimit;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }
}
