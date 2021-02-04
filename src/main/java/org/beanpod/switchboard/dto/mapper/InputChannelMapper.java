package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.InputChannelModel;

import java.util.Set;

@Mapper(
        componentModel = "spring",
        uses = {DecoderMapper.class, ChannelMapper.class})
public interface InputChannelMapper {
    @Mapping(target = "decoder", qualifiedByName = "toDecoderDtoShallow")
    InputChannelDto toInputChannelDto(InputChannelEntity inputChannelEntity);

    @Mapping(target = "decoder", ignore = true)
    Set<InputChannelDto> toInputChannelDtos(Set<InputChannelEntity> inputChannelEntities);

    InputChannelEntity toInputChannelEntity(InputChannelDto inputChannelDto);

    InputChannelModel inputChannelDtoToInputChannelModel(InputChannelDto inputChannelDto);
}
