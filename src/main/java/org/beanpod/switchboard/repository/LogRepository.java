package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.LogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<LogEntity, Long> {

  LogEntity save(LogEntity logEntity);

  List<LogEntity> findAll();

  // The Query covers three cases: 1- serialNumber = X,Y 2- serialNumber = Y,X 3- serialNumber = X
  @Query(
          "SELECT l FROM LogEntity l WHERE l.serialNumber LIKE CONCAT(?1,',%') OR l.serialNumber LIKE CONCAT('%,',?1) OR l.serialNumber = ?1")
  List<LogEntity> findBySerialNumber(String serialNumber);
}
