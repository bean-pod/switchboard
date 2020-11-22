package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;

@Mapper(componentModel = "spring", uses = {DecoderMapper.class, ChannelMapper.class})
public interface InputChannelMapper {
    @Mapping(target = "decoder", ignore = true)
    InputChannelDTO toInputChannelDTO(InputChannelEntity inputChannelEntity);

    Set<InputChannelDTO> toInputChannelDTOs(Set<InputChannelEntity> inputChannelEntities);

    InputChannelEntity toInputChannelEntity(InputChannelDTO inputChannelDTO);
}
