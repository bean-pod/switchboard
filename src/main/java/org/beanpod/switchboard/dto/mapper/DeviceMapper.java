package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.openapitools.model.CreateDeviceRequest;
import org.openapitools.model.DeviceModel;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    uses = {UserMapper.class})
public interface DeviceMapper {

  DeviceDto toDto(DeviceEntity deviceEntity);

  DeviceDto toDto(DeviceModel deviceModel);

  @Mapping(source = "publicIpAddress", target = "publicIpAddress")
  @Mapping(source = "user", target = "user")
  DeviceDto toDto(UserEntity user, CreateDeviceRequest createDeviceRequest, String publicIpAddress);

  List<DeviceDto> toDtos(List<DeviceEntity> deviceEntities);

  DeviceEntity toEntity(DeviceDto deviceDto);

  DeviceModel toModel(DeviceDto deviceDto);

  List<DeviceModel> toModels(List<DeviceDto> deviceDtos);

  void updateDeviceFromDto(DeviceDto dto, @MappingTarget DeviceDto target);
}
