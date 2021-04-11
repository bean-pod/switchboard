package org.beanpod.switchboard.controller;

import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.LogDaoImpl;
import org.beanpod.switchboard.dao.StreamLogDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.dto.mapper.StreamLogMapper;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.service.LogService;
import org.beanpod.switchboard.service.StreamLogService;
import org.openapitools.api.LogApi;
import org.openapitools.model.CreateLogRequest;
import org.openapitools.model.CreateStreamLogRequest;
import org.openapitools.model.LogModel;
import org.openapitools.model.StreamLogModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LogController implements LogApi {

  public static final String CONTROLLER_NAME = "Log";
  private final UserDaoImpl userDao;
  private final LogDaoImpl logDao;
  private final LogMapper logMapper;
  private final LogService logService;
  private final StreamLogDaoImpl streamLogDao;
  private final StreamLogService streamLogService;
  private final StreamLogMapper streamLogMapper;
  private final HttpServletRequest request;

  @Override
  public ResponseEntity<List<StreamLogModel>> retrieveStreamLogs(@PathVariable Long streamId) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());
    return ResponseEntity.ok(streamLogDao.getStreamLogs(streamId, user.getId()));
  }

  @Override
  public ResponseEntity<List<LogModel>> retrieveAllLogs() {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());
    return ResponseEntity.ok(logDao.getLogs(user.getId()));
  }

  @Override
  public ResponseEntity<List<LogModel>> retrieveDeviceLogs(@PathVariable String serialNumber) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());
    return ResponseEntity.ok(logDao.getDeviceLogs(serialNumber, user.getId()));
  }

  @Override
  public ResponseEntity<LogModel> createLog(@Valid CreateLogRequest createLogRequest) {
    return Optional.of(createLogRequest)
        .map(logMapper::toModel)
        .map(logService::createLog)
        .map(logMapper::toModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<StreamLogModel> createStreamLog(
      CreateStreamLogRequest createStreamLogRequest) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());
    return Optional.of(createStreamLogRequest)
        .map(createStreamLogReq -> streamLogService.createLog(user, createStreamLogReq))
        .map(streamLogMapper::toModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
  }
}
