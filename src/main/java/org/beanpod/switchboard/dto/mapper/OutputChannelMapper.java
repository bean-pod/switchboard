package org.beanpod.switchboard.dto.mapper;

import java.util.Set;
import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.OutputChannelModel;

@Mapper(
    componentModel = "spring",
    uses = {EncoderMapper.class, ChannelMapper.class})
public interface OutputChannelMapper {
  @Mapping(target = "encoder", qualifiedByName = "toEncoderDTOShallow")
  OutputChannelDTO toOutputChannelDTO(OutputChannelEntity outputChannelEntity);

  @Mapping(target = "encoder", ignore = true)
  Set<OutputChannelDTO> toOutputChannelDTOs(Set<OutputChannelEntity> outputChannelEntities);

  OutputChannelEntity toOutputChannelEntity(OutputChannelDTO outputChannelDTO);

  @Mapping(target = "name", source = "channel.name")
  @Mapping(target = "port", source = "channel.port")
  OutputChannelModel outputChannelDTOToOutputChannelModel(OutputChannelDTO outputChannelDTO);
}
