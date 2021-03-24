package org.beanpod.switchboard.service;

import java.time.OffsetDateTime;
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
  private final LogStreamMapper logStreamMapper;
  private final StreamLogDaoImpl streamLogDao;

  public StreamLogDto createStreamLog(
      Long id, String serialNumber, String streamID, LogEntity logEntity) {
    StreamLog streamLog =
        StreamLog.builder()
            .id(id)
            .serialNumber(serialNumber)
            .streamId(streamID)
            .logEntity(logEntity)
            .build();

    return streamLogDao.createStreamLog(logStreamMapper.toLogStreamDto(streamLog));
  }

  //used in StreamAspect class to create stream-related logs
  public StreamLogDto createLog(OffsetDateTime dateTime, String message, String decoderSerial, String encoderSerial, String streamId){
    LogEntity logEntity = new LogEntity(OffsetDateTime.now(), message, "info", decoderSerial);
    StreamLog streamLog = new StreamLog(encoderSerial, streamId);

    //logEntity.setStreamLog(streamLog); // will cause infinite loop
    streamLog.setLogEntity(logEntity);

    StreamLogDto streamLogDto = logStreamMapper.toLogStreamDto(streamLog);

    return streamLogDao.createStreamLog(streamLogDto);
  }
}
