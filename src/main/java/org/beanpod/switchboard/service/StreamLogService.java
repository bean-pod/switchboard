package org.beanpod.switchboard.service;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.StreamLogDaoImpl;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.LogStreamMapper;
import org.beanpod.switchboard.entity.LogEntity;
import org.beanpod.switchboard.entity.StreamLog;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StreamLogService {
  LogStreamMapper logStreamMapper;
  StreamLogDaoImpl streamLogDao;

  public StreamLogDto createStreamLog(Long id, String serialNumber, String streamID, LogEntity logEntity){
    StreamLog streamLog =
        StreamLog.builder()
            .id(id)
            .serialNumber(serialNumber)
            .streamId(streamID)
            .logEntity(logEntity)
            .build();

    return streamLogDao.createStreamLog(logStreamMapper.toLogStreamDto(streamLog));
  }
}
