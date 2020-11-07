package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.hibernate.result.Output;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.OutputChannelModel;

import java.util.Collection;

@Mapper(componentModel = "spring", uses = {EncoderMapper.class})
public interface OutputChannelMapper {
    OutputChannelDTO toDto(OutputChannelModel outputChannelModel);

    @Mapping(source = "name", target = "channel.name")
    @Mapping(source = "port", target = "channel.port")
    OutputChannelEntity toEntity(OutputChannelDTO outputChannelDto);

    Collection<OutputChannelEntity> toEntities(Collection<OutputChannelDTO> outputChannelDtos);

    @Mapping(source = "channel.name", target = "name")
    @Mapping(source = "channel.port", target = "port")
    OutputChannelDTO toDto(OutputChannelEntity outputChannelEntity);

    Collection<OutputChannelDTO> toDtos(Collection<OutputChannelEntity> outputChannelEntities);

    OutputChannelModel toModel(OutputChannelDTO outputChannelDTO);
}
