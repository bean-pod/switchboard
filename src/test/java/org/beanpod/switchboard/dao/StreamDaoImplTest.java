package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.repository.StreamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

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
  public void testGetStreams() {
    // given
    List<Long> channelIdList = StreamFixture.getIdList();
    when(streamRepository.getAllId()).thenReturn(channelIdList);

    // when
    List<Long> result = streamService.getStreams();

    // then
    assertEquals(result, StreamFixture.getIdList());
  }

  @Test
  public void testGetStreamById() {
    long streamId = StreamFixture.ID;
    StreamEntity streamEntity = StreamFixture.getStreamEntity();
    StreamDto streamDto = StreamFixture.getStreamDto();

    when(streamRepository.getOne(streamId)).thenReturn(streamEntity);
    when(streamMapper.toDto(streamEntity)).thenReturn(streamDto);

    // when
    StreamDto result = streamService.getStreamById(streamId);

    // then
    assertEquals(result.getId(), streamId);
    assertEquals(result.getInputChannel(), ChannelFixture.getInputChannelDto());
    assertEquals(result.getOutputChannel(), ChannelFixture.getOutputChannelDto());
  }

  @Test
  public void testCreateStream() {
      // given
      StreamDto streamDto = StreamFixture.getStreamDto();
      long inputChannelId = streamDto.getInputChannel().getId();
      long outputChannelId = streamDto.getOutputChannel().getId();
      StreamEntity streamEntity = StreamFixture.getStreamEntity();

      when(streamMapper.toEntity(any())).thenReturn(streamEntity);
      when(streamRepository.existsDuplicate(inputChannelId, outputChannelId)).thenReturn(false);

      // when
      streamService.saveStream(streamDto);

      // then
      verify(streamRepository).save(streamEntity);
  }

  @Test
  public void testCreateStreamAlreadyExists() {
      // given
      StreamDto streamDto = StreamFixture.getStreamDto();
      long inputChannelId = streamDto.getInputChannel().getId();
      long outputChannelId = streamDto.getOutputChannel().getId();

      when(streamRepository.existsDuplicate(inputChannelId, outputChannelId)).thenReturn(true);

      // when & then
      assertThrows(
              ExceptionType.StreamAlreadyExistsException.class,
              () -> streamService.saveStream(streamDto));
  }

  @Test
  public void testDeleteStream() {
    // given
    long channelId = StreamFixture.ID;

    // when
    streamService.deleteStream(channelId);

    // then
    verify(streamRepository).deleteById(channelId);
  }

  @Test
  public void testUpdateStream() {
    // given
    StreamDto streamDto = StreamFixture.getStreamDto();
    StreamEntity streamEntity = StreamFixture.getStreamEntity();

    when(streamRepository.existsById(StreamFixture.ID)).thenReturn(true);
    when(streamMapper.toEntity(streamDto)).thenReturn(streamEntity);

    // when
    streamService.updateStream(streamDto);

    // verify
    verify(streamRepository).save(streamEntity);
  }
}
