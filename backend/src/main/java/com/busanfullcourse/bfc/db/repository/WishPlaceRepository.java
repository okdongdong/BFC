package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.WishPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishPlaceRepository extends JpaRepository<WishPlace, Long> {
}
