package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
    componentModel = "spring",
    uses = {DeviceMapper.class, OutputChannelMapper.class},
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface EncoderMapper {

  EncoderDto toDto(EncoderEntity encoderEntity);

  @Named("toEncoderDtoShallow")
  @Mapping(target = "output", ignore = true)
  EncoderDto toDtoShallow(EncoderEntity encoderEntity);

  List<EncoderDto> toDtos(List<EncoderEntity> encoderEntities);

  EncoderEntity toEntity(EncoderDto encoderDto);

  void updateEncoderFromDto(EncoderDto dto, @MappingTarget EncoderDto target);
}
