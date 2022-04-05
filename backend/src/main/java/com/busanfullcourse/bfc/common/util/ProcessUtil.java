package com.busanfullcourse.bfc.common.util;


import java.util.Arrays;
import java.util.List;


public class ProcessUtil {

    public static List<String> processOpenTime(String openTime) {
        return Arrays.asList(openTime.split("\\|"));
    }
}
