package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dto.LogDto;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.entity.LogEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.LogFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.LogRepository;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.LogModel;

class LogDaoImplTest {

  public static List<LogModel> logModels;
  public static List<LogEntity> logEntities;
  public static LogDto logDto;
  public static LogEntity logEntity;
  public static UserEntity user;

  @InjectMocks LogDaoImpl logDao;
  @Mock LogRepository logRepository;
  @Mock LogMapper logMapper;
  @Mock private HttpServletRequest httpServletRequest;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;

  @BeforeEach
  void setupLogFixture() {
    logModels = LogFixture.getListOfLogs();
    logEntities = LogFixture.getListOfLogEntity();
    logDto = LogFixture.getLogDto();
    logEntity = LogFixture.getLogEntity();
    user = UserFixture.getUserEntity();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  @Test
  final void getLogs() {
    when(logRepository.findAll()).thenReturn(logEntities);
    when(logMapper.toLogModels(any())).thenReturn(logModels);
    List<LogModel> logs = logDao.getLogs(user.getId());
    assertIterableEquals(logModels, logs);
  }

  @Test
  final void testGetDeviceLogs() {
    when(logRepository.findBySerialNumber(DeviceFixture.SERIAL_NUMBER, user.getId()))
        .thenReturn(logEntities);
    when(logMapper.toLogModels(any())).thenReturn(logModels);
    List<LogModel> logs = logDao.getDeviceLogs(DeviceFixture.SERIAL_NUMBER, user.getId());
    assertIterableEquals(logModels, logs);
  }

  @Test
  final void testCreateLog() {
    when(logMapper.logEntityToLogDto(logEntity)).thenReturn(logDto);
    when(logMapper.toLogEntity(logDto)).thenReturn(logEntity);
    when(logRepository.save(logEntity)).thenReturn(logEntity);

    LogDto responseLogDto = logDao.createLog(logDto);

    assertEquals(logDto, responseLogDto);
  }
}
