package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Follow;
import com.busanfullcourse.bfc.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    Optional<Follow> findByFromUserAndToUser(User fromUser, User toUser);

}
