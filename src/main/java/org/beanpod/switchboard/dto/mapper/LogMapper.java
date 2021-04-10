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
  List<LogModel> toLogModels(List<LogEntity> logEntityList);

  LogModel toLogModel(LogEntity logEntity);

  LogEntity toLogEntity(LogDto logDto);

  LogModel logDtoToLogModel(LogDto logDto);

  LogDto logModelToLogDto(LogModel logModel);

  LogModel createLogRequestToLogModel(CreateLogRequest createLogRequest);

  LogDto logEntityToLogDto(LogEntity logEntity);

  /* to convert string to OffsetDateTime
   * value must be of YYYY-MM-DDTHH:mm:ss+00:00
   */
  default OffsetDateTime map(String value) {
    return OffsetDateTime.parse(value);
  }
}
