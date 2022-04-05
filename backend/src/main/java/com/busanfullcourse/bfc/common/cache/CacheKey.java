package com.busanfullcourse.bfc.common.cache;

import lombok.Getter;

@Getter
public class CacheKey {

    public static final String USER = "user";
    public static final int DEFAULT_EXPIRE_SEC = 60;

    public static final String POPULAR_RESTAURANT = "popularRestaurant";
    public static final String POPULAR_ATTRACTION = "popularAttraction";
    public static final int POPULAR_EXPIRE_HOUR = 24;
}
