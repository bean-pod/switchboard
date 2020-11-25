package org.beanpod.switchboard.dto.mapper;

import java.util.Set;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
    componentModel = "spring",
    uses = {EncoderMapper.class, ChannelMapper.class})
public interface OutputChannelMapper {
  @Mapping(target = "encoder", ignore = true)
  OutputChannelDto toOutputChannelDto(OutputChannelEntity outputChannelEntity);

  @Mapping(target = "encoder", ignore = true)
  Set<OutputChannelDto> toOutputChannelDtos(Set<OutputChannelEntity> outputChannelEntities);

  OutputChannelEntity toOutputChannelEntity(OutputChannelDto outputChannelDto);
}
