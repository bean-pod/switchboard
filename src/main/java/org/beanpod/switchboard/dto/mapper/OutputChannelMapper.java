package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring",  uses = {EncoderMapper.class, ChannelMapper.class})
public interface OutputChannelMapper {
    OutputChannelMapper INSTANCE = Mappers.getMapper(OutputChannelMapper.class);
    OutputChannelDTO toOutputChannelDTO(OutputChannelEntity outputChannelEntity);
    List<OutputChannelDTO> toOutputChannelDTOs(List<OutputChannelEntity> outputChannelEntities);
    OutputChannelEntity toOutputChannelEntity(OutputChannelDTO outputChannelDTO);
}
