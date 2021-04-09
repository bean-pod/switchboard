package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.StreamLogMapper;
import org.beanpod.switchboard.entity.StreamLog;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.StreamLogFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.LogStreamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.StreamLogModel;

public class StreamLogDaoImplTest {
  @InjectMocks StreamLogDaoImpl streamLogDao;
  @Mock LogStreamRepository logStreamRepository;
  @Mock StreamLogMapper streamLogMapper;

  private StreamLog streamLog;
  private StreamLogDto streamLogDto;
  private List<StreamLogModel> streamLogModelList;
  private List<StreamLog> streamLogList;
  private UserEntity user;

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);

    streamLog = StreamLogFixture.getStreamLog();
    streamLogDto = StreamLogFixture.getStreamLogDto();
    streamLogModelList = StreamLogFixture.getListOfStreamLogsModel();
    streamLogList = StreamLogFixture.getListOfStreamLogs();
    user = UserFixture.getUserEntity();
  }

  @Test
  final void createStreamLogTest() {
    when(streamLogMapper.toLogStreamDto(any())).thenReturn(streamLogDto);
    when(streamLogMapper.toStreamLog(any())).thenReturn(streamLog);
    when(logStreamRepository.save(any())).thenReturn(streamLog);

    StreamLogDto actualStreamLog = streamLogDao.createStreamLog(streamLogDto);

    assertEquals(streamLogDto, actualStreamLog);
  }

  @Test
  final void getStreamLogsTest() {
    when(streamLogMapper.toStreamLogModels(any())).thenReturn(streamLogModelList);
    when(logStreamRepository.findByStreamId("1", user.getId())).thenReturn(streamLogList);

    List<StreamLogModel> listOfStreamLogModels_actual =
        streamLogDao.getStreamLogs(1L, user.getId());

    assertEquals(listOfStreamLogModels_actual, streamLogModelList);
  }
}
