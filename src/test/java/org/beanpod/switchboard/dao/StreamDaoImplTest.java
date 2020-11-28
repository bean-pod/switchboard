package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

import java.util.List;
import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.dto.StreamDTO;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.repository.StreamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.openapitools.model.CreateStreamRequest;

public class StreamDaoImplTest {
  private StreamDaoImpl streamService;

  @Mock private StreamRepository streamRepository;
  @Mock private StreamMapper streamMapper;
  @Mock private ChannelDaoImpl channelService;

  @BeforeEach
  public void setup() {
    initMocks(this);
    streamService = new StreamDaoImpl(streamRepository, streamMapper, channelService);
  }

  @Test
  public void testGetChannels() {
    // given
    List<Long> channelIdList = StreamFixture.getIdList();
    when(streamRepository.getAllId()).thenReturn(channelIdList);

    // when
    List<Long> result = streamService.getStreams();

    // then
    assertEquals(result, StreamFixture.getIdList());
  }

  @Test
  public void testGetChannelById() {
    long streamId = StreamFixture.ID;
    StreamEntity streamEntity = StreamFixture.getStreamEntity();
    StreamDTO streamDto = StreamFixture.getStreamDto();

    when(streamRepository.getOne(streamId)).thenReturn(streamEntity);
    when(streamMapper.toDto(streamEntity)).thenReturn(streamDto);

    // when
    StreamDTO result = streamService.getStreamById(streamId);

    // then
    assertEquals(result.getId(), streamId);
    assertEquals(result.getInputChannel(), ChannelFixture.getInputChannelDto());
    assertEquals(result.getOutputChannel(), ChannelFixture.getOutputChannelDto());
  }

  @Test
  public void testCreateChannel() {
    // given
    CreateStreamRequest createStreamRequest = StreamFixture.getCreateStreamRequest();
    InputChannelDTO inputChannelDto = ChannelFixture.getInputChannelDto();
    OutputChannelDTO outputChannelDto = ChannelFixture.getOutputChannelDto();
    StreamEntity streamEntity = StreamFixture.getStreamEntity();

    when(channelService.getInputChannelById(createStreamRequest.getInputChannelId()))
        .thenReturn(inputChannelDto);
    when(channelService.getOutputChannelById(createStreamRequest.getOutputChannelId()))
        .thenReturn(outputChannelDto);
    when(streamMapper.toEntity(any())).thenReturn(streamEntity);
    when(streamRepository.existsDuplicate(
            createStreamRequest.getInputChannelId(), createStreamRequest.getOutputChannelId()))
        .thenReturn(false);

    // when
    streamService.createStream(createStreamRequest);

    // then
    verify(streamRepository).save(streamEntity);
  }

  @Test
  public void testDeleteChannel() {
    // given
    long channelId = StreamFixture.ID;

    // when
    streamService.deleteStream(channelId);

    // then
    verify(streamRepository).deleteById(channelId);
  }

  @Test
  public void testUpdateChannel() {
    // given
    StreamDTO streamDto = StreamFixture.getStreamDto();
    StreamEntity streamEntity = StreamFixture.getStreamEntity();

    when(streamRepository.existsById(StreamFixture.ID)).thenReturn(true);
    when(streamMapper.toEntity(streamDto)).thenReturn(streamEntity);

    // when
    streamService.updateStream(streamDto);

    // verify
    verify(streamRepository).save(streamEntity);
  }
}
