package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.common.jwt.LogoutAccessToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogoutAccessTokenRedisRepository extends CrudRepository<LogoutAccessToken, String> {
}
