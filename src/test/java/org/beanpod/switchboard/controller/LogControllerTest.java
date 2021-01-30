package org.beanpod.switchboard.controller;

import org.beanpod.switchboard.dao.LogDaoImpl;
import org.beanpod.switchboard.fixture.LogFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.LogModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.Mockito.when;

class LogControllerTest {

  private static List<LogModel> logModels;
  @InjectMocks private LogController logController;
  @Mock private LogDaoImpl logDao;

  @BeforeEach
  void setupLogFixture() {
    logModels = LogFixture.getListOfLogs();
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
}
