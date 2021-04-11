package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.entity.StreamLogEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.StreamLogModel;

@Mapper(componentModel = "spring")
public interface StreamLogMapper {
  StreamLogDto toDto(StreamLogEntity streamLogEntity);

  StreamLogEntity toEntity(StreamLogDto streamLogDto);

  StreamLogModel toModel(StreamLogDto streamLogDto);

  List<StreamLogModel> toModels(List<StreamLogEntity> streamLogEntityEntityList);
}
