package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;
import org.beanpod.switchboard.dao.LogDaoImpl;
import org.beanpod.switchboard.dto.LogDto;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.entity.LogEntity;
import org.beanpod.switchboard.fixture.LogFixture;
import org.beanpod.switchboard.service.LogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.LogModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class LogControllerTest {

  private static List<LogModel> logModels;
  private static LogModel logModel;
  private static LogDto logDto;
  private static LogEntity logEntity;
  @InjectMocks private LogController logController;
  @Mock private LogDaoImpl logDao;
  @Mock private LogMapper logMapper;
  @Mock private LogService logService;

  @BeforeEach
  void setupLogFixture() {
    logModels = LogFixture.getListOfLogs();
    logModel = LogFixture.getLogModel();
    logDto = LogFixture.getLogDto();
    logEntity = LogFixture.getLogEntity();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testRetrieveAllLogs() {
    when(logDao.getLogs()).thenReturn(logModels);
    ResponseEntity<List<LogModel>> response = logController.retrieveAllLogs();
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertIterableEquals(logModels, response.getBody());
  }

  @Test
  final void testRetrieveDeviceLogs() {
    when(logDao.getDeviceLogs("1")).thenReturn(logModels);
    ResponseEntity<List<LogModel>> response = logController.retrieveDeviceLogs("1");
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertIterableEquals(logModels, response.getBody());
  }

  @Test
  final void testCreateLog() {
    when(logService.createLog(any())).thenReturn(logDto);
    when(logMapper.createLogRequestToLogModel(any())).thenReturn(logModel);
    when(logMapper.logDtoToLogModel(any())).thenReturn(logModel);

    ResponseEntity<LogModel> responseEntity =
        logController.createLog(LogFixture.getCreateLogRequest());

    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(logModel, responseEntity.getBody());
  }
}
