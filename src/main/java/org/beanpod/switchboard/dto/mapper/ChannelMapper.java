package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChannelMapper {
  ChannelDTO toChannelDTO(ChannelEntity channelEntity);

  List<ChannelDTO> toChannelDTOs(List<ChannelEntity> channelEntities);

  ChannelEntity toChannelEntity(ChannelDTO channelDTO);
}
