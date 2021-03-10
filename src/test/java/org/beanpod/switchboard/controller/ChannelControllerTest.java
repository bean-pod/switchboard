package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.dao.ChannelDaoImpl;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dto.ChannelDto;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;

class ChannelControllerTest {

  public static List<ChannelEntity> channelEntityList;
  public static List<ChannelDto> channelDtoList;
  public static EncoderDto encoderDto;
  public static DecoderDto decoderDto;
  public static ChannelDto channelDto;
  public static InputChannelDto inputChannelDto;
  public static OutputChannelDto outputChannelDto;
  @InjectMocks ChannelController channelController;
  @Mock ChannelDaoImpl channelService;
  @Mock DecoderDaoImpl decoderService;
  @Mock EncoderDaoImpl encoderService;
  @Mock ChannelMapper channelMapper;

  @BeforeEach
  void setupChannelFixture() throws ParseException {
    channelEntityList = List.of(ChannelFixture.getChannelEntity1());
    channelDtoList = List.of(ChannelFixture.getChannelDto());
    encoderDto = EncoderFixture.getEncoderDto();
    decoderDto = DecoderFixture.getDecoderDto();
    channelDto = ChannelFixture.getChannelDto();
    inputChannelDto = ChannelFixture.getInputChannelDto();
    outputChannelDto = ChannelFixture.getOutputChannelDto();
  }

  @BeforeEach
  void setUp() {
    initMocks(this);
  }

  @Test
  void testRetrieveAllChannels() {
    when(channelService.getChannels()).thenReturn(channelEntityList);
    when(channelMapper.toChannelDtos(any())).thenReturn(channelDtoList);
    List<ChannelDto> channelDtos = channelController.retrieveAllChannels();
    assertEquals(channelDtoList, channelDtos);
  }

  @Test
  void testRetrieveChannel() {
    when(channelService.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
    ResponseEntity<ChannelDto> channelDTOResponseEntity =
        channelController.retrieveChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(channelDto, channelDTOResponseEntity.getBody());
  }

  @Test
  void testRetrieveChannelEmpty() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          channelController.retrieveChannel(ChannelFixture.CHANNEL_ID);
        });
  }

  @Test
  void createChannel() {
    when(channelService.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.empty());
    ResponseEntity<ChannelDto> channel = channelController.createChannel(channelDto);
    assertEquals(200, channel.getStatusCodeValue());
  }

  @Test
  void createExistingChannel() {
    when(channelService.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
    assertThrows(
        ExceptionType.DeviceAlreadyExistsException.class,
        () -> {
          channelController.createChannel(channelDto);
        });
  }

  @Test
  void createInputChannel() {
    when(channelService.saveInputChannel(any())).thenReturn(inputChannelDto);
    when(channelService.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
    when(decoderService.findDecoder("1")).thenReturn(Optional.of(decoderDto));
    ResponseEntity<InputChannelDto> inputChannel =
        channelController.createInputChannel(ChannelFixture.CHANNEL_ID, "1");
    assertEquals(inputChannelDto, inputChannel.getBody());
  }

  @Test
  void createOutputChannel() {
    when(channelService.saveOutputChannel(any())).thenReturn(outputChannelDto);
    when(channelService.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
    when(encoderService.findEncoder("1")).thenReturn(Optional.of(encoderDto));
    ResponseEntity<OutputChannelDto> outputChannel =
        channelController.createOutputChannel(ChannelFixture.CHANNEL_ID, "1");
    assertEquals(outputChannelDto, outputChannel.getBody());
  }

  @Test
  @Disabled
  void deleteOutputChannel() {
    when(channelService.deleteOutputChannelById(ChannelFixture.CHANNEL_ID)).thenReturn(1L);
    ResponseEntity<String> stringResponseEntity =
        channelController.deleteOutputChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(200, stringResponseEntity.getStatusCodeValue());
  }

  @Test
  @Disabled
  void deleteNonExistingOutputChannel() {
    when(channelService.deleteOutputChannelById(ChannelFixture.CHANNEL_ID)).thenReturn(0L);
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> channelController.deleteOutputChannel(1L));
  }

  @Test
  @Disabled
  void deleteInputChannel() {
    when(channelService.deleteInputChannelById(ChannelFixture.CHANNEL_ID)).thenReturn(1L);
    ResponseEntity<String> stringResponseEntity =
        channelController.deleteInputChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(200, stringResponseEntity.getStatusCodeValue());
  }

  @Test
  @Disabled
  void deleteNonExistingInputChannel() {
    when(channelService.deleteInputChannelById(ChannelFixture.CHANNEL_ID)).thenReturn(0L);
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> channelController.deleteInputChannel(ChannelFixture.CHANNEL_ID));
  }

  @Test
  void deleteChannel() {
    when(channelService.deleteChannel(ChannelFixture.CHANNEL_ID)).thenReturn(1L);
    ResponseEntity<String> stringResponseEntity =
        channelController.deleteChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(200, stringResponseEntity.getStatusCodeValue());
  }

  @Test
  void deleteNonExistingChannel() {
    when(channelService.deleteChannel(ChannelFixture.CHANNEL_ID)).thenReturn(0L);
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> channelController.deleteChannel(ChannelFixture.CHANNEL_ID));
  }
}
