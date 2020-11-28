package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.repository.DeviceRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DeviceDaoImpl {

  private final DeviceRepository deviceRepository;
  private final DeviceMapper deviceMapper;

  public DeviceDto save(DeviceDto device) {
    return deviceMapper.toDeviceDto(deviceRepository.save(deviceMapper.toDeviceEntity(device)));
  }

  public Optional<DeviceDto> findDevice(String serialNumber) {
    return deviceRepository.findDeviceBySerialNumber(serialNumber).map(deviceMapper::toDeviceDto);
  }

  public List<DeviceEntity> getDevices() {
    return deviceRepository.findAll();
  }

  public Long deleteDevice(String serialNumber) {
    return deviceRepository.deleteDeviceEntitiesBySerialNumber(serialNumber);
  }
}
