package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dao.LogDaoImpl;
import org.beanpod.switchboard.dao.StreamLogDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.LogDto;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.dto.mapper.StreamLogMapper;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.LogFixture;
import org.beanpod.switchboard.fixture.StreamLogFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.service.LogService;
import org.beanpod.switchboard.service.StreamLogService;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.CreateStreamLogRequest;
import org.openapitools.model.LogModel;
import org.openapitools.model.StreamLogModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class LogControllerTest {

  private static List<LogModel> logModels;
  private static LogModel logModel;
  private static LogDto logDto;
  private static List<StreamLogModel> streamLogModels;
  private static CreateStreamLogRequest createStreamLogRequest;
  private static StreamLogDto streamLogDto;
  private static StreamLogModel streamLogModel;
  private static UserEntity user;
  @InjectMocks private LogController logController;
  @Mock private LogDaoImpl logDao;
  @Mock private LogMapper logMapper;
  @Mock private LogService logService;
  @Mock private StreamLogDaoImpl streamLogDao;
  @Mock private StreamLogService streamLogService;
  @Mock private StreamLogMapper streamLogMapper;
  @Mock private HttpServletRequest httpServletRequest;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;

  @BeforeEach
  void setupLogFixture() {
    logModels = LogFixture.getListOfLogs();
    logModel = LogFixture.getLogModel();
    logDto = LogFixture.getLogDto();
    streamLogModels = StreamLogFixture.getListOfStreamLogsModel();
    createStreamLogRequest = StreamLogFixture.getCreateStreamLogRequest();
    streamLogDto = StreamLogFixture.getStreamLogDto();
    streamLogModel = StreamLogFixture.getStreamLogModel();
    user = UserFixture.getUserEntity();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
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

  @Test
  final void testRetrieveStreamLogs() {
    when(streamLogDao.getStreamLogs(1L, user.getId())).thenReturn(streamLogModels);
    ResponseEntity<List<StreamLogModel>> response = logController.retrieveStreamLogs(1L);
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertIterableEquals(streamLogModels, response.getBody());
  }

  @Test
  final void testCreateStreamLog() {
    when(streamLogService.createLog(createStreamLogRequest)).thenReturn(streamLogDto);
    when(streamLogMapper.toStreamLogModel(streamLogDto)).thenReturn(streamLogModel);
    ResponseEntity<StreamLogModel> response = logController.createStreamLog(createStreamLogRequest);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(streamLogModel, response.getBody());
  }
}
