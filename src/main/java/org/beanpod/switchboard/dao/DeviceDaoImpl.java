package org.beanpod.switchboard.dao;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.repository.DeviceRepository;
import org.openapitools.model.CreateDeviceRequest;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DeviceDaoImpl {

  private final DeviceRepository deviceRepository;
  private final DeviceMapper deviceMapper;

  public DeviceDto save(DeviceDto device) {
    DeviceDto deviceDto = findDevice(device.getSerialNumber()).get();
    deviceMapper.updateDeviceFromDto(device, deviceDto);
    return deviceMapper.toDeviceDto(deviceRepository.save(deviceMapper.toDeviceEntity(deviceDto)));
  }

  public DeviceDto createDevice(CreateDeviceRequest createDeviceRequest, String publicIpAddress) {
    DeviceDto deviceDto = deviceMapper.toDeviceDto(createDeviceRequest, publicIpAddress);
    DeviceEntity deviceEntity = deviceMapper.toDeviceEntity(deviceDto);
    DeviceEntity savedDeviceEntity = deviceRepository.save(deviceEntity);
    return deviceMapper.toDeviceDto(savedDeviceEntity);
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
