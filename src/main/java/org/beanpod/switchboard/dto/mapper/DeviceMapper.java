package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.CreateDeviceRequest;
import org.openapitools.model.DeviceModel;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DeviceMapper {

    DeviceDto toDeviceDto(DeviceEntity deviceEntity);

    List<DeviceDto> toDeviceDtos(List<DeviceEntity> deviceEntities);

    DeviceDto toDeviceDto(DeviceModel deviceModel);

    @Mapping(source = "publicIpAddress", target = "publicIpAddress")
    DeviceDto toDeviceDto(CreateDeviceRequest createDeviceRequest, String publicIpAddress);

    DeviceEntity toDeviceEntity(DeviceDto deviceDto);

    DeviceModel toDeviceModel(DeviceDto deviceDto);

    List<DeviceModel> toDeviceModelList(List<DeviceDto> deviceDtos);
}
