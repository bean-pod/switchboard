package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.mapstruct.Mapper;

@Mapper(
    componentModel = "spring",
    uses = {DeviceMapper.class, OutputChannelMapper.class})
public interface EncoderMapper {
  EncoderDTO toEncoderDTO(EncoderEntity encoderEntity);

  List<EncoderDTO> toEncoderDTOs(List<EncoderEntity> encoderEntities);

  EncoderEntity toEncoderEntity(EncoderDTO encoderDTO);
}
