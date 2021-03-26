package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

import java.util.List;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.dto.mapper.StreamStatMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.entity.StreamStatEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.fixture.StreamStatFixture;
import org.beanpod.switchboard.repository.StreamRepository;
import org.beanpod.switchboard.repository.StreamStatRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

class StreamDaoImplTest {

  private StreamDaoImpl streamDaoImpl;

  @Mock private StreamRepository streamRepository;
  @Mock private StreamStatRepository streamStatRepository;
  @Mock private StreamMapper streamMapper;
  @Mock private StreamStatMapper streamStatMapper;

  @BeforeEach
  public void setup() {
    initMocks(this);
    streamDaoImpl =
        new StreamDaoImpl(streamRepository, streamStatRepository, streamMapper, streamStatMapper);
  }

  @Test
  void testGetStreams() {
    // given
    List<Long> channelIdList = StreamFixture.getIdList();
    when(streamRepository.getAllId()).thenReturn(channelIdList);

    // when
    List<Long> result = streamDaoImpl.getStreams();

    // then
    assertEquals(result, StreamFixture.getIdList());
  }

  @Test
  void testGetStreamById() {
    long streamId = StreamFixture.ID;
    StreamEntity streamEntity = StreamFixture.getStreamEntity();
    StreamDto streamDto = StreamFixture.getStreamDto();

    when(streamRepository.getOne(streamId)).thenReturn(streamEntity);
    when(streamMapper.toDto(streamEntity)).thenReturn(streamDto);

    // when
    StreamDto result = streamDaoImpl.getStreamById(streamId);

    // then
    assertEquals(result.getId(), streamId);
    assertEquals(result.getInputChannel(), ChannelFixture.getInputChannelDto());
    assertEquals(result.getOutputChannel(), ChannelFixture.getOutputChannelDto());
  }

  @Test
  void testCreateStream() {
    // given
    StreamDto streamDto = StreamFixture.getStreamDto();
    long inputChannelId = streamDto.getInputChannel().getId();
    long outputChannelId = streamDto.getOutputChannel().getId();
    StreamEntity streamEntity = StreamFixture.getStreamEntity();
    StreamStatEntity streamStatEntity = StreamStatFixture.getStreamStatEntity();
    StreamStatDto streamStatDto = StreamStatFixture.getStreamStatDto();

    when(streamMapper.toEntity(any())).thenReturn(streamEntity);
    when(streamRepository.existsDuplicate(inputChannelId, outputChannelId)).thenReturn(false);
    when(streamStatRepository.save(any())).thenReturn(streamStatEntity);
    when(streamStatMapper.toDto(any(StreamStatEntity.class))).thenReturn(streamStatDto);
    when(streamRepository.save(any())).thenReturn(streamEntity);
    when(streamMapper.toDto(any(StreamEntity.class))).thenReturn(streamDto);
    // when
    streamDaoImpl.saveStream(streamDto);

    // then
    verify(streamRepository).save(streamEntity);
  }

  @Test
  void testCreateStreamAlreadyExists() {
    // given
    StreamDto streamDto = StreamFixture.getStreamDto();
    long inputChannelId = streamDto.getInputChannel().getId();
    long outputChannelId = streamDto.getOutputChannel().getId();

    when(streamRepository.existsDuplicate(inputChannelId, outputChannelId)).thenReturn(true);

    // when & then
    assertThrows(
        ExceptionType.StreamAlreadyExistsException.class,
        () -> streamDaoImpl.saveStream(streamDto));
  }

  @Test
  void testDeleteStream() {
    // given
    long channelId = StreamFixture.ID;

    // when
    streamDaoImpl.deleteStream(channelId);

    // then
    verify(streamRepository).deleteById(channelId);
  }

  @Test
  void testUpdateStream() {
    // given
    StreamDto streamDto = StreamFixture.getStreamDto();
    StreamEntity streamEntity = StreamFixture.getStreamEntity();

    when(streamRepository.existsById(StreamFixture.ID)).thenReturn(true);
    when(streamMapper.toEntity(streamDto)).thenReturn(streamEntity);

    // when
    streamDaoImpl.updateStream(streamDto);

    // verify
    verify(streamRepository).save(streamEntity);
  }

  @Test
  void testUpdateNonExistingStreamStat() {

    StreamStatDto streamStatDto = StreamStatFixture.getStreamStatDto();
    when(streamRepository.existsById(StreamFixture.ID)).thenReturn(false);

    assertThrows(
        ExceptionType.StreamDoesNotExistException.class,
        () -> streamDaoImpl.updateStreamStat(streamStatDto));
  }

  @Test
  void testUpdateStreamStat() {
    List<StreamStatEntity> streamStatEntityList = StreamStatFixture.getStreamStatEntityList();
    List<StreamStatDto> streamStatDtoList = StreamStatFixture.getStreamStatDtoList();
    StreamStatEntity streamStatEntity = StreamStatFixture.getStreamStatEntity();
    StreamStatDto streamStatDto = StreamStatFixture.getStreamStatDto();

    when(streamRepository.existsById(StreamFixture.ID)).thenReturn(true);
    when(streamStatRepository.findAll()).thenReturn(streamStatEntityList);
    when(streamStatMapper.toDtoList(any())).thenReturn(streamStatDtoList);
    when(streamStatMapper.toDto(any(StreamStatEntity.class))).thenReturn(streamStatDto);
    when(streamStatRepository.save(any())).thenReturn(streamStatEntity);
    when(streamStatMapper.toEntity(any())).thenReturn(streamStatEntity);

    StreamStatDto streamStatDto1 = streamDaoImpl.updateStreamStat(streamStatDto);
    assertEquals(StreamFixture.ID, streamStatDto1.getId());
  }

  @Test
  void testFindStreamStat() {
    List<StreamStatEntity> streamStatEntityList = StreamStatFixture.getStreamStatEntityList();
    List<StreamStatDto> streamStatDtoList = StreamStatFixture.getStreamStatDtoList();
    when(streamStatRepository.findAll()).thenReturn(streamStatEntityList);
    when(streamStatMapper.toDtoList(any())).thenReturn(streamStatDtoList);

    List<StreamStatDto> streamStats = streamDaoImpl.getStreamStats();
    assertEquals(streamStats.get(0).getId(), streamStatDtoList.get(0).getId());
  }
}
