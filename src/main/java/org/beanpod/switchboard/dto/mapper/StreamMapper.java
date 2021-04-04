package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.entity.StreamEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.StreamModel;

@Mapper(
    componentModel = "spring",
    uses = {InputChannelMapper.class, OutputChannelMapper.class, StreamStatMapper.class, UserMapper.class})
public interface StreamMapper {

  StreamDto toStreamDto(StreamModel streamModel);

  StreamDto toStreamDto(StreamEntity streamEntity);

  List<StreamDto> toStreamDtos(List<StreamEntity> streamEntityList);

  StreamEntity toStreamEntity(StreamDto streamDto);

  StreamModel toStreamModel(StreamDto streamDto);

  List<StreamModel> toStreamModelList(List<StreamDto> streamDtoList);
}
