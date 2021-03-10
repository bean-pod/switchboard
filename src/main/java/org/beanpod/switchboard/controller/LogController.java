package org.beanpod.switchboard.controller;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.LogDaoImpl;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.service.LogService;
import org.openapitools.api.LogApi;
import org.openapitools.model.CreateLogRequest;
import org.openapitools.model.LogModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

// Ownership data access methods are pending updates to LogEntity. The LogEntity
// serial_number should be a foreign key relationship to the device's serial number
// that created the log.

@RestController
@RequiredArgsConstructor
public class LogController implements LogApi {

  public static final String CONTROLLER_NAME = "Log";
  private final LogDaoImpl logDao;
  private final LogMapper logMapper;
  private final LogService logService;

  @Override
  public ResponseEntity<List<LogModel>> retrieveAllLogs() {
    return ResponseEntity.ok(logDao.getLogs());
  }

  @Override
  public ResponseEntity<List<LogModel>> retrieveDeviceLogs(@PathVariable String serialNumber) {
    return ResponseEntity.ok(logDao.getDeviceLogs(serialNumber));
  }

  @Override
  public ResponseEntity<LogModel> createLog(@Valid CreateLogRequest createLogRequest) {
    return Optional.of(createLogRequest)
        .map(logMapper::createLogRequestToLogModel)
        .map(logService::createLog)
        .map(logMapper::logDtoToLogModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
  }
}
