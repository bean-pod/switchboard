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

// Ownership data access methods are pending updates to LogEntity. The LogEntity
// serial_number should be a foreign key relationship to the device's serial number
// that created the log.

// This service as written may not be affected by ownership.

// It's odd that LogRepository is being used directly. The save method should be accessed
// through LogDaoImpl (Must define save in LogDaoImpl)

@Component
@RequiredArgsConstructor
public class LogService {

  private final LogRepository logRepository;
  private final LogDaoImpl logDao;
  private final LogMapper logMapper;

  public void createLog(String message, String level, String serialNumber) {

    LogEntity logEntity =
        LogEntity.builder()
            .message(message)
            .level(level)
            .dateTime(OffsetDateTime.now())
            .serialNumber(serialNumber)
            .build();
    logRepository.save(logEntity);
  }

  public LogDto createLog(LogModel logModel) {
    return logDao.createLog(logMapper.logModelToLogDto(logModel));
  }
}
