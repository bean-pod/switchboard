package org.beanpod.switchboard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.beanpod.switchboard.dao.StreamLogDaoImpl;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.LogStreamMapper;
import org.beanpod.switchboard.entity.LogEntity;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.LogFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.fixture.StreamLogFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class StreamLogServiceTest {
  @InjectMocks StreamLogService streamLogService;
  @Mock StreamLogDaoImpl streamLogDao;
  @Mock LogStreamMapper logStreamMapper;

  private StreamLogDto streamLogDto;
  private LogEntity logEntity;

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);

    streamLogDto = StreamLogFixture.getStreamLogDto();
    logEntity = LogFixture.getLogEntity();
  }

  @Test
  final void createStreamLogTest() {
    when(logStreamMapper.toLogStreamDto(any())).thenReturn(streamLogDto);
    when(streamLogDao.createStreamLog(any())).thenReturn(streamLogDto);

    StreamLogDto actualStreamLogDto =
        streamLogService.createStreamLog(
            LogFixture.id,
            DeviceFixture.SERIAL_NUMBER2.toString(),
            String.valueOf(StreamFixture.ID),
            logEntity);

    assertEquals(streamLogDto, actualStreamLogDto);
  }
}
