package com.switchboard.app.dao.impl;

import com.switchboard.app.dao.DeviceDao;
import com.switchboard.app.domain.Device;
import com.switchboard.app.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DeviceDaoImpl implements DeviceDao {

    //Connect to the database
    @Autowired
    DeviceRepository deviceRepository;

    @Override
    public Device addDevice(Device device) {
        return deviceRepository.save(device);
    }

    @Override
    public Optional<Device> findDevice(String serialNumber) {
        return deviceRepository.findById(serialNumber);
    }

    @Override
    public List<Device> getDevices() {
        return deviceRepository.findAll();
    }
}
