package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.StreamLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogStreamRepository extends JpaRepository<StreamLog, Long> {

  StreamLog save(StreamLog logEntity);
}
