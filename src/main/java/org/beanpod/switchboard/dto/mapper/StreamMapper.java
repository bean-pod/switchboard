package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.entity.StreamEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.StreamModel;

@Mapper(
    componentModel = "spring",
    uses = {
      InputChannelMapper.class,
      OutputChannelMapper.class,
      StreamStatMapper.class,
      UserMapper.class,
      DateMapper.class
    })
public interface StreamMapper {

  StreamDto toDto(StreamModel streamModel);

  StreamDto toDto(StreamEntity streamEntity);

  List<StreamDto> toDtos(List<StreamEntity> streamEntityList);

  StreamEntity toEntity(StreamDto streamDto);

  StreamModel toModel(StreamDto streamDto);

  List<StreamModel> toModels(List<StreamDto> streamDtoList);
}
