package org.beanpod.switchboard.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.LogDaoImpl;
import org.openapitools.api.LogsApi;
import org.openapitools.model.LogModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LogController implements LogsApi {

  private final LogDaoImpl logDao;

  @Override
  public ResponseEntity<List<LogModel>> retrieveAllLogs() {
    return ResponseEntity.ok(logDao.getLogs());
  }

  @Override
  public ResponseEntity<List<LogModel>> retrieveDeviceLogs(@PathVariable String serialNumber) {
    return ResponseEntity.ok(logDao.getDeviceLogs(serialNumber));
  }
}
