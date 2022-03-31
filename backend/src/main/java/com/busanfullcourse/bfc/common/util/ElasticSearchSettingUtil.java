package com.busanfullcourse.bfc.common.util;

import com.busanfullcourse.bfc.api.service.ElasticSearchService;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Component
public class ElasticSearchSettingUtil {

    private final ElasticSearchService elasticSearchService;

    public ElasticSearchSettingUtil(ElasticSearchService elasticSearchService) {
        this.elasticSearchService = elasticSearchService;
    }


//    @PostConstruct
//    public void init() {
//        elasticSearchService.saveAll();
//    }
//
//    @PreDestroy
//    public void close() {
//        elasticSearchService.deleteAll();
//    }
}
