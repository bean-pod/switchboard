package org.beanpod.switchboard.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.entity.LogEntity;
import org.beanpod.switchboard.fixture.LogFixture;
import org.beanpod.switchboard.repository.LogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class LogServiceTest {

  public static LogEntity logEntity;

  @InjectMocks LogService logService;
  @Mock LogRepository logRepository;
  @Mock LogMapper logMapper;

  @BeforeEach
  void setupLogFixture() {
    logEntity = LogFixture.getLogEntity();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testGetLog() {
    when(logRepository.save(any())).thenReturn(logEntity);
    logService.createLog("im a log", "info");
    verify(logRepository, times(1)).save(any());
  }
}
