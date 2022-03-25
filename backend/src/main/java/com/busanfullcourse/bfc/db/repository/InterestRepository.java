package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterestRepository extends JpaRepository<Interest,Long> {
        Optional<Interest> findByPlacePlaceIdAndUserUsername(Long placeId, String username);
}
