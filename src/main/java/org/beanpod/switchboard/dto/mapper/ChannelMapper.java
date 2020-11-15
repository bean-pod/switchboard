package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChannelMapper {
    ChannelMapper INSTANCE = Mappers.getMapper(ChannelMapper.class);

    ChannelDTO toChannelDTO(ChannelEntity channelEntity);

    List<ChannelDTO> toChannelDTOs(List<ChannelEntity> channelEntities);

    ChannelEntity toChannelEntity(ChannelDTO channelDTO);

}
