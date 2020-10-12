package com.switchboard.app.repository;

import com.switchboard.app.domain.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<DeviceEntity,String> {

    DeviceEntity save(DeviceEntity device);
    List<DeviceEntity> findAll();
    Optional<DeviceEntity> findDeviceBySerialNumber(String serialNumber);
    Long deleteDeviceEntitiesBySerialNumber(String serialNumber);
}
