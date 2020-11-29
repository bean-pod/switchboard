package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.entity.StreamEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.StreamModel;

@Mapper(
    componentModel = "spring",
    uses = {InputChannelMapper.class, OutputChannelMapper.class})
public interface StreamMapper {
  StreamDto toDto(StreamModel streamModel);

  StreamEntity toEntity(StreamDto streamDto);

  StreamDto toDto(StreamEntity streamEntity);

  StreamModel toModel(StreamDto streamDto);
}
