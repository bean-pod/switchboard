package org.beanpod.switchboard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.OffsetDateTime;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dao.StreamLogDaoImpl;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.dto.mapper.StreamLogMapper;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.LogFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.fixture.StreamLogFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.CreateStreamLogRequest;

public class StreamLogServiceTest {
  @InjectMocks StreamLogService streamLogService;
  @Mock StreamLogDaoImpl streamLogDao;
  @Mock StreamLogMapper streamLogMapper;
  @Mock LogMapper logMapper;
  @Mock StreamDaoImpl streamDao;

  private StreamLogDto streamLogDto;
  private CreateStreamLogRequest createStreamLogRequest;
  private StreamDto streamDto;

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);

    streamLogDto = StreamLogFixture.getStreamLogDto();
    createStreamLogRequest = StreamLogFixture.getCreateStreamLogRequest();
    streamDto = StreamFixture.getStreamDto();
  }

  @Test
  final void createStreamLogTest() {
    when(streamLogMapper.toLogStreamDto(any())).thenReturn(streamLogDto);
    when(streamLogDao.createStreamLog(any())).thenReturn(streamLogDto);

    StreamLogDto actualStreamLogDto =
        streamLogService.createLog(
            OffsetDateTime.now(),
            LogFixture.message,
            DeviceFixture.SERIAL_NUMBER,
            DeviceFixture.SERIAL_NUMBER2,
            String.valueOf(StreamFixture.ID));

    assertEquals(streamLogDto, actualStreamLogDto);
  }

  @Test
  final void createStreamLogForRequestObjectTest() {
    when(streamLogMapper.toLogStreamDto(any())).thenReturn(streamLogDto);
    when(logMapper.map(any())).thenReturn(LogFixture.dateTime);
    when(streamLogDao.createStreamLog(any())).thenReturn(streamLogDto);
    when(streamDao.getStreamById(Long.valueOf(createStreamLogRequest.getStreamId())))
        .thenReturn(streamDto);

    StreamLogDto actualStreamLogDto = streamLogService.createLog(createStreamLogRequest);

    assertEquals(streamLogDto, actualStreamLogDto);
  }
}
