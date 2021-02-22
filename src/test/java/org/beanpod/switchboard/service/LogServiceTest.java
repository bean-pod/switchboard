package org.beanpod.switchboard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.beanpod.switchboard.dao.LogDaoImpl;
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

class LogServiceTest {

  public static LogEntity logEntity;
  public static LogDto logDto;
  public static LogModel logModel;

  @InjectMocks LogService logService;
  @Mock LogRepository logRepository;
  @Mock LogMapper logMapper;
  @Mock LogDaoImpl logDao;

  @BeforeEach
  void setupLogFixture() {
    logEntity = LogFixture.getLogEntity();
    logDto = LogFixture.getLogDto();
    logModel = LogFixture.getLogModel();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testGetLog() {
    when(logRepository.save(any())).thenReturn(logEntity);
    logService.createLog("im a log", "info", DeviceFixture.SERIAL_NUMBER);
    verify(logRepository, times(1)).save(any());
  }

  @Test
  final void testCreateLog(){
    when(logRepository.save(any())).thenReturn(logEntity);
    when(logMapper.logModelToLogDto(any())).thenReturn(logDto);
    when(logService.createLog(logModel)).thenReturn(logDto);

    LogDto actualLodModel = logService.createLog(logModel);

    assertEquals(logDto, actualLodModel);
  }
}
