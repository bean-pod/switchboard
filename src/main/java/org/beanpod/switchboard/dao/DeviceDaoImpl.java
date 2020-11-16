package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.dto.DeviceDTO;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DeviceDaoImpl {

    //Connect to the database
    @Autowired
    DeviceRepository deviceRepository;

    @Autowired
    DeviceMapper deviceMapper;

    public DeviceDTO save(DeviceDTO device) {
        return deviceMapper.toDeviceDTO(deviceRepository
                .save(deviceMapper.toDeviceEntity(device)));
    }

    public Optional<DeviceDTO> findDevice(String serialNumber) {
        return deviceRepository.
                findDeviceBySerialNumber(serialNumber).map(device -> deviceMapper.toDeviceDTO(device));
    }

    public List<DeviceEntity> getDevices() {
        return deviceRepository.findAll();
    }

    public Long deleteDevice(String serialNumber) {
        return deviceRepository.deleteDeviceEntitiesBySerialNumber(serialNumber);
    }
}
