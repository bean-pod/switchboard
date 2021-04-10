package org.beanpod.switchboard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

import java.util.List;
import org.beanpod.switchboard.dao.InputChannelDaoImpl;
import org.beanpod.switchboard.dao.OutputChannelDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.fixture.StreamStatFixture;
import org.beanpod.switchboard.util.NetworkingUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.openapitools.model.CreateStreamRequest;

class StreamServiceTest {

  @InjectMocks private StreamServiceImpl streamService;
  @Mock private StreamDaoImpl streamDao;
  @Mock private StreamMapper mapper;
  @Mock InputChannelDaoImpl inputChannelDao;
  @Mock OutputChannelDaoImpl outputChannelDao;
  @Mock private NetworkingUtil networkingUtil;

  @BeforeEach
  public void setup() {
    initMocks(this);
    streamService =
        new StreamServiceImpl(streamDao, mapper, inputChannelDao, outputChannelDao, networkingUtil);
  }

  @Test
  void testCreateStream_DevicesOnSameLocalNetworkAsService() {
    CreateStreamRequest createStreamRequest = StreamFixture.getCreateStreamRequest();
    InputChannelDto inputChannelDto = ChannelFixture.getInputChannelDto();
    OutputChannelDto outputChannelDto = ChannelFixture.getOutputChannelDto();
    StreamDto streamDto = StreamFixture.getStreamDto();
    DeviceDto decoderDevice = inputChannelDto.getDecoder().getDevice();
    DeviceDto encoderDevice = outputChannelDto.getEncoder().getDevice();

    when(inputChannelDao.getInputChannelById(createStreamRequest.getInputChannelId()))
        .thenReturn(inputChannelDto);
    when(outputChannelDao.getOutputChannelById(createStreamRequest.getOutputChannelId()))
        .thenReturn(outputChannelDto);
    when(streamDao.saveStream(any())).thenReturn(streamDto);
    when(networkingUtil.areDevicesOnSameLocalNetworkAsService(decoderDevice, encoderDevice))
        .thenReturn(true);
    when(networkingUtil.areDevicesOnSamePrivateNetwork(decoderDevice, encoderDevice))
        .thenReturn(false);

    StreamDto result = streamService.createStream(createStreamRequest);

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

    when(inputChannelDao.getInputChannelById(createStreamRequest.getInputChannelId()))
        .thenReturn(inputChannelDto);
    when(outputChannelDao.getOutputChannelById(createStreamRequest.getOutputChannelId()))
        .thenReturn(outputChannelDto);
    when(streamDao.saveStream(any())).thenReturn(streamDto);
    when(networkingUtil.areDevicesOnSameLocalNetworkAsService(decoderDevice, encoderDevice))
        .thenReturn(false);
    when(networkingUtil.areDevicesOnSamePrivateNetwork(decoderDevice, encoderDevice))
        .thenReturn(true);

    StreamDto result = streamService.createStream(createStreamRequest);

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

    when(inputChannelDao.getInputChannelById(createStreamRequest.getInputChannelId()))
        .thenReturn(inputChannelDto);
    when(outputChannelDao.getOutputChannelById(createStreamRequest.getOutputChannelId()))
        .thenReturn(outputChannelDto);
    when(streamDao.saveStream(any())).thenReturn(streamDto);
    when(networkingUtil.areDevicesOnSameLocalNetworkAsService(decoderDevice, encoderDevice))
        .thenReturn(false);
    when(networkingUtil.areDevicesOnSamePrivateNetwork(decoderDevice, encoderDevice))
        .thenReturn(false);

    StreamDto result = streamService.createStream(createStreamRequest);

    assertEquals(streamDto, result);
  }

  @Test
  void testGetStreamStats() {
    List<StreamStatDto> streamStatsDto = StreamStatFixture.getStreamStatDtoList();
    when(streamDao.getStreamStats()).thenReturn(streamStatsDto);
    List<StreamStatDto> streamStats = streamService.getStreamStats();
    assertEquals(streamStats.get(0).getId(), streamStatsDto.get(0).getId());
  }

  @Test
  void testGetStreamStat() {
    when(streamDao.getStreamStat(any()))
        .thenReturn(java.util.Optional.ofNullable(StreamStatFixture.getStreamStatDto()));
    StreamStatDto streamStatDto = streamService.getStreamStat(StreamFixture.ID);
    assertEquals(streamStatDto, StreamStatFixture.getStreamStatDto());
  }

  @Test
  void testUpdateStream() {
    // given
    StreamDto streamDto = StreamFixture.getStreamDto();
    StreamEntity streamEntity = StreamFixture.getStreamEntity();

    when(streamDao.updateStream(streamDto)).thenReturn(streamEntity);
    when(mapper.toDto(streamEntity)).thenReturn(streamDto);

    // when
    var result = streamService.updateStream(streamDto);

    // then
    assertEquals(streamDto, result);
  }

  @Test
  void testUpdateStreamStat() {
    StreamStatDto streamStat = StreamStatFixture.getStreamStatDto();
    when(streamDao.updateStreamStat(any())).thenReturn(streamStat);
    StreamStatDto streamStatDto = streamService.updateStreamStat(streamStat);
    assertEquals(streamStat.getId(), streamStatDto.getId());
  }
}
