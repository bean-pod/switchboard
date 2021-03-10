package org.beanpod.switchboard.repository;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends JpaRepository<DeviceEntity, String> {

  DeviceEntity save(DeviceEntity device);

  // General data access methods

  List<DeviceEntity> findAll();
  Optional<DeviceEntity> findDeviceBySerialNumber(String serialNumber);
  Long deleteDeviceEntitiesBySerialNumber(String serialNumber);

  // Ownership data access methods

  List<DeviceEntity> findDeviceEntitiesByUser(UserEntity user);
  Optional<DeviceEntity> findDeviceByUserAndSerialNumber(UserEntity user, String serialNumber);
  Long deleteDeviceEntitiesByUserAndSerialNumber(UserEntity user, String serialNumber);

  // The following update query is never used, and save is more appropriate for updates
  // I'm confused as to why this query was created?

  @Modifying
  @Query(
      "Update Device de set de.status = :status,"
          + " de.displayName = :displayName"
          + " where de.serialNumber = :oldSerialNumber")
  int updateDevice(
      @Param(value = "oldSerialNumber") String oldSerialNumber,
      @Param(value = "displayName") String displayName,
      @Param(value = "status") String status);
}
