package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.openapitools.model.DecoderModel;

@Mapper(
    componentModel = "spring",
    uses = {DeviceMapper.class, InputChannelMapper.class, DateMapper.class},
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface DecoderMapper {

  DecoderModel toDecoderModel(DecoderDto decoderDto);

  List<DecoderModel> toDecoderModels(List<DecoderDto> decoderDtos);

  DecoderDto toDecoderDto(DecoderModel decoderModel);

  DecoderDto toDecoderDto(DecoderEntity decoderEntity);

  @Named("toDecoderDtoShallow")
  @Mapping(target = "input", ignore = true)
  DecoderDto toDecoderDtoShallow(DecoderEntity decoderEntity);

  List<DecoderDto> toDecoderDtos(List<DecoderEntity> decoderEntities);

  DecoderEntity toDecoderEntity(DecoderDto decoderDto);

  void updateDecoderFromDto(DecoderDto dto, @MappingTarget DecoderDto target);
}
