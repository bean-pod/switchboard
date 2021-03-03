package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.LogStreamDto;
import org.beanpod.switchboard.entity.LogEntity;
import org.beanpod.switchboard.entity.StreamLog;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LogStreamMapper {
  LogStreamDto toLogStreamDto(StreamLog streamLog);

  StreamLog toStreamLog(LogStreamDto logStreamDto);
}