//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.dream.po;

import java.util.ArrayList;
import java.util.List;

public class TopdefaultmoviesExample {
    protected String orderByClause;
    protected boolean distinct;
    protected List<Criteria> oredCriteria = new ArrayList();

    public TopdefaultmoviesExample() {
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return this.orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return this.distinct;
    }

    public List<Criteria> getOredCriteria() {
        return this.oredCriteria;
    }

    public void or(Criteria criteria) {
        this.oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = this.createCriteriaInternal();
        this.oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = this.createCriteriaInternal();
        if (this.oredCriteria.size() == 0) {
            this.oredCriteria.add(criteria);
        }

        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        this.oredCriteria.clear();
        this.orderByClause = null;
        this.distinct = false;
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
            return this.condition;
        }

        public Object getValue() {
            return this.value;
        }

        public Object getSecondValue() {
            return this.secondValue;
        }

        public boolean isNoValue() {
            return this.noValue;
        }

        public boolean isSingleValue() {
            return this.singleValue;
        }

        public boolean isBetweenValue() {
            return this.betweenValue;
        }

        public boolean isListValue() {
            return this.listValue;
        }

        public String getTypeHandler() {
            return this.typeHandler;
        }

        protected Criterion(String condition) {
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }

        }

        protected Criterion(String condition, Object value) {
            this(condition, value, (String)null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, (String)null);
        }
    }

    public static class Criteria extends GeneratedCriteria {
        protected Criteria() {
        }
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria = new ArrayList();

        protected GeneratedCriteria() {
        }

        public boolean isValid() {
            return this.criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return this.criteria;
        }

        public List<Criterion> getCriteria() {
            return this.criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            } else {
                this.criteria.add(new Criterion(condition));
            }
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            } else {
                this.criteria.add(new Criterion(condition, value));
            }
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 != null && value2 != null) {
                this.criteria.add(new Criterion(condition, value1, value2));
            } else {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
        }

        public Criteria andIdIsNull() {
            this.addCriterion("id is null");
            return (Criteria)this;
        }

        public Criteria andIdIsNotNull() {
            this.addCriterion("id is not null");
            return (Criteria)this;
        }

        public Criteria andIdEqualTo(Integer value) {
            this.addCriterion("id =", value, "id");
            return (Criteria)this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            this.addCriterion("id <>", value, "id");
            return (Criteria)this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            this.addCriterion("id >", value, "id");
            return (Criteria)this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            this.addCriterion("id >=", value, "id");
            return (Criteria)this;
        }

        public Criteria andIdLessThan(Integer value) {
            this.addCriterion("id <", value, "id");
            return (Criteria)this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            this.addCriterion("id <=", value, "id");
            return (Criteria)this;
        }

        public Criteria andIdIn(List<Integer> values) {
            this.addCriterion("id in", values, "id");
            return (Criteria)this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            this.addCriterion("id not in", values, "id");
            return (Criteria)this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            this.addCriterion("id between", value1, value2, "id");
            return (Criteria)this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            this.addCriterion("id not between", value1, value2, "id");
            return (Criteria)this;
        }

        public Criteria andMovieidIsNull() {
            this.addCriterion("movieid is null");
            return (Criteria)this;
        }

        public Criteria andMovieidIsNotNull() {
            this.addCriterion("movieid is not null");
            return (Criteria)this;
        }

        public Criteria andMovieidEqualTo(Integer value) {
            this.addCriterion("movieid =", value, "movieid");
            return (Criteria)this;
        }

        public Criteria andMovieidNotEqualTo(Integer value) {
            this.addCriterion("movieid <>", value, "movieid");
            return (Criteria)this;
        }

        public Criteria andMovieidGreaterThan(Integer value) {
            this.addCriterion("movieid >", value, "movieid");
            return (Criteria)this;
        }

        public Criteria andMovieidGreaterThanOrEqualTo(Integer value) {
            this.addCriterion("movieid >=", value, "movieid");
            return (Criteria)this;
        }

        public Criteria andMovieidLessThan(Integer value) {
            this.addCriterion("movieid <", value, "movieid");
            return (Criteria)this;
        }

        public Criteria andMovieidLessThanOrEqualTo(Integer value) {
            this.addCriterion("movieid <=", value, "movieid");
            return (Criteria)this;
        }

        public Criteria andMovieidIn(List<Integer> values) {
            this.addCriterion("movieid in", values, "movieid");
            return (Criteria)this;
        }

        public Criteria andMovieidNotIn(List<Integer> values) {
            this.addCriterion("movieid not in", values, "movieid");
            return (Criteria)this;
        }

        public Criteria andMovieidBetween(Integer value1, Integer value2) {
            this.addCriterion("movieid between", value1, value2, "movieid");
            return (Criteria)this;
        }

        public Criteria andMovieidNotBetween(Integer value1, Integer value2) {
            this.addCriterion("movieid not between", value1, value2, "movieid");
            return (Criteria)this;
        }

        public Criteria andMovienameIsNull() {
            this.addCriterion("moviename is null");
            return (Criteria)this;
        }

        public Criteria andMovienameIsNotNull() {
            this.addCriterion("moviename is not null");
            return (Criteria)this;
        }

        public Criteria andMovienameEqualTo(String value) {
            this.addCriterion("moviename =", value, "moviename");
            return (Criteria)this;
        }

        public Criteria andMovienameNotEqualTo(String value) {
            this.addCriterion("moviename <>", value, "moviename");
            return (Criteria)this;
        }

        public Criteria andMovienameGreaterThan(String value) {
            this.addCriterion("moviename >", value, "moviename");
            return (Criteria)this;
        }

        public Criteria andMovienameGreaterThanOrEqualTo(String value) {
            this.addCriterion("moviename >=", value, "moviename");
            return (Criteria)this;
        }

        public Criteria andMovienameLessThan(String value) {
            this.addCriterion("moviename <", value, "moviename");
            return (Criteria)this;
        }

        public Criteria andMovienameLessThanOrEqualTo(String value) {
            this.addCriterion("moviename <=", value, "moviename");
            return (Criteria)this;
        }

        public Criteria andMovienameLike(String value) {
            this.addCriterion("moviename like", value, "moviename");
            return (Criteria)this;
        }

        public Criteria andMovienameNotLike(String value) {
            this.addCriterion("moviename not like", value, "moviename");
            return (Criteria)this;
        }

        public Criteria andMovienameIn(List<String> values) {
            this.addCriterion("moviename in", values, "moviename");
            return (Criteria)this;
        }

        public Criteria andMovienameNotIn(List<String> values) {
            this.addCriterion("moviename not in", values, "moviename");
            return (Criteria)this;
        }

        public Criteria andMovienameBetween(String value1, String value2) {
            this.addCriterion("moviename between", value1, value2, "moviename");
            return (Criteria)this;
        }

        public Criteria andMovienameNotBetween(String value1, String value2) {
            this.addCriterion("moviename not between", value1, value2, "moviename");
            return (Criteria)this;
        }
    }
}
