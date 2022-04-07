package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Interest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterestRepository extends JpaRepository<Interest,Long> {
        Optional<Interest> findByPlacePlaceIdAndUserUsername(Long placeId, String username);

        List<Interest> findTop6ByUserIdOrderByInterestIdDesc(Long userId);

        Page<Interest> findAllByUserId(Long userId, Pageable pageable);
}
