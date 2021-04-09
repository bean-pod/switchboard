package org.beanpod.switchboard.repository;

import java.util.List;
import org.beanpod.switchboard.entity.LogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends JpaRepository<LogEntity, Long> {

  LogEntity save(LogEntity logEntity);

  @Query(
      value =
          "select lo.id, lo.level, lo.message, lo.serial_number, lo.date_time "
              + "from log_entity lo, user us, device de "
              + "where us.id = de.user_id and us.id = :id and de.serial_number = lo.serial_number",
      nativeQuery = true)
  List<LogEntity> findAll(@Param("id") Long user_id);

  @Query(
      value =
          "select lo.id, lo.level, lo.message, lo.serial_number, lo.date_time "
              + "from log_entity lo, user us, device de "
              + "where us.id = de.user_id and us.id = :id and de.serial_number = lo.serial_number "
              + "and lo.serial_number= :serial",
      nativeQuery = true)
  List<LogEntity> findBySerialNumber(
      @Param("serial") String serialNumber, @Param("id") Long user_id);
}
