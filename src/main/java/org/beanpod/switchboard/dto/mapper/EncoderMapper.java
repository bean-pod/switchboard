package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(
    componentModel = "spring",
    uses = {DeviceMapper.class, OutputChannelMapper.class})
public interface EncoderMapper {
  EncoderDto toEncoderDto(EncoderEntity encoderEntity);

  @Named("toEncoderDtoShallow")
  @Mapping(target = "output", ignore = true)
  EncoderDto toEncoderDtoShallow(EncoderEntity encoderEntity);

  List<EncoderDto> toEncoderDtos(List<EncoderEntity> encoderEntities);

  EncoderEntity toEncoderEntity(EncoderDto encoderDto);
}
