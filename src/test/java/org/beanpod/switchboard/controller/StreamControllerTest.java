package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.List;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.StreamDTO;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.StreamModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class StreamControllerTest {
  private StreamController streamController;

  @Mock private StreamDaoImpl streamService;
  @Mock private StreamMapper streamMapper;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.initMocks(this);
    streamController = new StreamController(streamService, streamMapper);
  }

  @Test
  void testGetChannels() {
    // given
    when(streamService.getStreams()).thenReturn(StreamFixture.getIdList());

    // when
    ResponseEntity<List<Long>> result = streamController.getStreams();

    // then
    assertNotNull(result);
    List<Long> responseBody = result.getBody();
    assertEquals(StreamFixture.ID, responseBody.get(0));
  }

  @Test
  void testGetChannelsDtoReturnsNull() {
    // given
    when(streamService.getStreams()).thenReturn(null);

    // when & then
    RuntimeException exception =
        assertThrows(RuntimeException.class, () -> streamController.getStreams());

    assertEquals(StreamController.UNKNOWN_ERROR_MESSAGE, exception.getMessage());
  }

  @Test
  void testGetChannelsThrowsException() {
    // given
    when(streamService.getStreams()).thenThrow(new RuntimeException());

    // when & then
    RuntimeException exception =
        assertThrows(RuntimeException.class, () -> streamController.getStreams());
  }

  @Test
  void testGetChannelById() {
    // given
    StreamDTO streamDto = StreamFixture.getStreamDto();
    when(streamService.getStreamById(StreamFixture.ID)).thenReturn(streamDto);
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
  void testCreateChannel() {
    //given
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
  void testDeleteChannel() {
    // when
    ResponseEntity<Void> result = streamController.deleteStream(StreamFixture.ID);

    // then
    assertEquals(HttpStatus.OK, result.getStatusCode());
  }

  @Test
  void testUpdateChannel() {
    // given
    StreamModel streamModel = StreamFixture.getStreamModel();
    when(streamMapper.toDto(streamModel)).thenReturn(StreamFixture.getStreamDto());

    // when
    ResponseEntity<Void> result = streamController.updateStream(streamModel);

    // then
    assertEquals(HttpStatus.OK, result.getStatusCode());
  }
}
