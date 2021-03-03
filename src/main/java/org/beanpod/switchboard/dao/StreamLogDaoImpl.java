package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.LogStreamDto;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.dto.mapper.LogStreamMapper;
import org.beanpod.switchboard.repository.LogStreamRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StreamLogDaoImpl {
  private final LogStreamRepository logStreamRepository;
  private final LogStreamMapper logStreamMapper;

  public LogStreamDto createStreamLog(LogStreamDto logStreamDto){
    return logStreamMapper.toLogStreamDto(logStreamRepository.save(logStreamMapper.toStreamLog(logStreamDto)));
  }
}
