package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChannelMapper {
    ChannelDTO toChannelDTO(ChannelEntity channelEntity);
    List<ChannelDTO> toChannelDTOs(List<ChannelEntity> channelEntities);
    ChannelEntity toChannelEntity(ChannelDTO channelDTO);
}
