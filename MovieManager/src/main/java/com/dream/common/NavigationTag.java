package com.dream.common;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.taglibs.standard.tag.common.core.UrlSupport;

/**
 * 显示格式 上一页 1 2 3 4 5 下一页
 */
/*
 * 自定义标签类继承TagSupport
 */
public class NavigationTag extends TagSupport {

    static final long serialVersionUID = 2372405317744358833L;

    /**
     * request 中用于保存Page<E> 对象的变量名,默认为“page”
     */
    private String bean = "page";   //以page为key值，value为分页对象，放到Request域中就结束了。

    /**
     * 分页跳转的url地址,此属性必须
     */
    private String url = null;

    /**
     * 显示页码数量
     */
    private int number = 5;


    @Override
    public int doStartTag() throws JspException {
        JspWriter writer = pageContext.getOut();
        HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
        Page page = (Page)request.getAttribute(bean);
        if (page == null)
            return SKIP_BODY;
        url = resolveUrl(url, pageContext);
        try {
            //计算总页数
            int pageCount = page.getTotal() / page.getSize();
            if (page.getTotal() % page.getSize() > 0) {
                pageCount++;
            }
            writer.print("<nav><ul class=\"pagination\">");
            //显示“上一页”按钮
            if (page.getPage() > 1) {
                String preUrl = append(url, "page", page.getPage() - 1);
                preUrl = append(preUrl, "rows", page.getSize());
                writer.print("<li><a href=\"" + preUrl + "\">上一页</a></li>");
            } else {
                writer.print("<li class=\"disabled\"><a href=\"#\">上一页</a></li>");
            }
            //显示当前页码的前2页码和后两页码
            //若1 则 1 2 3 4 5, 若2 则 1 2 3 4 5, 若3 则1 2 3 4 5,
            //若4 则 2 3 4 5 6 ,若10  则 8 9 10 11 12
            int indexPage = (page.getPage() - 2 > 0)? page.getPage() - 2 : 1;
            for(int i=1; i <= number && indexPage <= pageCount; indexPage++, i++) {
                if(indexPage == page.getPage()) {
                    writer.print( "<li class=\"active\"><a href=\"#\">"+indexPage+"<span class=\"sr-only\">(current)</span></a></li>");
                    continue;
                }
                String pageUrl  = append(url, "page", indexPage);
                pageUrl = append(pageUrl, "rows", page.getSize());
                writer.print("<li><a href=\"" + pageUrl + "\">"+ indexPage +"</a></li>");
            }
            //显示“下一页”按钮
            if (page.getPage() < pageCount) {
                String nextUrl  = append(url, "page", page.getPage() + 1);
                nextUrl = append(nextUrl, "rows", page.getSize());
                writer.print("<li><a href=\"" + nextUrl + "\">下一页</a></li>");
            } else {
                writer.print("<li class=\"disabled\"><a href=\"#\">下一页</a></li>");
            }
            writer.print("</nav>");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return SKIP_BODY;
    }

    private String append(String url, String key, int value) {

        return append(url, key, String.valueOf(value));
    }

    /**
     * 为url 参加参数对儿
     *
     * @param url
     * @param key
     * @param value
     * @return
     */
    private String append(String url, String key, String value) {
        if (url == null || url.trim().length() == 0) {
            return "";
        }

        if (url.indexOf("?") == -1) {
            url = url + "?" + key + "=" + value;
        } else {
            if(url.endsWith("?")) {
                url = url + key + "=" + value;
            } else {
                url = url + "&amp;" + key + "=" + value;
            }
        }

        return url;
    }

    /**
     * 为url 添加翻页请求参数
     *
     * @param url
     * @param pageContext
     * @return
     * @throws javax.servlet.jsp.JspException
     */
    private String resolveUrl(String url, javax.servlet.jsp.PageContext pageContext) throws JspException{
        //UrlSupport.resolveUrl(url, context, pageContext)
        Map params = pageContext.getRequest().getParameterMap();
        for (Object key:params.keySet()) {
            if ("page".equals(key) || "rows".equals(key)) continue;
            Object value = params.get(key);
            if (value == null) continue;
            if (value.getClass().isArray()) {
                url = append(url, key.toString(), ((String[])value)[0]);
            } else if (value instanceof String) {
                url = append(url, key.toString(), value.toString());
            }
        }
        return url;
    }



    /**
     * @return the bean
     */
    public String getBean() {
        return bean;
    }

    /**
     * @param bean the bean to set
     */
    public void setBean(String bean) {
        this.bean = bean;
    }

    /**
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url the url to set
     */
    public void setUrl(String url) {
        this.url = url;
    }

    public void setNumber(int number) {
        this.number = number;
    }

}