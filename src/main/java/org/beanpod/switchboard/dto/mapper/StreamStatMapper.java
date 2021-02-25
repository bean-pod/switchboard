package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.entity.StreamStatEntity;
import org.openapitools.model.StreamStatModel;

public interface StreamStatMapper {

  StreamStatDto toDto(StreamStatModel streamModel);

  StreamStatDto toDto(StreamStatEntity streamStatEntity);

  List<StreamStatDto> toDtoList(List<StreamStatEntity> streamStatEntityList);

  StreamStatEntity toEntity(StreamStatDto streamStatDto);

  StreamStatModel toModel(StreamStatDto streamStatDto);

  List<StreamStatModel> toModelList(List<StreamStatDto> streamDtoList);
}
