package com.busanfullcourse.bfc;

import com.busanfullcourse.bfc.db.repository.elasticsearch.PlaceSearchRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(excludeFilters = @ComponentScan.Filter(
		type = FilterType.ASSIGNABLE_TYPE,
		classes = PlaceSearchRepository.class
))
@SpringBootApplication
public class BfcApplication {

	public static void main(String[] args) {
		SpringApplication.run(BfcApplication.class, args);
	}

}
