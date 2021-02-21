package org.beanpod.switchboard.controller;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.beanpod.switchboard.dao.LogDaoImpl;
import org.beanpod.switchboard.dto.LogDto;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.openapitools.api.LogsApi;
import org.openapitools.model.CreateLogRequest;
import org.openapitools.model.LogModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LogController implements LogsApi {
  public static final String CONTROLLER_NAME = "Log";
  private final LogDaoImpl logDao;
  private final LogMapper logMapper;

  @Override
  public ResponseEntity<List<LogModel>> retrieveAllLogs() {
    return ResponseEntity.ok(logDao.getLogs());
  }

  @Override
  public ResponseEntity<List<LogModel>> retrieveDeviceLogs(@PathVariable String serialNumber) {
    return ResponseEntity.ok(logDao.getDeviceLogs(serialNumber));
  }

  @Override
  public ResponseEntity<LogModel> createLog(@Valid CreateLogRequest createLogRequest){
    return Optional.of(createLogRequest)
        .map(logMapper::toLogDto)
        .map(logDao::createLog)
        .map(logMapper::toLogEntity)
        .map(logMapper::toLogModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
  }
}
