package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.WishFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishFoodRepository extends JpaRepository<WishFood, Long> {
}
