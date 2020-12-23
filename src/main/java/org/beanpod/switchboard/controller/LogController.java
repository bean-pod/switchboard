package org.beanpod.switchboard.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.LogDaoImpl;
import org.openapitools.api.LogsApi;
import org.openapitools.model.LogModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class LogController implements LogsApi {

  private final LogDaoImpl logDao;

  @Override
  public ResponseEntity<List<LogModel>> retrieveAllLogs() {
    return ResponseEntity.ok(logDao.getLogs());
  }
}
