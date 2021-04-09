package org.beanpod.switchboard.dao;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.StreamLogMapper;
import org.beanpod.switchboard.repository.LogStreamRepository;
import org.openapitools.model.StreamLogModel;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StreamLogDaoImpl {

  private final LogStreamRepository logStreamRepository;
  private final StreamLogMapper streamLogMapper;

  public StreamLogDto createStreamLog(StreamLogDto streamLogDto) {
    return streamLogMapper.toLogStreamDto(
        logStreamRepository.save(streamLogMapper.toStreamLog(streamLogDto)));
  }

  public List<StreamLogModel> getStreamLogs(Long streamId, Long userId) {
    return streamLogMapper.toStreamLogModels(
        logStreamRepository.findByStreamId(streamId.toString(), userId));
  }
}
