package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.entity.StreamLog;
import org.mapstruct.Mapper;
import org.openapitools.model.StreamLogModel;

@Mapper(componentModel = "spring")
public interface StreamLogMapper {
  StreamLogDto toLogStreamDto(StreamLog streamLog);

  StreamLog toStreamLog(StreamLogDto streamLogDto);

  List<StreamLogModel> toStreamLogModels(List<StreamLog> streamLogEntityList);

  StreamLogModel toStreamLogModel(StreamLogDto streamLogDto);
}
