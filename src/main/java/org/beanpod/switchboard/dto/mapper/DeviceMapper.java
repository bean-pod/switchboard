package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.DeviceModel;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DeviceMapper {
  DeviceDto toDeviceDto(DeviceEntity deviceEntity);

  List<DeviceDto> toDeviceDtos(List<DeviceEntity> deviceEntities);

  DeviceEntity toDeviceEntity(DeviceDto deviceDto);

  DeviceModel toDeviceModel(DeviceDto deviceDto);
}
