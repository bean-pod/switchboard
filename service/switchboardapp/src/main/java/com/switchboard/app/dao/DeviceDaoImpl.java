package com.switchboard.app.dao;

import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DeviceDaoImpl {

    //Connect to the database
    @Autowired
    DeviceRepository deviceRepository;

    public DeviceEntity save(DeviceEntity device) {
        return deviceRepository.save(device);
    }

    public Optional<DeviceEntity> findDevice(String serialNumber) {
        return deviceRepository.findDeviceBySerialNumber(serialNumber);
    }

    public List<DeviceEntity> getDevices() {
        return deviceRepository.findAll();
    }

    public Long deleteDevice(String serialNumber) {
        return deviceRepository.deleteDeviceEntitiesBySerialNumber(serialNumber);
    }

    public int updateDevice(String serialNumber, DeviceEntity deviceEntity){
       return deviceRepository.updateDevice(serialNumber, deviceEntity.getDisplayName(),
               deviceEntity.getStatus(),
               deviceEntity.getSerialNumber());
    }
}
