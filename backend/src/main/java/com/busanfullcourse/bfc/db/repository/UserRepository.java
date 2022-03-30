package com.busanfullcourse.bfc.db.repository;


import com.busanfullcourse.bfc.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByUsername(String username);

    Optional<User> findByNickname(String nickname);

    @Query("select u from User u join fetch u.authorities a where u.username = :username")
    Optional<User> findByUsernameWithAuthority(@Param("username") String username);
}
