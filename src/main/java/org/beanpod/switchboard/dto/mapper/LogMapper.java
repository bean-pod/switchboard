package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.entity.LogEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.LogModel;

@Mapper(componentModel = "spring")
public interface LogMapper {

  List<LogModel> toLogModels(List<LogEntity> logEntityList);
  LogModel toLogModel(LogEntity logEntity);
}
