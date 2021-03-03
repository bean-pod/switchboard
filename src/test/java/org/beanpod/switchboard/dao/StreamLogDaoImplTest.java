package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.LogStreamMapper;
import org.beanpod.switchboard.entity.StreamLog;
import org.beanpod.switchboard.fixture.StreamLogFixture;
import org.beanpod.switchboard.repository.LogStreamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class StreamLogDaoImplTest {
  @InjectMocks StreamLogDaoImpl streamLogDao;
  @Mock LogStreamRepository logStreamRepository;
  @Mock LogStreamMapper logStreamMapper;

  private StreamLog streamLog;
  private StreamLogDto streamLogDto;

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);

    streamLog = StreamLogFixture.getStreamLog();
    streamLogDto = StreamLogFixture.getStreamLogDto();
  }

  @Test
  final void createStreamLogTest() {
    when(logStreamMapper.toLogStreamDto(any())).thenReturn(streamLogDto);
    when(logStreamMapper.toStreamLog(any())).thenReturn(streamLog);
    when(logStreamRepository.save(any())).thenReturn(streamLog);

    StreamLogDto actualStreamLog = streamLogDao.createStreamLog(streamLogDto);

    assertEquals(streamLogDto, actualStreamLog);
  }
}
