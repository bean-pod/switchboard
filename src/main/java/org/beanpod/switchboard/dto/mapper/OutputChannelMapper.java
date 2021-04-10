package org.beanpod.switchboard.dto.mapper;

import java.util.Set;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
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
}
