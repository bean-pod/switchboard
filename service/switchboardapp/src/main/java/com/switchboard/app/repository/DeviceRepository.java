package com.switchboard.app.repository;

import com.switchboard.app.domain.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device,String> {

    Device save(Device device);
    List<Device> findAll();
    Optional<Device> findDeviceBySerialNumber(String serialNumber);

}
