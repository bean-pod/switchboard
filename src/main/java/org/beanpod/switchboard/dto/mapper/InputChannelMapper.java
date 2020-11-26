package org.beanpod.switchboard.dto.mapper;

import java.util.Set;
import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.InputChannelModel;

@Mapper(
    componentModel = "spring",
    uses = {DecoderMapper.class, ChannelMapper.class})
public interface InputChannelMapper {
  @Mapping(target = "decoder", qualifiedByName = "toDecoderDTOShallow")
  InputChannelDTO toInputChannelDTO(InputChannelEntity inputChannelEntity);

  @Mapping(target = "decoder", ignore = true)
  Set<InputChannelDTO> toInputChannelDTOs(Set<InputChannelEntity> inputChannelEntities);

  InputChannelEntity toInputChannelEntity(InputChannelDTO inputChannelDTO);

  @Mapping(target = "name", source = "channel.name")
  @Mapping(target = "port", source = "channel.port")
  InputChannelModel inputChannelDTOToInputChannelModel(InputChannelDTO inputChannelDTO);
}
