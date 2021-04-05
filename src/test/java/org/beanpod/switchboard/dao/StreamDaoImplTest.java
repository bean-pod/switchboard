package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.dto.mapper.StreamStatMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.entity.StreamEntity.StreamIdProjection;
import org.beanpod.switchboard.entity.StreamStatEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.fixture.StreamStatFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.StreamRepository;
import org.beanpod.switchboard.repository.StreamStatRepository;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

class StreamDaoImplTest {

  private static UserEntity user;
  @Mock private StreamDaoImpl streamDaoImpl;
  @Mock private StreamRepository streamRepository;
  @Mock private StreamStatRepository streamStatRepository;
  @Mock private StreamMapper streamMapper;
  @Mock private StreamStatMapper streamStatMapper;
  @Mock private HttpServletRequest request;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;

  @BeforeEach
  public void setup() {
    user = UserFixture.getUserEntity();

    initMocks(this);

    UserMockUtil.mockUser(user, request, userPrincipal, userDao);
  }

  @Test
  @Disabled
  void testGetStreams() {
    // given
    List<StreamIdProjection> streamIdList = StreamFixture.getStreamIdProjectionList();
    when(streamRepository
            .findStreamIdsByInputChannelDecoderDeviceUserOrOutputChannelEncoderDeviceUser(
                user, user))
        .thenReturn(streamIdList);

    // when
    List<Long> result = streamDaoImpl.getStreams(user);

    // then
    assertEquals(result, StreamFixture.getStreamIdList());
  }

  @Test
  @Disabled
  void testGetStreamById() {
    long streamId = StreamFixture.ID;
    StreamEntity streamEntity = StreamFixture.getStreamEntity();
    StreamDto streamDto = StreamFixture.getStreamDto();

    when(streamRepository
            .findByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
                user, streamId, user, streamId))
        .thenReturn(streamEntity);
    when(streamMapper.toStreamDto(streamEntity)).thenReturn(streamDto);

    // when
    StreamDto result = streamDaoImpl.getStreamById(user, streamId);

    // then
    assertEquals(result.getId(), streamId);
    assertEquals(result.getInputChannel(), ChannelFixture.getInputChannelDto());
    assertEquals(result.getOutputChannel(), ChannelFixture.getOutputChannelDto());
  }

  @Test
  @Disabled
  void testCreateStream() {
    // given
    StreamDto streamDto = StreamFixture.getStreamDto();
    long inputChannelId = streamDto.getInputChannel().getId();
    long outputChannelId = streamDto.getOutputChannel().getId();
    StreamEntity streamEntity = StreamFixture.getStreamEntity();
    StreamStatEntity streamStatEntity = StreamStatFixture.getStreamStatEntity();
    StreamStatDto streamStatDto = StreamStatFixture.getStreamStatDto();

    when(streamMapper.toStreamEntity(any())).thenReturn(streamEntity);
    when(streamRepository.existsByInputChannelIdAndOutputChannelId(inputChannelId, outputChannelId))
        .thenReturn(false);
    when(streamStatRepository.save(any())).thenReturn(streamStatEntity);
    when(streamStatMapper.toStreamStatDto(any(StreamStatEntity.class))).thenReturn(streamStatDto);
    when(streamRepository.save(any())).thenReturn(streamEntity);
    when(streamMapper.toStreamDto(any(StreamEntity.class))).thenReturn(streamDto);
    // when
    streamDaoImpl.saveCreateStream(streamDto);

    // then
    verify(streamRepository).save(streamEntity);
  }

  @Test
  @Disabled
  void testCreateStreamAlreadyExists() {
    // given
    StreamDto streamDto = StreamFixture.getStreamDto();
    long inputChannelId = streamDto.getInputChannel().getId();
    long outputChannelId = streamDto.getOutputChannel().getId();

    when(streamRepository.existsByInputChannelIdAndOutputChannelId(inputChannelId, outputChannelId))
        .thenReturn(true);

    // when & then
    assertThrows(
        ExceptionType.StreamAlreadyExistsException.class,
        () -> streamDaoImpl.saveCreateStream(streamDto));
  }

  @Test
  @Disabled
  void testDeleteStream() {
    // given
    long channelId = StreamFixture.ID;

    // when
    streamDaoImpl.deleteStream(user, channelId);

    // then
    verify(streamRepository).deleteById(channelId);
  }

  @Test
  @Disabled
  void testUpdateStream() {
    // given
    StreamDto streamDto = StreamFixture.getStreamDto();
    StreamEntity streamEntity = StreamFixture.getStreamEntity();

    when(streamRepository.existsById(StreamFixture.ID)).thenReturn(true);
    when(streamMapper.toStreamEntity(streamDto)).thenReturn(streamEntity);

    // when
    streamDaoImpl.updateStream(user, streamDto);

    // verify
    verify(streamRepository).save(streamEntity);
  }

  @Test
  @Disabled
  void testUpdateNonExistingStreamStat() {

    StreamStatDto streamStatDto = StreamStatFixture.getStreamStatDto();
    when(streamRepository.existsById(StreamFixture.ID)).thenReturn(false);

    assertThrows(
        ExceptionType.StreamDoesNotExistException.class,
        () -> streamDaoImpl.updateStreamStat(user, streamStatDto));
  }

  @Test
  @Disabled
  void testUpdateStreamStat() {
    List<StreamStatEntity> streamStatEntityList = StreamStatFixture.getStreamStatEntityList();
    List<StreamStatDto> streamStatDtoList = StreamStatFixture.getStreamStatDtoList();
    StreamStatEntity streamStatEntity = StreamStatFixture.getStreamStatEntity();
    StreamStatDto streamStatDto = StreamStatFixture.getStreamStatDto();

    when(streamRepository.existsById(StreamFixture.ID)).thenReturn(true);
    when(streamStatRepository
            .findByStreamInputChannelDecoderDeviceUserOrStreamOutputChannelEncoderDeviceUser(
                user, user))
        .thenReturn(streamStatEntityList);
    when(streamStatMapper.toStreamStatDtoList(any())).thenReturn(streamStatDtoList);
    when(streamStatMapper.toStreamStatDto(any(StreamStatEntity.class))).thenReturn(streamStatDto);
    when(streamStatRepository.save(any())).thenReturn(streamStatEntity);
    when(streamStatMapper.toStreamStatEntity(any())).thenReturn(streamStatEntity);

    StreamStatDto streamStatDto1 = streamDaoImpl.updateStreamStat(user, streamStatDto);
    assertEquals(StreamFixture.ID, streamStatDto1.getId());
  }

  @Test
  @Disabled
  void testFindStreamStat() {
    List<StreamStatEntity> streamStatEntityList = StreamStatFixture.getStreamStatEntityList();
    List<StreamStatDto> streamStatDtoList = StreamStatFixture.getStreamStatDtoList();
    when(streamStatRepository
            .findByStreamInputChannelDecoderDeviceUserOrStreamOutputChannelEncoderDeviceUser(
                user, user))
        .thenReturn(streamStatEntityList);
    when(streamStatMapper.toStreamStatDtoList(any())).thenReturn(streamStatDtoList);

    List<StreamStatDto> streamStats = streamDaoImpl.getStreamStats(user);
    assertEquals(streamStats.get(0).getId(), streamStatDtoList.get(0).getId());
  }
}
