package com.busanfullcourse.bfc.common.util;


import java.util.Arrays;
import java.util.List;


public class ProcessUtil {

    private ProcessUtil() {
        throw new IllegalStateException(ExceptionUtil.UTILITY_CLASS);
    }
    public static List<String> processOpenTime(String openTime) {
        return Arrays.asList(openTime.split("\\|"));
    }
}
