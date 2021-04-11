package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import java.util.Set;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.openapitools.model.OutputChannelModel;

@Mapper(
    componentModel = "spring",
    uses = {EncoderMapper.class, ChannelMapper.class})
public interface OutputChannelMapper {

  @Mapping(target = "encoder", qualifiedByName = "toEncoderDtoShallow")
  OutputChannelDto toDto(OutputChannelEntity outputChannelEntity);

  @Mapping(target = "encoder", ignore = true)
  Set<OutputChannelDto> toDtos(Set<OutputChannelEntity> outputChannelEntities);

  OutputChannelEntity toEntity(OutputChannelDto outputChannelDto);

  OutputChannelModel toModel(OutputChannelDto outputChannelDto);

  @Named("outputChannelDtoToOutputChannelModelShallow")
  @Mapping(target = "encoder", ignore = true)
  OutputChannelModel outputChannelDtoToOutputChannelModelShallow(OutputChannelDto outputChannelDto);

  @Named("outputChannelDtosToOutputChannelModelsShallow")
  @IterableMapping(qualifiedByName = "outputChannelDtoToOutputChannelModelShallow")
  List<OutputChannelModel> outputChannelDtosToOutputChannelModelsShallow(
      Set<OutputChannelDto> outputChannelDto);
}
