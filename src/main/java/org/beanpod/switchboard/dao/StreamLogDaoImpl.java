package org.beanpod.switchboard.dao;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.LogStreamMapper;
import org.beanpod.switchboard.repository.LogStreamRepository;
import org.openapitools.model.StreamLogModel;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StreamLogDaoImpl {

  private final LogStreamRepository logStreamRepository;
  private final LogStreamMapper logStreamMapper;

  public StreamLogDto createStreamLog(StreamLogDto streamLogDto) {
    return logStreamMapper.toLogStreamDto(
        logStreamRepository.save(logStreamMapper.toStreamLog(streamLogDto)));
  }

  public List<StreamLogModel> getStreamLogs(Long streamId) {
    return logStreamMapper.toStreamLogModels(
        logStreamRepository.findByStreamId(streamId.toString()));
  }
}
