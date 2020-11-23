package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {DeviceMapper.class, OutputChannelMapper.class})
public interface EncoderMapper {
    EncoderDTO toEncoderDTO(EncoderEntity encoderEntity);
    List<EncoderDTO> toEncoderDTOs(List<EncoderEntity> encoderEntities);
    EncoderEntity toEncoderEntity(EncoderDTO encoderDTO);
}
