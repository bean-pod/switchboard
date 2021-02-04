package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.List;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.service.StreamService;
import org.beanpod.switchboard.util.MaintainDeviceStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.StreamModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class StreamControllerTest {

  private StreamController streamController;

  @Mock
  private StreamDaoImpl streamDao;
  @Mock
  private StreamMapper streamMapper;
  @Mock
  private StreamService streamService;
  @Mock
  private MaintainDeviceStatus maintainDeviceStatus;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.initMocks(this);
    streamController = new StreamController(streamDao, streamService, streamMapper,
        maintainDeviceStatus);
  }

  @Test
  void testGetStreams() {
    // given
    when(streamDao.getStreams()).thenReturn(StreamFixture.getIdList());

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
    when(streamDao.getStreams()).thenReturn(null);

    // when & then
    RuntimeException exception =
        assertThrows(ExceptionType.UnknownException.class, () -> streamController.getStreams());

    assertEquals("Unknown error the Stream controller", exception.getMessage());
  }

  @Test
  void testGetStreamsThrowsException() {
    // given
    when(streamDao.getStreams()).thenThrow(new RuntimeException());

    // when & then
    RuntimeException exception =
        assertThrows(RuntimeException.class, () -> streamController.getStreams());
  }

  @Test
  void testGetStreamById() {
    // given
    StreamDto streamDto = StreamFixture.getStreamDto();
    when(streamDao.getStreamById(StreamFixture.ID)).thenReturn(streamDto);
    when(streamMapper.toModel(streamDto)).thenReturn(StreamFixture.getStreamModel());

    // when
    ResponseEntity<StreamModel> result = streamController.getStreamById(StreamFixture.ID);

    // then
    assertEquals(HttpStatus.OK, result.getStatusCode());
    assertNotNull(result);
    assertNotNull(result.getBody());
    StreamModel responseBody = result.getBody();
    assertEquals(StreamFixture.ID, responseBody.getId());
    assertEquals(responseBody.getInputChannel(), ChannelFixture.getInputChannelModel());
    assertEquals(responseBody.getOutputChannel(), ChannelFixture.getOutputChannelModel());
  }

  @Test
  void testCreateStream() {
    // given
    var createStreamRequest = StreamFixture.getCreateStreamRequest();
    var streamDto = StreamFixture.getStreamDto();
    var streamModel = StreamFixture.getStreamModel();

    when(streamService.createStream(createStreamRequest)).thenReturn(streamDto);
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
    when(streamService.updateStream(streamDto)).thenReturn(streamDto);
    when(streamMapper.toModel(streamDto)).thenReturn(streamModel);

    // when
    ResponseEntity<StreamModel> result = streamController.updateStream(streamModel);

    // then
    assertEquals(HttpStatus.OK, result.getStatusCode());
  }
}
