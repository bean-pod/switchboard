package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.ChannelDto;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChannelMapper {
  ChannelDto toChannelDto(ChannelEntity channelEntity);

  List<ChannelDto> toChannelDtos(List<ChannelEntity> channelEntities);

  ChannelEntity toChannelEntity(ChannelDto channelDto);
}
