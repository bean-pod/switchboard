package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.DeviceDTO;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.CreateDeviceRequest;
import org.openapitools.model.DeviceModel;

@Mapper(componentModel = "spring")
public interface DeviceMapper {
  DeviceDTO toDeviceDTO(DeviceEntity deviceEntity);

  List<DeviceDTO> toDeviceDTOs(List<DeviceEntity> deviceEntities);

  DeviceEntity toDeviceEntity(DeviceDTO deviceDTO);

  DeviceModel toDeviceModel(DeviceDTO deviceDto);

  List<DeviceModel> toDeviceModels(List<DeviceDTO> deviceDtos);

  @Mapping(source = "publicIpAddress", target = "publicIpAddress")
  DeviceDTO toDeviceDto(CreateDeviceRequest createDeviceRequest, String publicIpAddress);
}
