package com.switchboard.app.dao;

import com.switchboard.app.domain.Device;

import java.util.List;
import java.util.Optional;

public interface DeviceDao {

    Device addDevice(Device device);
    Optional<Device> findDevice(String serialNumber);
    List<Device> getDevices();
}
