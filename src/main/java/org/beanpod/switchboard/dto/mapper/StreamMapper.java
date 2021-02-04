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

    List<StreamDto> toDtoList(List<StreamEntity> streamEntityList);

    StreamEntity toEntity(StreamDto streamDto);

    StreamModel toModel(StreamDto streamDto);

    List<StreamModel> toModelList(List<StreamDto> streamDtoList);
}
