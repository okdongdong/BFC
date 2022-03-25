package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.CustomPlace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomPlaceRepository extends JpaRepository<CustomPlace, Long> {

    Page<CustomPlace> findAllByUserUsername(String username, Pageable pageable);
}
