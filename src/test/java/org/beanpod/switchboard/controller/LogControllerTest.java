package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dao.LogDaoImpl;
import org.beanpod.switchboard.dao.StreamLogDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.LogDto;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.dto.mapper.StreamLogMapper;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.DeviceFixture;
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
import org.openapitools.model.CreateLogRequest;
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
  private static DeviceDto deviceDTO;
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
  @Mock private DeviceDaoImpl deviceDao;

  @BeforeEach
  void setup() {
    setupLogFixture();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  private void setupLogFixture() {
    logModels = LogFixture.getListOfLogs();
    logModel = LogFixture.getLogModel();
    logDto = LogFixture.getLogDto();
    streamLogModels = StreamLogFixture.getListOfStreamLogsModel();
    createStreamLogRequest = StreamLogFixture.getCreateStreamLogRequest();
    streamLogDto = StreamLogFixture.getStreamLogDto();
    streamLogModel = StreamLogFixture.getStreamLogModel();
    user = UserFixture.getUserEntity();
    deviceDTO = DeviceFixture.getDeviceDto();
  }

  @Test
  final void testRetrieveAllLogs() {
    when(logDao.getLogs(user.getId())).thenReturn(logModels);
    ResponseEntity<List<LogModel>> response = logController.retrieveAllLogs();
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertIterableEquals(logModels, response.getBody());
  }

  @Test
  final void testRetrieveDeviceLogs() {
    when(logDao.getDeviceLogs("1", user.getId())).thenReturn(logModels);
    ResponseEntity<List<LogModel>> response = logController.retrieveDeviceLogs("1");
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertIterableEquals(logModels, response.getBody());
  }

  @Test
  final void testCreateLog() {
    when(logService.createLog(any())).thenReturn(logDto);
    when(logMapper.toModel((CreateLogRequest) any())).thenReturn(logModel);
    when(logMapper.toModel((LogDto) any())).thenReturn(logModel);
    when(deviceDao.findDevice(DeviceFixture.SERIAL_NUMBER)).thenReturn(Optional.of(deviceDTO));

    ResponseEntity<LogModel> responseEntity =
        logController.createLog(LogFixture.getCreateLogRequest());

    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(logModel, responseEntity.getBody());
  }

  @Test
  final void testCreateLogWhenNoDevice() {
    when(logService.createLog(any())).thenReturn(logDto);
    when(logMapper.toModel((CreateLogRequest) any())).thenReturn(logModel);
    when(logMapper.toModel((LogDto) any())).thenReturn(logModel);
    when(deviceDao.findDevice(DeviceFixture.SERIAL_NUMBER)).thenReturn(Optional.empty());

    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> logController.createLog(LogFixture.getCreateLogRequest()));
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
    when(streamLogService.createLog(user, createStreamLogRequest)).thenReturn(streamLogDto);
    when(streamLogMapper.toModel(streamLogDto)).thenReturn(streamLogModel);
    ResponseEntity<StreamLogModel> response = logController.createStreamLog(createStreamLogRequest);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(streamLogModel, response.getBody());
  }
}
