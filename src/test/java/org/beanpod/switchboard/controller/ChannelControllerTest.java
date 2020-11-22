package org.beanpod.switchboard.controller;

import org.beanpod.switchboard.dao.ChannelDaoImpl;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dto.*;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

class ChannelControllerTest {

   @InjectMocks
   ChannelController channelController;

   @Mock
   ChannelDaoImpl channelService;
   @Mock
   DecoderDaoImpl decoderService;
   @Mock
   EncoderDaoImpl encoderService;
   @Mock
   ChannelMapper channelMapper;

   public static List<ChannelEntity> channelEntityList;
   public static List<ChannelDTO> channelDtoList;
   public static EncoderDTO encoderDto;
   public static DecoderDTO decoderDto;
   public static ChannelDTO channelDto;
   public static InputChannelDTO inputChannelDto;
   public static OutputChannelDTO outputChannelDto;

   @BeforeEach
   void setupChannelFixture() throws ParseException {
      channelEntityList = List.of(ChannelFixture.getChannelEntity());
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
      when(channelMapper.toChannelDTOs(any())).thenReturn(channelDtoList);
      List<ChannelDTO> channelDTOS = channelController.retrieveAllChannels();
      assertEquals(channelDtoList, channelDTOS);
   }

   @Test
   void testRetrieveChannel() {
      when(channelService.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
      ResponseEntity<ChannelDTO> channelDTOResponseEntity = channelController.retrieveChannel(ChannelFixture.CHANNEL_ID);
      assertEquals(channelDto, channelDTOResponseEntity.getBody());
   }

   @Test
   void testRetrieveChannelEmpty() {
      assertThrows(ExceptionType.DeviceNotFoundException.class, () -> {
         channelController.retrieveChannel(ChannelFixture.CHANNEL_ID);
      });
   }

   @Test
   void createChannel() {
      when(channelService.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.empty());
      ResponseEntity<ChannelDTO> channel = channelController.createChannel(channelDto);
      assertEquals(200, channel.getStatusCodeValue());
   }

   @Test
   void createExistingChannel() {
      when(channelService.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
      assertThrows(ExceptionType.DeviceAlreadyExistsException.class, () -> {
         channelController.createChannel(channelDto);
      });
   }

   @Test
   void createInputChannel() {
      when(channelService.saveInputChannel(any())).thenReturn(inputChannelDto);
      when(channelService.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
      when(decoderService.findDecoder("1")).thenReturn(Optional.of(decoderDto));
      ResponseEntity<InputChannelDTO> inputChannel = channelController.createInputChannel(ChannelFixture.CHANNEL_ID, "1");
      assertEquals(inputChannelDto, inputChannel.getBody());
   }

   @Test
   void createOutputChannel() {
      when(channelService.saveOutputChannel(any())).thenReturn(outputChannelDto);
      when(channelService.findChannel(ChannelFixture.CHANNEL_ID)).thenReturn(Optional.of(channelDto));
      when(encoderService.findEncoder("1")).thenReturn(Optional.of(encoderDto));
      ResponseEntity<OutputChannelDTO> outputChannel = channelController.createOutputChannel(ChannelFixture.CHANNEL_ID, "1");
      assertEquals(outputChannelDto, outputChannel.getBody());
   }

   @Test
   void deleteOutputChannel() {
      when(channelService.deleteOutputChannelById(4569L)).thenReturn(1L);
      ResponseEntity<String> stringResponseEntity = channelController.deleteOutputChannel(ChannelFixture.CHANNEL_ID);
      assertEquals(200, stringResponseEntity.getStatusCodeValue());
   }

   @Test
   void deleteNonExistingOutputChannel() {
      when(channelService.deleteOutputChannelById(ChannelFixture.CHANNEL_ID)).thenReturn(0L);
      assertThrows(ExceptionType.DeviceNotFoundException.class, () -> channelController.deleteOutputChannel(1L));
   }

   @Test
   void deleteInputChannel() {
      when(channelService.deleteInputChannelById(ChannelFixture.CHANNEL_ID)).thenReturn(1L);
      ResponseEntity<String> stringResponseEntity = channelController.deleteInputChannel(ChannelFixture.CHANNEL_ID);
      assertEquals(200, stringResponseEntity.getStatusCodeValue());
   }

   @Test
   void deleteNonExistingInputChannel() {
      when(channelService.deleteInputChannelById(ChannelFixture.CHANNEL_ID)).thenReturn(0L);
      assertThrows(ExceptionType.DeviceNotFoundException.class, () -> channelController.deleteInputChannel(ChannelFixture.CHANNEL_ID));
   }

   @Test
   void deleteChannel() {
      when(channelService.deleteChannel(ChannelFixture.CHANNEL_ID)).thenReturn(1L);
      ResponseEntity<String> stringResponseEntity = channelController.deleteChannel(ChannelFixture.CHANNEL_ID);
      assertEquals(200, stringResponseEntity.getStatusCodeValue());
   }

   @Test
   void deleteNonExistingChannel() {
      when(channelService.deleteChannel(ChannelFixture.CHANNEL_ID)).thenReturn(0L);
      assertThrows(ExceptionType.DeviceNotFoundException.class, () -> channelController.deleteChannel(ChannelFixture.CHANNEL_ID));
   }
}
