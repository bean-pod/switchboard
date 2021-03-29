package org.beanpod.switchboard.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.StreamLogDaoImpl;
import org.openapitools.api.StreamlogApi;
import org.openapitools.model.StreamLogModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StreamLogController implements StreamlogApi {
  private final StreamLogDaoImpl streamLogDao;

  @Override
  public ResponseEntity<List<StreamLogModel>> retrieveStreamLogs(@PathVariable Long streamId) {
    return ResponseEntity.ok(streamLogDao.getStreamLogs(streamId));
  }
}
