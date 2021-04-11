package org.beanpod.switchboard.service;

import java.time.OffsetDateTime;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.LogDaoImpl;
import org.beanpod.switchboard.dto.LogDto;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.entity.LogEntity;
import org.beanpod.switchboard.repository.LogRepository;
import org.openapitools.model.LogModel;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LogService {

  private final LogRepository logRepository;
  private final LogDaoImpl logDao;
  private final LogMapper logMapper;

  public LogDto createLog(String message, String level, String serialNumber) {

    LogEntity logEntity =
        LogEntity.builder()
            .message(message)
            .level(level)
            .dateTime(OffsetDateTime.now())
            .serialNumber(serialNumber)
            .build();
    return logMapper.toDto(logRepository.save(logEntity));
  }

  public LogDto createLog(LogModel logModel) {
    return logDao.createLog(logMapper.toDto(logModel));
  }
}
