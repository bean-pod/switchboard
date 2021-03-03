package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.LogStreamMapper;
import org.beanpod.switchboard.repository.LogStreamRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StreamLogDaoImpl {
  private final LogStreamRepository logStreamRepository;
  private final LogStreamMapper logStreamMapper;

  public StreamLogDto createStreamLog(StreamLogDto streamLogDto){
    return logStreamMapper.toLogStreamDto(logStreamRepository.save(logStreamMapper.toStreamLog(
        streamLogDto)));
  }
}
