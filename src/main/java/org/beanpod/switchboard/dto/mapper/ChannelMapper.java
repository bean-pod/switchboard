package org.beanpod.switchboard.dto.mapper;


import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.ChannelModel;


@Mapper(componentModel = "spring", uses = {DecoderMapper.class, EncoderMapper.class})
public interface ChannelMapper {
    ChannelDTO toDto(ChannelModel channelModel);
    ChannelEntity toEntity(ChannelDTO channelDto);
    ChannelDTO toDto(ChannelEntity channelEntity);
    ChannelModel toModel(ChannelDTO channelDto);
}
