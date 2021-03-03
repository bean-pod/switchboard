package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.entity.StreamLog;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LogStreamMapper {
  StreamLogDto toLogStreamDto(StreamLog streamLog);

  StreamLog toStreamLog(StreamLogDto streamLogDto);
}
