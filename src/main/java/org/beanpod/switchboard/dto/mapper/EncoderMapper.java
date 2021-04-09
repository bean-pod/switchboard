package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.openapitools.model.EncoderModel;

@Mapper(
    componentModel = "spring",
    uses = {DeviceMapper.class, OutputChannelMapper.class, DateMapper.class},
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface EncoderMapper {

  EncoderModel toEncoderModel(EncoderDto encoderDto);

  List<EncoderModel> toEncoderModels(List<EncoderDto> encoderDtos);

  EncoderDto toEncoderDto(EncoderModel encoderModel);

  EncoderDto toEncoderDto(EncoderEntity encoderEntity);

  @Named("toEncoderDtoShallow")
  @Mapping(target = "output", ignore = true)
  EncoderDto toEncoderDtoShallow(EncoderEntity encoderEntity);

  List<EncoderDto> toEncoderDtos(List<EncoderEntity> encoderEntities);

  EncoderEntity toEncoderEntity(EncoderDto encoderDto);

  void updateEncoderFromDto(EncoderDto dto, @MappingTarget EncoderDto target);
}
