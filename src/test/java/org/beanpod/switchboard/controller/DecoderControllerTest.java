package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.tuple.Pair;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.service.DecoderService;
import org.beanpod.switchboard.util.MaintainDeviceStatus;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.DecoderModel;
import org.openapitools.model.StreamModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class DecoderControllerTest {

  // stubbed Objects
  private static List<Pair<DeviceEntity, Boolean>> listOfDevicesPairs;
  private static DeviceDto deviceDto;
  private static DecoderDto decoderDto;
  private static DecoderModel decoderModel;
  private static List<DecoderEntity> listOfDecoders;
  private static UserEntity user;
  @InjectMocks private DecoderController decoderController;
  @Mock private DecoderDaoImpl decoderDao;
  @Mock private DecoderService decoderService;
  @Mock private DeviceDaoImpl deviceService;
  @Mock private DecoderMapper decoderMapper;
  @Mock private StreamMapper streamMapper;
  @Mock private MaintainDeviceStatus maintainDeviceStatus;
  @Mock private HttpServletRequest httpServletRequest;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;

  @BeforeEach
  void setup() {
    setupDecoderFixture();

    MockitoAnnotations.initMocks(this); // to be able to initiate decoderController object

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  private void setupDecoderFixture() {
    listOfDevicesPairs = DeviceFixture.getListOfDevicePairs();
    deviceDto = DeviceFixture.getDeviceDto();
    decoderDto = DecoderFixture.getDecoderDto();
    decoderModel = DecoderFixture.getDecoderModelWithInputChannel();
    listOfDecoders = DecoderFixture.getListOfDecoders();
    user = UserFixture.getUserEntity();
  }

  @Test
  final void testRetrieveAllDecoders() {
    when(decoderDao.getDecoders(user)).thenReturn(listOfDecoders);
    when(decoderMapper.toDtos(any())).thenReturn(DecoderFixture.getDecoderDtos());
    when(decoderMapper.toModels(any())).thenReturn(DecoderFixture.getDecoderModels());

    ResponseEntity<List<DecoderModel>> response = decoderController.retrieveAllDecoders();

    assertEquals(HttpStatus.OK, response.getStatusCode());
    List<DecoderModel> allEncoders = response.getBody();
    assertNotNull(allEncoders);
    assertFalse(allEncoders.isEmpty()); // check if an empty list was returned
    assertIterableEquals(
        DecoderFixture.getDecoderModels(), allEncoders); // check both lists contents
  }

  // When a decoder is available in the DB
  @Test
  final void testRetrieveDecoder() {
    when(decoderDao.findDecoder(user, DecoderFixture.SERIAL_NUMBER))
        .thenReturn(Optional.of(decoderDto));
    when(maintainDeviceStatus.maintainStatusField(anyList())).thenReturn(listOfDevicesPairs);
    when(decoderMapper.toModel(decoderDto)).thenReturn(decoderModel);

    ResponseEntity<DecoderModel> actualDecoder = decoderController.retrieveDecoder("1");

    assertNotNull(actualDecoder);
    assertEquals(200, actualDecoder.getStatusCodeValue());
    assertEquals(decoderModel, actualDecoder.getBody());
  }

  // When a decoder is unavailable in the DB
  @Test
  final void testRetrieveDecoderEmpty() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> decoderController.retrieveDecoder("NotAvailable"));
  }

  // When a device is unavailable in the DB
  @Test
  final void testCreateDecoder() {
    when(deviceService.findDevice(user, DecoderFixture.SERIAL_NUMBER))
        .thenReturn(Optional.of(deviceDto));
    when(decoderMapper.toDto(any(DecoderModel.class))).thenReturn(decoderDto);
    when(decoderDao.save(user, decoderDto)).thenReturn(decoderDto);
    when(decoderMapper.toModel(any())).thenReturn(decoderModel);

    ResponseEntity<DecoderModel> response = decoderController.createDecoder(decoderModel);

    assertEquals(200, response.getStatusCodeValue());
  }

  @Test
  final void testCreateDecoderWithoutChannels() {
    decoderModel.setInput(Collections.emptyList());
    assertThrows(
        ExceptionType.MissingChannelsException.class,
        () -> decoderController.createDecoder(decoderModel));
  }

  // When a device is available in the DB
  @Test
  final void testCreateDecoderAlreadyExists() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> decoderController.createDecoder(decoderModel));
  }

  // When a decoder is available in the DB
  @Test
  final void testDeleteDecoder() {
    when(decoderDao.deleteDecoder(user, DecoderFixture.SERIAL_NUMBER)).thenReturn(Long.valueOf(1));
    ResponseEntity<String> response = decoderController.deleteDecoder("1");
    assertEquals(200, response.getStatusCodeValue());
    assertEquals("Decoder with serial number 1 Deleted", response.getBody());
  }

  // When a decoder is unavailable in the DB
  @Test
  final void testDeleteDecoderNotExisting() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> decoderController.deleteDecoder("Not Available decoder"));
  }

  // When a encoder is available in the DB
  @Test
  final void testUpdateDecoder() {
    when(decoderDao.findDecoder(user, DecoderFixture.SERIAL_NUMBER))
        .thenReturn(Optional.of(decoderDto));
    when(decoderMapper.toDto(decoderModel)).thenReturn(decoderDto);
    when(decoderDao.save(user, decoderDto)).thenReturn(decoderDto);
    when(decoderMapper.toModel(decoderDto)).thenReturn(decoderModel);

    ResponseEntity<DecoderModel> response = decoderController.updateDecoder(decoderModel);

    assertEquals(200, response.getStatusCodeValue());
  }

  // Test exceptions when updating encoder
  @Test
  final void testUpdateDecoderExceptions() {
    DecoderDto decoderDto = DecoderFixture.getDecoderDto();
    when(decoderDao.findDecoder(user, decoderDto.getSerialNumber())).thenReturn(Optional.empty());

    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> decoderController.updateDecoder(decoderModel));
  }

  @Test
  final void testGetDecoderStreams() {
    when(decoderService.getDecoderStreams(eq(user), any(String.class)))
        .thenReturn(List.of(StreamFixture.getStreamDto()));
    when(streamMapper.toModels(anyList())).thenReturn(StreamFixture.getStreamModelList());

    ResponseEntity<List<StreamModel>> response =
        decoderController.getDecoderStreams(DecoderFixture.SERIAL_NUMBER);

    verify(decoderService).getDecoderStreams(user, DecoderFixture.SERIAL_NUMBER);
    verify(streamMapper).toModels(List.of(StreamFixture.getStreamDto()));

    assertEquals(200, response.getStatusCodeValue());
    assertIterableEquals(List.of(StreamFixture.getStreamModel()), response.getBody());
  }
}
