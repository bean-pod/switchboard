package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.Mockito.when;

import java.util.List;
import org.beanpod.switchboard.dao.LogDaoImpl;
import org.beanpod.switchboard.fixture.LogFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.openapitools.model.LogModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class LogControllerTest {

  public static List<LogModel> logModels;
  @InjectMocks LogController logController;
  @Mock LogDaoImpl logDao;

  @BeforeEach
  void setupLogFixture()  {
    logModels = LogFixture.getListOfLogs();
  }

  @Test
  final void testRetrieveAllLogs(){
    when(logDao.getLogs()).thenReturn(logModels);
    ResponseEntity<List<LogModel>> response = logController.retrieveAllLogs();
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertIterableEquals(logModels, response.getBody() );

  }
}
