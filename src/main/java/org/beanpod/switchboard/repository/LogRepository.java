package org.beanpod.switchboard.repository;

import java.util.List;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.entity.LogEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends JpaRepository<LogEntity, Long> {

  LogEntity save(LogEntity logEntity);

  @Query(
      value =
          "select lo.id, lo.level, lo.message, lo.serial_number, lo.date_time "
              + "from log_entity lo, user us, device de "
              + "where us.id = de.user_id and us.id = ?1 and de.serial_number = lo.serial_number", nativeQuery = true)
  List<LogEntity> findAll(Long user_id);

  List<LogEntity> findBySerialNumber(String serialNumber);
}
