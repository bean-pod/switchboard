package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.Mockito.when;

import java.util.List;
import org.beanpod.switchboard.dao.StreamLogDaoImpl;
import org.beanpod.switchboard.fixture.StreamLogFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.StreamLogModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class StreamLogControllerTest {
  private List<StreamLogModel> streamLogModels;
  @InjectMocks private StreamLogController streamLogController;
  @Mock private StreamLogDaoImpl streamLogDao;

  @BeforeEach
  void setupLogFixture() {
    streamLogModels = StreamLogFixture.getListOfStreamLogsModel();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testRetrieveStreamLogs() {
    when(streamLogDao.getStreamLogs((long) 1)).thenReturn(streamLogModels);
    ResponseEntity<List<StreamLogModel>> response =
        streamLogController.retrieveStreamLogs((long) 1);
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertIterableEquals(streamLogModels, response.getBody());
  }
}
