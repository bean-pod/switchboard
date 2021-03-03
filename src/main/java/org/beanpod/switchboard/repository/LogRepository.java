package org.beanpod.switchboard.repository;

import java.util.List;
import org.beanpod.switchboard.entity.LogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends JpaRepository<LogEntity, Long> {

  LogEntity save(LogEntity logEntity);

  List<LogEntity> findAll();

  List<LogEntity> findBySerialNumber(String serialNumber);
}
