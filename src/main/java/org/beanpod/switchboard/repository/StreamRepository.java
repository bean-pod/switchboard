package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.StreamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StreamRepository extends JpaRepository<StreamEntity, Long> {

    @Query(
            "SELECT id FROM Stream"
    )
    public List<Long> getAllUuid();
 }
