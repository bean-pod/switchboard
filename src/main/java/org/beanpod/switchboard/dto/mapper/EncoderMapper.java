package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.mapstruct.Mapper;

@Mapper(
    componentModel = "spring",
    uses = {DeviceMapper.class, OutputChannelMapper.class})
public interface EncoderMapper {
  EncoderDto toEncoderDto(EncoderEntity encoderEntity);

  List<EncoderDto> toEncoderDtos(List<EncoderEntity> encoderEntities);

  EncoderEntity toEncoderEntity(EncoderDto encoderDto);
}
