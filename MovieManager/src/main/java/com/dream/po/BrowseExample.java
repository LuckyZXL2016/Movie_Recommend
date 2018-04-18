package com.dream.po;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BrowseExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public BrowseExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andBrowseidIsNull() {
            addCriterion("browseid is null");
            return (Criteria) this;
        }

        public Criteria andBrowseidIsNotNull() {
            addCriterion("browseid is not null");
            return (Criteria) this;
        }

        public Criteria andBrowseidEqualTo(Integer value) {
            addCriterion("browseid =", value, "browseid");
            return (Criteria) this;
        }

        public Criteria andBrowseidNotEqualTo(Integer value) {
            addCriterion("browseid <>", value, "browseid");
            return (Criteria) this;
        }

        public Criteria andBrowseidGreaterThan(Integer value) {
            addCriterion("browseid >", value, "browseid");
            return (Criteria) this;
        }

        public Criteria andBrowseidGreaterThanOrEqualTo(Integer value) {
            addCriterion("browseid >=", value, "browseid");
            return (Criteria) this;
        }

        public Criteria andBrowseidLessThan(Integer value) {
            addCriterion("browseid <", value, "browseid");
            return (Criteria) this;
        }

        public Criteria andBrowseidLessThanOrEqualTo(Integer value) {
            addCriterion("browseid <=", value, "browseid");
            return (Criteria) this;
        }

        public Criteria andBrowseidIn(List<Integer> values) {
            addCriterion("browseid in", values, "browseid");
            return (Criteria) this;
        }

        public Criteria andBrowseidNotIn(List<Integer> values) {
            addCriterion("browseid not in", values, "browseid");
            return (Criteria) this;
        }

        public Criteria andBrowseidBetween(Integer value1, Integer value2) {
            addCriterion("browseid between", value1, value2, "browseid");
            return (Criteria) this;
        }

        public Criteria andBrowseidNotBetween(Integer value1, Integer value2) {
            addCriterion("browseid not between", value1, value2, "browseid");
            return (Criteria) this;
        }

        public Criteria andUseridIsNull() {
            addCriterion("userid is null");
            return (Criteria) this;
        }

        public Criteria andUseridIsNotNull() {
            addCriterion("userid is not null");
            return (Criteria) this;
        }

        public Criteria andUseridEqualTo(Integer value) {
            addCriterion("userid =", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotEqualTo(Integer value) {
            addCriterion("userid <>", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridGreaterThan(Integer value) {
            addCriterion("userid >", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridGreaterThanOrEqualTo(Integer value) {
            addCriterion("userid >=", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridLessThan(Integer value) {
            addCriterion("userid <", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridLessThanOrEqualTo(Integer value) {
            addCriterion("userid <=", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridIn(List<Integer> values) {
            addCriterion("userid in", values, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotIn(List<Integer> values) {
            addCriterion("userid not in", values, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridBetween(Integer value1, Integer value2) {
            addCriterion("userid between", value1, value2, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotBetween(Integer value1, Integer value2) {
            addCriterion("userid not between", value1, value2, "userid");
            return (Criteria) this;
        }

        public Criteria andMovieidsIsNull() {
            addCriterion("movieids is null");
            return (Criteria) this;
        }

        public Criteria andMovieidsIsNotNull() {
            addCriterion("movieids is not null");
            return (Criteria) this;
        }

        public Criteria andMovieidsEqualTo(String value) {
            addCriterion("movieids =", value, "movieids");
            return (Criteria) this;
        }

        public Criteria andMovieidsNotEqualTo(String value) {
            addCriterion("movieids <>", value, "movieids");
            return (Criteria) this;
        }

        public Criteria andMovieidsGreaterThan(String value) {
            addCriterion("movieids >", value, "movieids");
            return (Criteria) this;
        }

        public Criteria andMovieidsGreaterThanOrEqualTo(String value) {
            addCriterion("movieids >=", value, "movieids");
            return (Criteria) this;
        }

        public Criteria andMovieidsLessThan(String value) {
            addCriterion("movieids <", value, "movieids");
            return (Criteria) this;
        }

        public Criteria andMovieidsLessThanOrEqualTo(String value) {
            addCriterion("movieids <=", value, "movieids");
            return (Criteria) this;
        }

        public Criteria andMovieidsLike(String value) {
            addCriterion("movieids like", value, "movieids");
            return (Criteria) this;
        }

        public Criteria andMovieidsNotLike(String value) {
            addCriterion("movieids not like", value, "movieids");
            return (Criteria) this;
        }

        public Criteria andMovieidsIn(List<String> values) {
            addCriterion("movieids in", values, "movieids");
            return (Criteria) this;
        }

        public Criteria andMovieidsNotIn(List<String> values) {
            addCriterion("movieids not in", values, "movieids");
            return (Criteria) this;
        }

        public Criteria andMovieidsBetween(String value1, String value2) {
            addCriterion("movieids between", value1, value2, "movieids");
            return (Criteria) this;
        }

        public Criteria andMovieidsNotBetween(String value1, String value2) {
            addCriterion("movieids not between", value1, value2, "movieids");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeIsNull() {
            addCriterion("browsetime is null");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeIsNotNull() {
            addCriterion("browsetime is not null");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeEqualTo(Date value) {
            addCriterion("browsetime =", value, "browsetime");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeNotEqualTo(Date value) {
            addCriterion("browsetime <>", value, "browsetime");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeGreaterThan(Date value) {
            addCriterion("browsetime >", value, "browsetime");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeGreaterThanOrEqualTo(Date value) {
            addCriterion("browsetime >=", value, "browsetime");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeLessThan(Date value) {
            addCriterion("browsetime <", value, "browsetime");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeLessThanOrEqualTo(Date value) {
            addCriterion("browsetime <=", value, "browsetime");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeIn(List<Date> values) {
            addCriterion("browsetime in", values, "browsetime");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeNotIn(List<Date> values) {
            addCriterion("browsetime not in", values, "browsetime");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeBetween(Date value1, Date value2) {
            addCriterion("browsetime between", value1, value2, "browsetime");
            return (Criteria) this;
        }

        public Criteria andBrowsetimeNotBetween(Date value1, Date value2) {
            addCriterion("browsetime not between", value1, value2, "browsetime");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}