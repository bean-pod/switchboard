package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.entity.LogEntity;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.LogFixture;
import org.beanpod.switchboard.repository.LogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.LogModel;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class LogDaoImplTest {
  public static List<LogModel> logModels;
  public static List<LogEntity> logEntities;

  @InjectMocks LogDaoImpl logDao;
  @Mock LogRepository logRepository;
  @Mock LogMapper logMapper;

  @BeforeEach
  void setupLogFixture() {
    logModels = LogFixture.getListOfLogs();
    logEntities = LogFixture.getListOfLogEntity();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void getLogs() {
    when(logRepository.findAll()).thenReturn(logEntities);
    when(logMapper.toLogModels(any())).thenReturn(logModels);
    List<LogModel> logs = logDao.getLogs();
    assertIterableEquals(logModels, logs);
  }

  @Test
  final void testGetDeviceLogs() {
    when(logRepository.findBySerialNumber(DeviceFixture.SERIAL_NUMBER)).thenReturn(logEntities);
    when(logMapper.toLogModels(any())).thenReturn(logModels);
    List<LogModel> logs = logDao.getDeviceLogs(DeviceFixture.SERIAL_NUMBER);
    assertIterableEquals(logModels, logs);
  }
}
