package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", uses = {DecoderMapper.class, ChannelMapper.class})
public interface InputChannelMapper {
    InputChannelMapper INSTANCE = Mappers.getMapper(InputChannelMapper.class);
    InputChannelDTO toInputChannelDTO(InputChannelEntity inputChannelEntity);
    List<InputChannelDTO> toInputChannelDTOs(List<InputChannelEntity> inputChannelEntities);
    InputChannelEntity toInputChannelEntity(InputChannelDTO inputChannelDTO);
}
