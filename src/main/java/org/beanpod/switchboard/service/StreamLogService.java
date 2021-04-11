package org.beanpod.switchboard.service;

import java.time.OffsetDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dao.StreamLogDaoImpl;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.dto.mapper.StreamLogMapper;
import org.beanpod.switchboard.entity.LogEntity;
import org.beanpod.switchboard.entity.StreamLogEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.openapitools.model.CreateStreamLogRequest;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StreamLogService {
  private final StreamLogMapper streamLogMapper;
  private final StreamLogDaoImpl streamLogDao;
  private final LogMapper logMapper;
  private final StreamDaoImpl streamDao;

  // used in StreamAspect class to create stream-related logs
  public StreamLogDto createLog(
      OffsetDateTime dateTime,
      String message,
      String decoderSerial,
      String encoderSerial,
      String streamId) {
    LogEntity logEntity = new LogEntity(dateTime, message, "info", decoderSerial);
    StreamLogEntity streamLogEntity = new StreamLogEntity(encoderSerial, streamId);

    streamLogEntity.setLogEntity(logEntity);

    StreamLogDto streamLogDto = streamLogMapper.toDto(streamLogEntity);

    return streamLogDao.createStreamLog(streamLogDto);
  }

  public StreamLogDto createLog(UserEntity user, CreateStreamLogRequest createStreamLogRequest) {
    return Optional.of(Long.valueOf(createStreamLogRequest.getStreamId()))
        .map(streamId -> streamDao.getStreamById(user, streamId))
        .map(
            dto ->
                createLog(
                    logMapper.map(createStreamLogRequest.getDateTime()),
                    createStreamLogRequest.getMessage(),
                    dto.getInputChannel().getDecoder().getSerialNumber(),
                    dto.getOutputChannel().getEncoder().getSerialNumber(),
                    createStreamLogRequest.getStreamId().toString()))
        .orElse(null);
  }
}
