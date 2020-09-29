package com.switchboard.app.repository;

import com.switchboard.app.domain.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device,Long> {

}
