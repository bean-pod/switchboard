package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.InputChannelModel;

import java.util.Collection;

@Mapper(componentModel = "spring", uses = {DecoderMapper.class})
public interface InputChannelMapper {
    InputChannelDTO toDto(InputChannelModel inputChannelModel);

    @Mapping(source = "name", target = "channel.name")
    @Mapping(source = "port", target = "channel.port")
    InputChannelEntity toEntity(InputChannelDTO inputChannelDTO);

    Collection<InputChannelEntity> toEntities(Collection<InputChannelDTO> inputChannelDtos);

    @Mapping(source = "channel.name", target = "name")
    @Mapping(source = "channel.port", target = "port")
    InputChannelDTO toDto(InputChannelEntity inputChannelEntity);

    Collection<InputChannelDTO> toDtos(Collection<InputChannelEntity> outputChannelEntities);

    InputChannelModel toModel(InputChannelDTO inputChannelDTO);
}
