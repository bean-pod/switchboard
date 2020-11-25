package org.beanpod.switchboard.dto.mapper;

import java.util.Set;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
    componentModel = "spring",
    uses = {DecoderMapper.class, ChannelMapper.class})
public interface InputChannelMapper {
  @Mapping(target = "decoder", ignore = true)
  InputChannelDto toInputChannelDto(InputChannelEntity inputChannelEntity);

  @Mapping(target = "decoder", ignore = true)
  Set<InputChannelDto> toInputChannelDtos(Set<InputChannelEntity> inputChannelEntities);

  InputChannelEntity toInputChannelEntity(InputChannelDto inputChannelDto);
}
