package org.beanpod.switchboard.dto.mapper;

import java.time.OffsetDateTime;
import java.util.List;
import org.beanpod.switchboard.dto.LogDto;
import org.beanpod.switchboard.entity.LogEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.CreateLogRequest;
import org.openapitools.model.LogModel;

@Mapper(componentModel = "spring")
public interface LogMapper {

  LogDto toDto(LogEntity entity);

  LogDto toDto(LogModel logModel);

  LogEntity toEntity(LogDto logDto);

  LogModel toModel(LogEntity logEntity);

  LogModel toModel(LogDto logDto);

  LogModel toModel(CreateLogRequest createLogRequest);

  List<LogModel> toModels(List<LogEntity> logEntityList);

  /* to convert string to OffsetDateTime
   * value must be of YYYY-MM-DDTHH:mm:ss+00:00
   */
  default OffsetDateTime map(String value) {
    return OffsetDateTime.parse(value);
  }
}
