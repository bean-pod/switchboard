package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;

@Mapper(componentModel = "spring",  uses = {EncoderMapper.class, ChannelMapper.class})
public interface OutputChannelMapper {
    @Mapping(target = "encoder", ignore = true)
    OutputChannelDTO toOutputChannelDTO(OutputChannelEntity outputChannelEntity);

    Set<OutputChannelDTO> toOutputChannelDTOs(Set<OutputChannelEntity> outputChannelEntities);

    OutputChannelEntity toOutputChannelEntity(OutputChannelDTO outputChannelDTO);
}
