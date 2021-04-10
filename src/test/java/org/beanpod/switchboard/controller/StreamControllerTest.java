package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.dto.mapper.StreamStatMapper;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.fixture.StreamStatFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.service.StreamService;
import org.beanpod.switchboard.util.MaintainDeviceStatus;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.StreamModel;
import org.openapitools.model.StreamStatModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class StreamControllerTest {

  private static UserEntity user;
  @InjectMocks private StreamController streamController;
  @Mock private StreamDaoImpl streamDao;
  @Mock private StreamMapper streamMapper;
  @Mock private StreamStatMapper streamStatMapper;
  @Mock private StreamService streamService;
  @Mock private HttpServletRequest request;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;
  @Mock private MaintainDeviceStatus maintainDeviceStatus;

  @BeforeEach
  public void setup() {
    user = UserFixture.getUserEntity();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, request, userPrincipal, userDao);
  }

  @Test
  void testGetStreams() {
    // given
    when(streamDao.getStreams(user)).thenReturn(StreamFixture.getStreamIdList());

    // when
    ResponseEntity<List<Long>> result = streamController.getStreams();

    // then
    assertNotNull(result);
    assertNotNull(result.getBody());
    List<Long> responseBody = result.getBody();
    assertEquals(StreamFixture.ID, responseBody.get(0));
  }

  @Test
  void testGetStreamsDtoReturnsNull() {
    // given
    when(streamDao.getStreams(user)).thenReturn(null);

    // when & then
    RuntimeException exception =
        assertThrows(ExceptionType.UnknownException.class, () -> streamController.getStreams());

    assertEquals("Unknown error the Stream controller", exception.getMessage());
  }

  @Test
  void testGetStreamsThrowsException() {
    // given
    when(streamDao.getStreams(user)).thenThrow(new RuntimeException());

    // when & then
    assertThrows(RuntimeException.class, () -> streamController.getStreams());
  }

  @Test
  void testGetStreamById() {
    // given
    StreamDto streamDto = StreamFixture.getStreamDto();
    when(streamDao.getStreamById(user, StreamFixture.ID)).thenReturn(streamDto);
    when(streamMapper.toModel(streamDto)).thenReturn(StreamFixture.getStreamModel());

    // when
    ResponseEntity<StreamModel> result = streamController.getStreamById(StreamFixture.ID);

    // then
    verify(maintainDeviceStatus).maintainStatusField(streamDto);

    assertEquals(HttpStatus.OK, result.getStatusCode());
    assertNotNull(result);
    assertNotNull(result.getBody());
    StreamModel responseBody = result.getBody();
    assertEquals(StreamFixture.ID, responseBody.getId());
    assertEquals(responseBody.getInputChannel(), ChannelFixture.getInputChannelModel());
    assertEquals(responseBody.getOutputChannel(), ChannelFixture.getOutputChannelModel());
  }

  @Test
  void testGetStreamStatById() {
    StreamStatDto streamStatDto = StreamStatFixture.getStreamStatDto();
    when(streamDao.getStreamStat(user, StreamStatFixture.ID))
        .thenReturn(Optional.of(streamStatDto));
    when(streamStatMapper.toModel(streamStatDto))
        .thenReturn(StreamStatFixture.getStreamStatModel());

    ResponseEntity<StreamStatModel> result =
        streamController.getStreamStatById(StreamStatFixture.ID);

    assertEquals(result.getBody(), StreamStatFixture.getStreamStatModel());
  }

  @Test
  void testCreateStream() {
    // given
    var createStreamRequest = StreamFixture.getCreateStreamRequest();
    var streamDto = StreamFixture.getStreamDto();
    var streamModel = StreamFixture.getStreamModel();

    when(streamService.createStream(user, createStreamRequest)).thenReturn(streamDto);
    when(streamMapper.toModel(streamDto)).thenReturn(streamModel);

    // when
    ResponseEntity<StreamModel> result = streamController.createStream(createStreamRequest);

    // then
    assertEquals(HttpStatus.OK, result.getStatusCode());
    assertNotNull(result.getBody());
    assertEquals(streamModel, result.getBody());
  }

  @Test
  void testDeleteStream() {
    // when
    ResponseEntity<Void> result = streamController.deleteStream(StreamFixture.ID);

    // then
    assertEquals(HttpStatus.OK, result.getStatusCode());
  }

  @Test
  void testUpdateStream() {
    // given
    StreamModel streamModel = StreamFixture.getStreamModel();
    StreamDto streamDto = StreamFixture.getStreamDto();
    when(streamMapper.toDto(streamModel)).thenReturn(streamDto);
    when(streamService.updateStream(user, streamDto)).thenReturn(streamDto);
    when(streamMapper.toModel(streamDto)).thenReturn(streamModel);

    // when
    ResponseEntity<StreamModel> result = streamController.updateStream(streamModel);

    // then
    assertEquals(HttpStatus.OK, result.getStatusCode());
  }

  @Test
  void testUpdateStreamStat() {
    StreamStatModel streamStatModel = StreamStatFixture.getStreamStatModel();
    StreamStatDto streamStatDto = StreamStatFixture.getStreamStatDto();
    when(streamStatMapper.toDto(any(StreamStatModel.class))).thenReturn(streamStatDto);
    when(streamStatMapper.toModel(any())).thenReturn(streamStatModel);
    when(streamService.updateStreamStat(eq(user), any())).thenReturn(streamStatDto);

    ResponseEntity<StreamStatModel> result = streamController.updateStreamStat(streamStatModel);
    assertNotNull(result.getBody());
    assertEquals(StreamFixture.ID, result.getBody().getId());
  }

  @Test
  void testRetrieveStreamStats() {
    List<StreamStatModel> streamStatModelList = StreamStatFixture.getStreamStatModelList();
    List<StreamStatDto> streamStatDto = StreamStatFixture.getStreamStatDtoList();

    when(streamStatMapper.toModels(any())).thenReturn(streamStatModelList);
    when(streamService.getStreamStats(user)).thenReturn(streamStatDto);

    ResponseEntity<List<StreamStatModel>> result = streamController.retrieveStreamStats();
    assertNotNull(result.getBody());
    assertEquals(streamStatDto.get(0).getId(), result.getBody().get(0).getId());
  }
}
