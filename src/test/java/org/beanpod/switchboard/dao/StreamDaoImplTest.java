package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.repository.StreamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.openapitools.model.CreateStreamRequest;

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
  public void testCreateStreamAlreadyExists() {
    // given
    CreateStreamRequest createStreamRequest = StreamFixture.getCreateStreamRequest();

    when(streamRepository.existsDuplicate(
            createStreamRequest.getInputChannelId(), createStreamRequest.getOutputChannelId()))
            .thenReturn(true);

    // when & then
    assertThrows(
            ExceptionType.StreamAlreadyExistsException.class,
            () -> streamService.createStream(createStreamRequest));
  }

  @Test
  public void testCreateStreamDifferentPublicIp() {
    String otherPublicIpAddress = "179.256.54.21";
    CreateStreamRequest createStreamRequest = StreamFixture.getCreateStreamRequest();
    InputChannelDTO inputChannelDto = ChannelFixture.getInputChannelDto();
    OutputChannelDTO outputChannelDto = ChannelFixture.getOutputChannelDto();
    outputChannelDto.getEncoder().getDevice().setPublicIpAddress(otherPublicIpAddress);
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
  public void testCreateStreamSameDeviceIpV4() {
    String otherPublicIpAddress = StreamDaoImpl.LOOPBACK_IP_V4;
    CreateStreamRequest createStreamRequest = StreamFixture.getCreateStreamRequest();
    InputChannelDTO inputChannelDto = ChannelFixture.getInputChannelDto();
    OutputChannelDTO outputChannelDto = ChannelFixture.getOutputChannelDto();
    outputChannelDto.getEncoder().getDevice().setPublicIpAddress(otherPublicIpAddress);
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
  public void testCreateChannelSameDeviceIpV6() {
    String otherPublicIpAddress = StreamDaoImpl.LOOPBACK_IP_V6;
    CreateStreamRequest createStreamRequest = StreamFixture.getCreateStreamRequest();
    InputChannelDTO inputChannelDto = ChannelFixture.getInputChannelDto();
    OutputChannelDTO outputChannelDto = ChannelFixture.getOutputChannelDto();
    outputChannelDto.getEncoder().getDevice().setPublicIpAddress(otherPublicIpAddress);
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
  public void testCreateStreamLocalNetwork() {
    String otherPublicIpAddress = DeviceFixture.PRIVATE_IP_ADDRESS;
    CreateStreamRequest createStreamRequest = StreamFixture.getCreateStreamRequest();
    InputChannelDTO inputChannelDto = ChannelFixture.getInputChannelDto();
    OutputChannelDTO outputChannelDto = ChannelFixture.getOutputChannelDto();
    outputChannelDto.getEncoder().getDevice().setPublicIpAddress(otherPublicIpAddress);
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
