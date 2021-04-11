package org.beanpod.switchboard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dao.InputChannelDaoImpl;
import org.beanpod.switchboard.dao.OutputChannelDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.fixture.StreamStatFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.util.NetworkingUtil;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.openapitools.model.CreateStreamRequest;

class StreamServiceTest {

  public static UserEntity user;
  @Mock InputChannelDaoImpl inputChannelDao;
  @Mock OutputChannelDaoImpl outputChannelDao;
  @Mock HttpServletRequest httpServletRequest;
  @Mock UserPrincipal userPrincipal;
  @Mock UserDaoImpl userDao;
  @InjectMocks private StreamServiceImpl streamService;
  @Mock private StreamDaoImpl streamDao;
  @Mock private StreamMapper mapper;
  @Mock private NetworkingUtil networkingUtil;

  @BeforeEach
  public void setup() {
    user = UserFixture.getUserEntity();

    initMocks(this);

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  @Test
  void testCreateStream_DevicesOnSameLocalNetworkAsService() {
    CreateStreamRequest createStreamRequest = StreamFixture.getCreateStreamRequest();
    InputChannelDto inputChannelDto = ChannelFixture.getInputChannelDto();
    OutputChannelDto outputChannelDto = ChannelFixture.getOutputChannelDto();
    StreamDto streamDto = StreamFixture.getStreamDto();
    DeviceDto decoderDevice = inputChannelDto.getDecoder().getDevice();
    DeviceDto encoderDevice = outputChannelDto.getEncoder().getDevice();

    when(inputChannelDao.getInputChannelById(user, createStreamRequest.getInputChannelId()))
        .thenReturn(inputChannelDto);
    when(outputChannelDao.getOutputChannelById(user, createStreamRequest.getOutputChannelId()))
        .thenReturn(outputChannelDto);
    when(streamDao.saveCreateStream(any())).thenReturn(streamDto);
    when(networkingUtil.areDevicesOnSameLocalNetworkAsService(decoderDevice, encoderDevice))
        .thenReturn(true);
    when(networkingUtil.areDevicesOnSamePrivateNetwork(decoderDevice, encoderDevice))
        .thenReturn(false);

    StreamDto result = streamService.createStream(user, createStreamRequest);

    assertEquals(streamDto, result);
  }

  @Test
  void testCreateStream_DevicesOnSamePrivateNetwork() {
    CreateStreamRequest createStreamRequest = StreamFixture.getCreateStreamRequest();
    InputChannelDto inputChannelDto = ChannelFixture.getInputChannelDto();
    OutputChannelDto outputChannelDto = ChannelFixture.getOutputChannelDto();
    StreamDto streamDto = StreamFixture.getStreamDto();
    DeviceDto decoderDevice = inputChannelDto.getDecoder().getDevice();
    DeviceDto encoderDevice = outputChannelDto.getEncoder().getDevice();

    when(inputChannelDao.getInputChannelById(user, createStreamRequest.getInputChannelId()))
        .thenReturn(inputChannelDto);
    when(outputChannelDao.getOutputChannelById(user, createStreamRequest.getOutputChannelId()))
        .thenReturn(outputChannelDto);
    when(streamDao.saveCreateStream(any())).thenReturn(streamDto);
    when(networkingUtil.areDevicesOnSameLocalNetworkAsService(decoderDevice, encoderDevice))
        .thenReturn(false);
    when(networkingUtil.areDevicesOnSamePrivateNetwork(decoderDevice, encoderDevice))
        .thenReturn(true);

    StreamDto result = streamService.createStream(user, createStreamRequest);

    assertEquals(streamDto, result);
  }

  @Test
  void testCreateStream_DevicesOnDifferentPrivateNetworks() {
    CreateStreamRequest createStreamRequest = StreamFixture.getCreateStreamRequest();
    InputChannelDto inputChannelDto = ChannelFixture.getInputChannelDto();
    OutputChannelDto outputChannelDto = ChannelFixture.getOutputChannelDto();
    StreamDto streamDto = StreamFixture.getStreamDto();
    DeviceDto decoderDevice = inputChannelDto.getDecoder().getDevice();
    DeviceDto encoderDevice = outputChannelDto.getEncoder().getDevice();

    when(inputChannelDao.getInputChannelById(user, createStreamRequest.getInputChannelId()))
        .thenReturn(inputChannelDto);
    when(outputChannelDao.getOutputChannelById(user, createStreamRequest.getOutputChannelId()))
        .thenReturn(outputChannelDto);
    when(streamDao.saveCreateStream(any())).thenReturn(streamDto);
    when(networkingUtil.areDevicesOnSameLocalNetworkAsService(decoderDevice, encoderDevice))
        .thenReturn(false);
    when(networkingUtil.areDevicesOnSamePrivateNetwork(decoderDevice, encoderDevice))
        .thenReturn(false);

    StreamDto result = streamService.createStream(user, createStreamRequest);

    assertEquals(streamDto, result);
  }

  @Test
  void testGetStreamStats() {
    List<StreamStatDto> streamStatsDto = StreamStatFixture.getStreamStatDtoList();
    when(streamDao.getStreamStats(user)).thenReturn(streamStatsDto);
    List<StreamStatDto> streamStats = streamService.getStreamStats(user);
    assertEquals(streamStats.get(0).getId(), streamStatsDto.get(0).getId());
  }

  @Test
  void testGetStreamStat() {
    when(streamDao.getStreamStat(eq(user), any()))
        .thenReturn(java.util.Optional.ofNullable(StreamStatFixture.getStreamStatDto()));
    StreamStatDto streamStatDto = streamService.getStreamStat(user, StreamFixture.ID);
    assertEquals(streamStatDto, StreamStatFixture.getStreamStatDto());
  }

  @Test
  void testUpdateStream() {
    // given
    StreamDto streamDto = StreamFixture.getStreamDto();
    StreamEntity streamEntity = StreamFixture.getStreamEntity();

    when(streamDao.updateStream(user, streamDto)).thenReturn(streamEntity);
    when(mapper.toDto(streamEntity)).thenReturn(streamDto);

    // when
    var result = streamService.updateStream(user, streamDto);

    // then
    assertEquals(streamDto, result);
  }

  @Test
  void testUpdateStreamStat() {
    StreamStatDto streamStat = StreamStatFixture.getStreamStatDto();
    when(streamDao.updateStreamStat(eq(user), any())).thenReturn(streamStat);
    StreamStatDto streamStatDto = streamService.updateStreamStat(user, streamStat);
    assertEquals(streamStat.getId(), streamStatDto.getId());
  }
}
