package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.dto.mapper.StreamLogMapper;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.entity.StreamLogEntity;
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

  private StreamLogEntity streamLogEntity;
  private StreamLogDto streamLogDto;
  private List<StreamLogModel> streamLogModelList;
  private UserEntity user;
  private List<StreamLogEntity> streamLogEntityList;

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);

    streamLogEntity = StreamLogFixture.getStreamLog();
    streamLogDto = StreamLogFixture.getStreamLogDto();
    streamLogModelList = StreamLogFixture.getListOfStreamLogsModel();
    user = UserFixture.getUserEntity();
    streamLogEntityList = StreamLogFixture.getListOfStreamLogs();
  }

  @Test
  final void createStreamLogTest() {
    when(streamLogMapper.toDto(any())).thenReturn(streamLogDto);
    when(streamLogMapper.toEntity(any())).thenReturn(streamLogEntity);
    when(logStreamRepository.save(any())).thenReturn(streamLogEntity);

    StreamLogDto actualStreamLog = streamLogDao.createStreamLog(streamLogDto);

    assertEquals(streamLogDto, actualStreamLog);
  }

  @Test
  final void getStreamLogsTest() {
    when(streamLogMapper.toModels(any())).thenReturn(streamLogModelList);
    when(logStreamRepository.findByStreamId("1", user.getId())).thenReturn(streamLogEntityList);

    List<StreamLogModel> listOfStreamLogModels_actual =
        streamLogDao.getStreamLogs(1L, user.getId());

    assertEquals(listOfStreamLogModels_actual, streamLogModelList);
  }
}
