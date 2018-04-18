package com.dream.po;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MovieExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MovieExample() {
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

        public Criteria andMovieidIsNull() {
            addCriterion("movieid is null");
            return (Criteria) this;
        }

        public Criteria andMovieidIsNotNull() {
            addCriterion("movieid is not null");
            return (Criteria) this;
        }

        public Criteria andMovieidEqualTo(Integer value) {
            addCriterion("movieid =", value, "movieid");
            return (Criteria) this;
        }

        public Criteria andMovieidNotEqualTo(Integer value) {
            addCriterion("movieid <>", value, "movieid");
            return (Criteria) this;
        }

        public Criteria andMovieidGreaterThan(Integer value) {
            addCriterion("movieid >", value, "movieid");
            return (Criteria) this;
        }

        public Criteria andMovieidGreaterThanOrEqualTo(Integer value) {
            addCriterion("movieid >=", value, "movieid");
            return (Criteria) this;
        }

        public Criteria andMovieidLessThan(Integer value) {
            addCriterion("movieid <", value, "movieid");
            return (Criteria) this;
        }

        public Criteria andMovieidLessThanOrEqualTo(Integer value) {
            addCriterion("movieid <=", value, "movieid");
            return (Criteria) this;
        }

        public Criteria andMovieidIn(List<Integer> values) {
            addCriterion("movieid in", values, "movieid");
            return (Criteria) this;
        }

        public Criteria andMovieidNotIn(List<Integer> values) {
            addCriterion("movieid not in", values, "movieid");
            return (Criteria) this;
        }

        public Criteria andMovieidBetween(Integer value1, Integer value2) {
            addCriterion("movieid between", value1, value2, "movieid");
            return (Criteria) this;
        }

        public Criteria andMovieidNotBetween(Integer value1, Integer value2) {
            addCriterion("movieid not between", value1, value2, "movieid");
            return (Criteria) this;
        }

        public Criteria andMovienameIsNull() {
            addCriterion("moviename is null");
            return (Criteria) this;
        }

        public Criteria andMovienameIsNotNull() {
            addCriterion("moviename is not null");
            return (Criteria) this;
        }

        public Criteria andMovienameEqualTo(String value) {
            addCriterion("moviename =", value, "moviename");
            return (Criteria) this;
        }

        public Criteria andMovienameNotEqualTo(String value) {
            addCriterion("moviename <>", value, "moviename");
            return (Criteria) this;
        }

        public Criteria andMovienameGreaterThan(String value) {
            addCriterion("moviename >", value, "moviename");
            return (Criteria) this;
        }

        public Criteria andMovienameGreaterThanOrEqualTo(String value) {
            addCriterion("moviename >=", value, "moviename");
            return (Criteria) this;
        }

        public Criteria andMovienameLessThan(String value) {
            addCriterion("moviename <", value, "moviename");
            return (Criteria) this;
        }

        public Criteria andMovienameLessThanOrEqualTo(String value) {
            addCriterion("moviename <=", value, "moviename");
            return (Criteria) this;
        }

        public Criteria andMovienameLike(String value) {
            addCriterion("moviename like", value, "moviename");
            return (Criteria) this;
        }

        public Criteria andMovienameNotLike(String value) {
            addCriterion("moviename not like", value, "moviename");
            return (Criteria) this;
        }

        public Criteria andMovienameIn(List<String> values) {
            addCriterion("moviename in", values, "moviename");
            return (Criteria) this;
        }

        public Criteria andMovienameNotIn(List<String> values) {
            addCriterion("moviename not in", values, "moviename");
            return (Criteria) this;
        }

        public Criteria andMovienameBetween(String value1, String value2) {
            addCriterion("moviename between", value1, value2, "moviename");
            return (Criteria) this;
        }

        public Criteria andMovienameNotBetween(String value1, String value2) {
            addCriterion("moviename not between", value1, value2, "moviename");
            return (Criteria) this;
        }

        public Criteria andShowyearIsNull() {
            addCriterion("showyear is null");
            return (Criteria) this;
        }

        public Criteria andShowyearIsNotNull() {
            addCriterion("showyear is not null");
            return (Criteria) this;
        }

        public Criteria andShowyearEqualTo(Date value) {
            addCriterion("showyear =", value, "showyear");
            return (Criteria) this;
        }

        public Criteria andShowyearNotEqualTo(Date value) {
            addCriterion("showyear <>", value, "showyear");
            return (Criteria) this;
        }

        public Criteria andShowyearGreaterThan(Date value) {
            addCriterion("showyear >", value, "showyear");
            return (Criteria) this;
        }

        public Criteria andShowyearGreaterThanOrEqualTo(Date value) {
            addCriterion("showyear >=", value, "showyear");
            return (Criteria) this;
        }

        public Criteria andShowyearLessThan(Date value) {
            addCriterion("showyear <", value, "showyear");
            return (Criteria) this;
        }

        public Criteria andShowyearLessThanOrEqualTo(Date value) {
            addCriterion("showyear <=", value, "showyear");
            return (Criteria) this;
        }

        public Criteria andShowyearIn(List<Date> values) {
            addCriterion("showyear in", values, "showyear");
            return (Criteria) this;
        }

        public Criteria andShowyearNotIn(List<Date> values) {
            addCriterion("showyear not in", values, "showyear");
            return (Criteria) this;
        }

        public Criteria andShowyearBetween(Date value1, Date value2) {
            addCriterion("showyear between", value1, value2, "showyear");
            return (Criteria) this;
        }

        public Criteria andShowyearNotBetween(Date value1, Date value2) {
            addCriterion("showyear not between", value1, value2, "showyear");
            return (Criteria) this;
        }

        public Criteria andNationIsNull() {
            addCriterion("nation is null");
            return (Criteria) this;
        }

        public Criteria andNationIsNotNull() {
            addCriterion("nation is not null");
            return (Criteria) this;
        }

        public Criteria andNationEqualTo(String value) {
            addCriterion("nation =", value, "nation");
            return (Criteria) this;
        }

        public Criteria andNationNotEqualTo(String value) {
            addCriterion("nation <>", value, "nation");
            return (Criteria) this;
        }

        public Criteria andNationGreaterThan(String value) {
            addCriterion("nation >", value, "nation");
            return (Criteria) this;
        }

        public Criteria andNationGreaterThanOrEqualTo(String value) {
            addCriterion("nation >=", value, "nation");
            return (Criteria) this;
        }

        public Criteria andNationLessThan(String value) {
            addCriterion("nation <", value, "nation");
            return (Criteria) this;
        }

        public Criteria andNationLessThanOrEqualTo(String value) {
            addCriterion("nation <=", value, "nation");
            return (Criteria) this;
        }

        public Criteria andNationLike(String value) {
            addCriterion("nation like", value, "nation");
            return (Criteria) this;
        }

        public Criteria andNationNotLike(String value) {
            addCriterion("nation not like", value, "nation");
            return (Criteria) this;
        }

        public Criteria andNationIn(List<String> values) {
            addCriterion("nation in", values, "nation");
            return (Criteria) this;
        }

        public Criteria andNationNotIn(List<String> values) {
            addCriterion("nation not in", values, "nation");
            return (Criteria) this;
        }

        public Criteria andNationBetween(String value1, String value2) {
            addCriterion("nation between", value1, value2, "nation");
            return (Criteria) this;
        }

        public Criteria andNationNotBetween(String value1, String value2) {
            addCriterion("nation not between", value1, value2, "nation");
            return (Criteria) this;
        }

        public Criteria andDirectorIsNull() {
            addCriterion("director is null");
            return (Criteria) this;
        }

        public Criteria andDirectorIsNotNull() {
            addCriterion("director is not null");
            return (Criteria) this;
        }

        public Criteria andDirectorEqualTo(String value) {
            addCriterion("director =", value, "director");
            return (Criteria) this;
        }

        public Criteria andDirectorNotEqualTo(String value) {
            addCriterion("director <>", value, "director");
            return (Criteria) this;
        }

        public Criteria andDirectorGreaterThan(String value) {
            addCriterion("director >", value, "director");
            return (Criteria) this;
        }

        public Criteria andDirectorGreaterThanOrEqualTo(String value) {
            addCriterion("director >=", value, "director");
            return (Criteria) this;
        }

        public Criteria andDirectorLessThan(String value) {
            addCriterion("director <", value, "director");
            return (Criteria) this;
        }

        public Criteria andDirectorLessThanOrEqualTo(String value) {
            addCriterion("director <=", value, "director");
            return (Criteria) this;
        }

        public Criteria andDirectorLike(String value) {
            addCriterion("director like", value, "director");
            return (Criteria) this;
        }

        public Criteria andDirectorNotLike(String value) {
            addCriterion("director not like", value, "director");
            return (Criteria) this;
        }

        public Criteria andDirectorIn(List<String> values) {
            addCriterion("director in", values, "director");
            return (Criteria) this;
        }

        public Criteria andDirectorNotIn(List<String> values) {
            addCriterion("director not in", values, "director");
            return (Criteria) this;
        }

        public Criteria andDirectorBetween(String value1, String value2) {
            addCriterion("director between", value1, value2, "director");
            return (Criteria) this;
        }

        public Criteria andDirectorNotBetween(String value1, String value2) {
            addCriterion("director not between", value1, value2, "director");
            return (Criteria) this;
        }

        public Criteria andLeadactorsIsNull() {
            addCriterion("leadactors is null");
            return (Criteria) this;
        }

        public Criteria andLeadactorsIsNotNull() {
            addCriterion("leadactors is not null");
            return (Criteria) this;
        }

        public Criteria andLeadactorsEqualTo(String value) {
            addCriterion("leadactors =", value, "leadactors");
            return (Criteria) this;
        }

        public Criteria andLeadactorsNotEqualTo(String value) {
            addCriterion("leadactors <>", value, "leadactors");
            return (Criteria) this;
        }

        public Criteria andLeadactorsGreaterThan(String value) {
            addCriterion("leadactors >", value, "leadactors");
            return (Criteria) this;
        }

        public Criteria andLeadactorsGreaterThanOrEqualTo(String value) {
            addCriterion("leadactors >=", value, "leadactors");
            return (Criteria) this;
        }

        public Criteria andLeadactorsLessThan(String value) {
            addCriterion("leadactors <", value, "leadactors");
            return (Criteria) this;
        }

        public Criteria andLeadactorsLessThanOrEqualTo(String value) {
            addCriterion("leadactors <=", value, "leadactors");
            return (Criteria) this;
        }

        public Criteria andLeadactorsLike(String value) {
            addCriterion("leadactors like", value, "leadactors");
            return (Criteria) this;
        }

        public Criteria andLeadactorsNotLike(String value) {
            addCriterion("leadactors not like", value, "leadactors");
            return (Criteria) this;
        }

        public Criteria andLeadactorsIn(List<String> values) {
            addCriterion("leadactors in", values, "leadactors");
            return (Criteria) this;
        }

        public Criteria andLeadactorsNotIn(List<String> values) {
            addCriterion("leadactors not in", values, "leadactors");
            return (Criteria) this;
        }

        public Criteria andLeadactorsBetween(String value1, String value2) {
            addCriterion("leadactors between", value1, value2, "leadactors");
            return (Criteria) this;
        }

        public Criteria andLeadactorsNotBetween(String value1, String value2) {
            addCriterion("leadactors not between", value1, value2, "leadactors");
            return (Criteria) this;
        }

        public Criteria andScreenwriterIsNull() {
            addCriterion("screenwriter is null");
            return (Criteria) this;
        }

        public Criteria andScreenwriterIsNotNull() {
            addCriterion("screenwriter is not null");
            return (Criteria) this;
        }

        public Criteria andScreenwriterEqualTo(String value) {
            addCriterion("screenwriter =", value, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andScreenwriterNotEqualTo(String value) {
            addCriterion("screenwriter <>", value, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andScreenwriterGreaterThan(String value) {
            addCriterion("screenwriter >", value, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andScreenwriterGreaterThanOrEqualTo(String value) {
            addCriterion("screenwriter >=", value, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andScreenwriterLessThan(String value) {
            addCriterion("screenwriter <", value, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andScreenwriterLessThanOrEqualTo(String value) {
            addCriterion("screenwriter <=", value, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andScreenwriterLike(String value) {
            addCriterion("screenwriter like", value, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andScreenwriterNotLike(String value) {
            addCriterion("screenwriter not like", value, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andScreenwriterIn(List<String> values) {
            addCriterion("screenwriter in", values, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andScreenwriterNotIn(List<String> values) {
            addCriterion("screenwriter not in", values, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andScreenwriterBetween(String value1, String value2) {
            addCriterion("screenwriter between", value1, value2, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andScreenwriterNotBetween(String value1, String value2) {
            addCriterion("screenwriter not between", value1, value2, "screenwriter");
            return (Criteria) this;
        }

        public Criteria andPictureIsNull() {
            addCriterion("picture is null");
            return (Criteria) this;
        }

        public Criteria andPictureIsNotNull() {
            addCriterion("picture is not null");
            return (Criteria) this;
        }

        public Criteria andPictureEqualTo(String value) {
            addCriterion("picture =", value, "picture");
            return (Criteria) this;
        }

        public Criteria andPictureNotEqualTo(String value) {
            addCriterion("picture <>", value, "picture");
            return (Criteria) this;
        }

        public Criteria andPictureGreaterThan(String value) {
            addCriterion("picture >", value, "picture");
            return (Criteria) this;
        }

        public Criteria andPictureGreaterThanOrEqualTo(String value) {
            addCriterion("picture >=", value, "picture");
            return (Criteria) this;
        }

        public Criteria andPictureLessThan(String value) {
            addCriterion("picture <", value, "picture");
            return (Criteria) this;
        }

        public Criteria andPictureLessThanOrEqualTo(String value) {
            addCriterion("picture <=", value, "picture");
            return (Criteria) this;
        }

        public Criteria andPictureLike(String value) {
            addCriterion("picture like", value, "picture");
            return (Criteria) this;
        }

        public Criteria andPictureNotLike(String value) {
            addCriterion("picture not like", value, "picture");
            return (Criteria) this;
        }

        public Criteria andPictureIn(List<String> values) {
            addCriterion("picture in", values, "picture");
            return (Criteria) this;
        }

        public Criteria andPictureNotIn(List<String> values) {
            addCriterion("picture not in", values, "picture");
            return (Criteria) this;
        }

        public Criteria andPictureBetween(String value1, String value2) {
            addCriterion("picture between", value1, value2, "picture");
            return (Criteria) this;
        }

        public Criteria andPictureNotBetween(String value1, String value2) {
            addCriterion("picture not between", value1, value2, "picture");
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