package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.ChannelDto;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChannelMapper {

  ChannelDto toDto(ChannelEntity channelEntity);

  List<ChannelDto> toDtos(List<ChannelEntity> channelEntities);

  ChannelEntity toEntity(ChannelDto channelDto);
}
