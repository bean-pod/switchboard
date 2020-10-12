package com.switchboard.app.repository;

import com.switchboard.app.domain.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<DeviceEntity, String> {

    DeviceEntity save(DeviceEntity device);

    List<DeviceEntity> findAll();

    Optional<DeviceEntity> findDeviceBySerialNumber(String serialNumber);

    Long deleteDeviceEntitiesBySerialNumber(String serialNumber);

    @Modifying
    @Query("Update Device de set de.status = :status," +
            " de.displayName = :displayName," +
            " de.serialNumber = :serialNumber" +
            " where de.serialNumber = :oldSerialNumber")
    int updateDevice(@Param(value = "oldSerialNumber") String oldSerialNumber,
                     @Param(value = "displayName") String displayName,
                     @Param(value = "status") String status,
                     @Param(value = "serialNumber") String serialNumber
    );
}
