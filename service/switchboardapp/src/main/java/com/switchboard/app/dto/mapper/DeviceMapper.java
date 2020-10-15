package com.switchboard.app.dto.mapper;

import com.switchboard.app.dto.DeviceDTO;
import com.switchboard.app.entity.DecoderEntity;
import com.switchboard.app.entity.DeviceEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface DeviceMapper {

    DeviceDTO toDeviceDTO(DecoderEntity decoderEntity);
    List<DeviceDTO> toDeviceDTOs(List<DecoderEntity> decoderEntitys);
    DeviceEntity toDeviceEntity(DeviceDTO deviceDTO);

}
