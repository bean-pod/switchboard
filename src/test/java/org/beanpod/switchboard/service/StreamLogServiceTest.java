package org.beanpod.switchboard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.time.OffsetDateTime;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dao.StreamLogDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.dto.mapper.StreamLogMapper;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.LogFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.fixture.StreamLogFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.CreateStreamLogRequest;

public class StreamLogServiceTest {
  public static UserEntity user;
  @InjectMocks StreamLogService streamLogService;
  @Mock StreamLogDaoImpl streamLogDao;
  @Mock StreamLogMapper streamLogMapper;
  @Mock LogMapper logMapper;
  @Mock StreamDaoImpl streamDao;
  @Mock HttpServletRequest httpServletRequest;
  @Mock UserPrincipal userPrincipal;
  @Mock UserDaoImpl userDao;

  private StreamLogDto streamLogDto;
  private CreateStreamLogRequest createStreamLogRequest;
  private StreamDto streamDto;

  @BeforeEach
  void setup() {
    streamLogDto = StreamLogFixture.getStreamLogDto();
    createStreamLogRequest = StreamLogFixture.getCreateStreamLogRequest();
    streamDto = StreamFixture.getStreamDto();
    user = UserFixture.getUserEntity();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  @Test
  final void createStreamLogTest() {
    when(streamLogMapper.toDto(any())).thenReturn(streamLogDto);
    when(streamLogDao.createStreamLog(any())).thenReturn(streamLogDto);

    StreamLogDto actualStreamLogDto =
        streamLogService.createLog(
            OffsetDateTime.now(),
            LogFixture.message,
            DeviceFixture.SERIAL_NUMBER,
            DeviceFixture.SERIAL_NUMBER2,
            String.valueOf(StreamFixture.ID),
            "info");

    assertEquals(streamLogDto, actualStreamLogDto);
  }

  @Test
  final void createStreamLogForRequestObjectTest() {
    when(streamLogMapper.toDto(any())).thenReturn(streamLogDto);
    when(logMapper.map(any())).thenReturn(LogFixture.dateTime);
    when(streamLogDao.createStreamLog(any())).thenReturn(streamLogDto);
    when(streamDao.getStreamById(user, Long.valueOf(createStreamLogRequest.getStreamId())))
        .thenReturn(streamDto);

    StreamLogDto actualStreamLogDto = streamLogService.createLog(user, createStreamLogRequest);

    assertEquals(streamLogDto, actualStreamLogDto);
  }

  @Test
  final void createStreamLogForRequestObjectNullTest() {
    when(streamLogMapper.toDto(any())).thenReturn(streamLogDto);
    when(logMapper.map(any())).thenReturn(LogFixture.dateTime);
    when(streamLogDao.createStreamLog(any())).thenReturn(streamLogDto);
    when(streamDao.getStreamById(user, Long.valueOf(createStreamLogRequest.getStreamId())))
        .thenReturn(null);

    StreamLogDto actualStreamLogDto = streamLogService.createLog(user, createStreamLogRequest);

    assertNull(actualStreamLogDto);
  }
}
