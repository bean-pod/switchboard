package org.beanpod.switchboard.dao;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.repository.LogRepository;
import org.openapitools.model.LogModel;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LogDaoImpl {

  private final LogRepository logRepository;
  private final LogMapper logMapper;

  public List<LogModel> getLogs() {
    return logMapper.toLogModels(logRepository.findAll());
  }

  public List<LogModel> getDeviceLogs(String serialNumber) {
    return logMapper.toLogModels(logRepository.findBySerialNumber(serialNumber));
  }
}
