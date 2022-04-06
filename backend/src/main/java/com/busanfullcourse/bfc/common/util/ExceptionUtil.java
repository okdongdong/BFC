package com.busanfullcourse.bfc.common.util;

public class ExceptionUtil {
    private ExceptionUtil() {
        throw new IllegalStateException(UTILITY_CLASS);
    }
    public static final String NO_USER = "회원이 없습니다.";
    public static final String NO_FULL_COURSE = "풀코스가 없습니다.";
    public static final String NO_PLACE = "장소가 없습니다.";
    public static final String NO_REVIEW = "찾으시는 리뷰가 없습니다.";
    public static final String NO_SCHEDULE = "스케쥴이 없습니다.";
    public static final String NO_MATCH_PASSWORD = "비밀번호가 일치하지 않습니다."; //NOSONAR
    public static final String UTILITY_CLASS = "유틸리티 클래스입니다.";
}
