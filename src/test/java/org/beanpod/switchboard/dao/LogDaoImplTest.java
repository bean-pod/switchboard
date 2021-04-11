package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;
import org.beanpod.switchboard.dto.LogDto;
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

class LogDaoImplTest {

  public static List<LogModel> logModels;
  public static List<LogEntity> logEntities;
  public static LogDto logDto;
  public static LogEntity logEntity;

  @InjectMocks LogDaoImpl logDao;
  @Mock LogRepository logRepository;
  @Mock LogMapper logMapper;

  @BeforeEach
  void setupLogFixture() {
    logModels = LogFixture.getListOfLogs();
    logEntities = LogFixture.getListOfLogEntity();
    logDto = LogFixture.getLogDto();
    logEntity = LogFixture.getLogEntity();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void getLogs() {
    when(logRepository.findAll()).thenReturn(logEntities);
    when(logMapper.toModels(any())).thenReturn(logModels);
    List<LogModel> logs = logDao.getLogs();
    assertIterableEquals(logModels, logs);
  }

  @Test
  final void testGetDeviceLogs() {
    when(logRepository.findBySerialNumber(DeviceFixture.SERIAL_NUMBER)).thenReturn(logEntities);
    when(logMapper.toModels(any())).thenReturn(logModels);
    List<LogModel> logs = logDao.getDeviceLogs(DeviceFixture.SERIAL_NUMBER);
    assertIterableEquals(logModels, logs);
  }

  @Test
  final void testCreateLog() {
    when(logMapper.toDto(logEntity)).thenReturn(logDto);
    when(logMapper.toEntity(logDto)).thenReturn(logEntity);
    when(logRepository.save(logEntity)).thenReturn(logEntity);

    LogDto responseLogDto = logDao.createLog(logDto);

    assertEquals(logDto, responseLogDto);
  }
}
