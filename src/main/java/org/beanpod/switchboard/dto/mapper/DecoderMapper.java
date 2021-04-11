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

  @Mapping(target = "input", qualifiedByName = "inputChannelDtoSetToInputChannelModelListShallow")
  DecoderModel toModel(DecoderDto decoderDto);

  List<DecoderModel> toModels(List<DecoderDto> decoderDtos);

  DecoderDto toDto(DecoderModel decoderModel);

  DecoderDto toDto(DecoderEntity decoderEntity);

  @Named("toDecoderDtoShallow")
  @Mapping(target = "input", ignore = true)
  DecoderDto toDtoShallow(DecoderEntity decoderEntity);

  List<DecoderDto> toDtos(List<DecoderEntity> decoderEntities);

  DecoderEntity toEntity(DecoderDto decoderDto);

  void updateDecoderFromDto(DecoderDto dto, @MappingTarget DecoderDto target);
}
