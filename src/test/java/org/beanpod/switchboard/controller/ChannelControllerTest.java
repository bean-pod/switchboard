package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dao.ChannelDaoImpl;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dao.InputChannelDaoImpl;
import org.beanpod.switchboard.dao.OutputChannelDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.ChannelDto;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

class ChannelControllerTest {

  public static List<ChannelEntity> channelEntityList;
  public static List<ChannelDto> channelDtoList;
  public static EncoderDto encoderDto;
  public static DecoderDto decoderDto;
  public static ChannelDto channelDto;
  public static InputChannelDto inputChannelDto;
  public static OutputChannelDto outputChannelDto;
  public static UserEntity user;
  @InjectMocks ChannelController channelController;
  @Mock ChannelDaoImpl channelDao;
  @Mock InputChannelDaoImpl inputChannelDao;
  @Mock OutputChannelDaoImpl outputChannelDao;
  @Mock DecoderDaoImpl decoderDao;
  @Mock EncoderDaoImpl encoderDao;
  @Mock ChannelMapper channelMapper;
  @Mock HttpServletRequest httpServletRequest;
  @Mock UserPrincipal userPrincipal;
  @Mock UserDaoImpl userDao;

  @BeforeEach
  void setup() {
    setupChannelFixture();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  private void setupChannelFixture() {
    channelEntityList = List.of(ChannelFixture.getChannelEntity1());
    channelDtoList = List.of(ChannelFixture.getChannelDto());
    encoderDto = EncoderFixture.getEncoderDto();
    decoderDto = DecoderFixture.getDecoderDto();
    channelDto = ChannelFixture.getChannelDto();
    inputChannelDto = ChannelFixture.getInputChannelDto();
    outputChannelDto = ChannelFixture.getOutputChannelDto();
    user = UserFixture.getUserEntity();
  }

  @Test
  void testRetrieveAllChannels() {
    when(channelDao.getChannels()).thenReturn(channelEntityList);
    when(channelMapper.toChannelDtos(any())).thenReturn(channelDtoList);
    List<ChannelDto> channelDtos = channelController.retrieveAllChannels();
    assertEquals(channelDtoList, channelDtos);
  }

  @Test
  void testRetrieveChannel() {
    when(channelDao.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
    ResponseEntity<ChannelDto> channelDTOResponseEntity =
        channelController.retrieveChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(channelDto, channelDTOResponseEntity.getBody());
  }

  @Test
  void testRetrieveChannelEmpty() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> channelController.retrieveChannel(ChannelFixture.CHANNEL_ID));
  }

  @Test
  void createChannel() {
    when(channelDao.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.empty());
    ResponseEntity<ChannelDto> channel = channelController.createChannel(channelDto);
    assertEquals(200, channel.getStatusCodeValue());
  }

  @Test
  void createExistingChannel() {
    when(channelDao.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
    assertThrows(
        ExceptionType.DeviceAlreadyExistsException.class,
        () -> channelController.createChannel(channelDto));
  }

  @Test
  void createInputChannel() {
    when(inputChannelDao.saveInputChannel(any())).thenReturn(inputChannelDto);
    when(channelDao.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
    when(decoderDao.findDecoder(user, "1")).thenReturn(Optional.of(decoderDto));
    ResponseEntity<InputChannelDto> inputChannel =
        channelController.createInputChannel(ChannelFixture.CHANNEL_ID, "1");
    assertEquals(inputChannelDto, inputChannel.getBody());
  }

  @Test
  void createOutputChannel() {
    when(outputChannelDao.saveOutputChannel(any())).thenReturn(outputChannelDto);
    when(channelDao.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
    when(encoderDao.findEncoder(user, "1")).thenReturn(Optional.of(encoderDto));
    ResponseEntity<OutputChannelDto> outputChannel =
        channelController.createOutputChannel(ChannelFixture.CHANNEL_ID, "1");
    assertEquals(outputChannelDto, outputChannel.getBody());
  }

  @Test
  void deleteOutputChannel() {
    when(outputChannelDao.deleteOutputChannelById(user, ChannelFixture.CHANNEL_ID)).thenReturn(1L);
    ResponseEntity<String> stringResponseEntity =
        channelController.deleteOutputChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(200, stringResponseEntity.getStatusCodeValue());
  }

  @Test
  void deleteNonExistingOutputChannel() {
    when(outputChannelDao.deleteOutputChannelById(user, ChannelFixture.CHANNEL_ID)).thenReturn(0L);
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> channelController.deleteOutputChannel(1L));
  }

  @Test
  void deleteInputChannel() {
    when(inputChannelDao.deleteInputChannelById(user, ChannelFixture.CHANNEL_ID)).thenReturn(1L);
    ResponseEntity<String> stringResponseEntity =
        channelController.deleteInputChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(200, stringResponseEntity.getStatusCodeValue());
  }

  @Test
  void deleteNonExistingInputChannel() {
    when(inputChannelDao.deleteInputChannelById(user, ChannelFixture.CHANNEL_ID)).thenReturn(0L);
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> channelController.deleteInputChannel(ChannelFixture.CHANNEL_ID));
  }

  @Test
  void deleteChannel() {
    when(channelDao.deleteChannel(ChannelFixture.CHANNEL_ID)).thenReturn(1L);
    ResponseEntity<String> stringResponseEntity =
        channelController.deleteChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(200, stringResponseEntity.getStatusCodeValue());
  }

  @Test
  void deleteNonExistingChannel() {
    when(channelDao.deleteChannel(ChannelFixture.CHANNEL_ID)).thenReturn(0L);
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> channelController.deleteChannel(ChannelFixture.CHANNEL_ID));
  }
}
