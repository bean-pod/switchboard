package org.beanpod.switchboard.dao;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.repository.DeviceRepository;
import org.beanpod.switchboard.util.MaintainDeviceStatus;
import org.openapitools.model.CreateDeviceRequest;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DeviceDaoImpl {

  private final DeviceRepository deviceRepository;
  private final DeviceMapper deviceMapper;

  public DeviceDto save(DeviceDto device) {
    Optional<DeviceDto> deviceDto = findDevice(device.getSerialNumber());
    deviceMapper.updateDeviceFromDto(device, deviceDto.orElse(null));
    return deviceMapper.toDeviceDto(
        deviceRepository.save(deviceMapper.toDeviceEntity(deviceDto.orElse(null))));
  }

  // General data access methods

  public DeviceDto createDevice(CreateDeviceRequest createDeviceRequest, String publicIpAddress) {
    DeviceDto deviceDto = deviceMapper.toDeviceDto(createDeviceRequest, publicIpAddress);
    deviceDto.setStatus(MaintainDeviceStatus.OFFLINE_STATUS);
    DeviceEntity deviceEntity = deviceMapper.toDeviceEntity(deviceDto);
    DeviceEntity savedDeviceEntity = deviceRepository.save(deviceEntity);
    return deviceMapper.toDeviceDto(savedDeviceEntity);
  }

  public List<DeviceEntity> getDevices() {
    return deviceRepository.findAll();
  }

  public Optional<DeviceDto> findDevice(String serialNumber) {
    return deviceRepository.findDeviceBySerialNumber(serialNumber).map(deviceMapper::toDeviceDto);
  }

  public Long deleteDevice(String serialNumber) {
    return deviceRepository.deleteDeviceEntitiesBySerialNumber(serialNumber);
  }

  // Ownership data access methods

  public DeviceDto createDevice(UserEntity user, CreateDeviceRequest createDeviceRequest, String publicIpAddress) {
    DeviceDto deviceDto = deviceMapper.toDeviceDto(user, createDeviceRequest, publicIpAddress);
    deviceDto.setStatus(MaintainDeviceStatus.OFFLINE_STATUS);
    DeviceEntity deviceEntity = deviceMapper.toDeviceEntity(deviceDto);
    DeviceEntity savedDeviceEntity = deviceRepository.save(deviceEntity);
    return deviceMapper.toDeviceDto(savedDeviceEntity);
  }

  public List<DeviceEntity> getDevices(UserEntity user) {
    return deviceRepository.findDeviceEntitiesByUser(user);
  }

  public Optional<DeviceDto> findDevice(UserEntity user, String serialNumber) {
    return deviceRepository.findDeviceByUserAndSerialNumber(user, serialNumber).map(deviceMapper::toDeviceDto);
  }

  public Long deleteDevice(UserEntity user, String serialNumber) {
    return deviceRepository.deleteDeviceEntitiesByUserAndSerialNumber(user, serialNumber);
  }
}
