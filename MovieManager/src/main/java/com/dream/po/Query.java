package com.dream.po;

public class Query{
    private String movieName;

    private int categoryId;
    //当前页
    private Integer page;
    //每页数
    private Integer size=5;
    //开始行
    private Integer startRow = 0;

    public String getMovieName() {
        return movieName;
    }


    public Integer getPage() {
        return page;
    }

    public Integer getSize() {
        return size;
    }

    public Integer getStartRow() {
        return startRow;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }



    public void setPage(Integer page) {
        this.page = page;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public void setStartRow(Integer startRow) {
        this.startRow = startRow;
    }
    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
}
