package org.beanpod.switchboard.service;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.entity.LogEntity;
import org.beanpod.switchboard.repository.LogRepository;
import org.beanpod.switchboard.util.DateUtil;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LogService {

  private final DateUtil dateUtil;
  private final LogRepository logRepository;

  public void createLog(String message, String level) {

    LogEntity logEntity =
        LogEntity.builder()
            .message(message)
            .level(level)
            .dateTime(dateUtil.getCurrentDate())
            .build();
    logRepository.save(logEntity);
  }
}
