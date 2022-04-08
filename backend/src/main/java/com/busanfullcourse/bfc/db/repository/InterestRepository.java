package com.busanfullcourse.bfc.db.repository;

import com.busanfullcourse.bfc.db.entity.Interest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterestRepository extends JpaRepository<Interest,Long> {
        Optional<Interest> findByPlacePlaceIdAndUserUsername(Long placeId, String username);

        List<Interest> findTop6ByUserIdOrderByInterestIdDesc(Long userId);

        Page<Interest> findAllByUserId(Long userId, Pageable pageable);

        @Query(value = "select i.place_id, if(i.place_id in (select c.place_id from (\n" +
                "select s.place_id, f.user_id, f.finished_on\n" +
                "from full_course as f \n" +
                "left outer join `schedule` as s on f.full_course_id=s.full_course_id\n" +
                "where f.finished_on < DATE_FORMAT(CURDATE() - 1, '%Y-%m-%d')\n" +
                ") as c), 'true', 'false') as clear\n" +
                "from interest as i " +
                "where i.user_id=:userId \n" +
                "order by i.place_id desc;", nativeQuery = true)
         List<Object[]> checkInterestStageClear(@Param("userId") Long userId);
}
