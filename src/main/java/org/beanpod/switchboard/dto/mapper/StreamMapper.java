package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.entity.StreamEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.StreamModel;

import java.util.List;

@Mapper(
    componentModel = "spring",
    uses = {InputChannelMapper.class, OutputChannelMapper.class})
public interface StreamMapper {
  StreamDto toDto(StreamModel streamModel);

  StreamDto toDto(StreamEntity streamEntity);

  StreamEntity toEntity(StreamDto streamDto);

  List<StreamDto> toDto(List<StreamEntity> streamEntityList);

  StreamModel toModel(StreamDto streamDto);

  List<StreamModel> toModel(List<StreamDto> streamDTOList);
}
