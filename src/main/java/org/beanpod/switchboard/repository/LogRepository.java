package org.beanpod.switchboard.repository;

import java.util.List;
import org.beanpod.switchboard.entity.LogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Ownership data access methods are pending updates to LogEntity. The LogEntity
// serial_number should be a foreign key relationship to the device's serial number
// that created the log.

@Repository
public interface LogRepository extends JpaRepository<LogEntity, Long> {

  LogEntity save(LogEntity logEntity);

  List<LogEntity> findAll();

  List<LogEntity> findBySerialNumber(String serialNumber);
}
