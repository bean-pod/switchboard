package com.switchboard.app.dto.mapper;

import com.switchboard.app.dto.DeviceDTO;
import com.switchboard.app.entity.DeviceEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DeviceMapper {

    DeviceMapper INSTANCE = Mappers.getMapper(DeviceMapper.class);

    DeviceDTO toDeviceDTO(DeviceEntity deviceEntity);

    List<DeviceDTO> toDeviceDTOs(List<DeviceEntity> deviceEntitys);

    DeviceEntity toDeviceEntity(DeviceDTO deviceDTO);

}
