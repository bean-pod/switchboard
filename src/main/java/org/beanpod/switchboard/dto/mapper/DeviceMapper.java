package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.DeviceDTO;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.DeviceModel;

import java.util.List;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface DeviceMapper {
    DeviceMapper INSTANCE = Mappers.getMapper(DeviceMapper.class);
    DeviceDTO toDeviceDTO(DeviceEntity deviceEntity);
    List<DeviceDTO> toDeviceDTOs(List<DeviceEntity> deviceEntities);
    DeviceEntity toDeviceEntity(DeviceDTO deviceDTO);
    DeviceModel toDeviceModel(DeviceDTO deviceDto);
}
