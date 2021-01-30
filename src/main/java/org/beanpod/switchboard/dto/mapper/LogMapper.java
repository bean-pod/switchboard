package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.entity.LogEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.LogModel;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LogMapper {

  List<LogModel> toLogModels(List<LogEntity> logEntityList);

  LogModel toLogModel(LogEntity logEntity);
}
