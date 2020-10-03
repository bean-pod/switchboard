package com.switchboard.app.dao;
import com.switchboard.app.domain.Device;
import com.switchboard.app.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DeviceDaoImpl  {

    //Connect to the database
    @Autowired
    DeviceRepository deviceRepository;

    public Device save(Device device) {
        return deviceRepository.save(device);
    }

    public Optional<Device> findDevice(String serialNumber) {
        return deviceRepository.findDeviceBySerialNumber(serialNumber);
    }

    public List<Device> getDevices() {
        return deviceRepository.findAll();
    }
}
