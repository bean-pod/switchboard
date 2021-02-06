package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.service.DecoderService;
import org.beanpod.switchboard.util.MaintainDeviceStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.StreamModel;
import org.springframework.http.ResponseEntity;

class DecoderControllerTest {

  // stubbed Objects
  private static DeviceEntity device;
  private static DeviceDto deviceDto;
  private static DecoderEntity decoder;
  private static DecoderDto decoderDto;
  private static List<DecoderEntity> listOfDecoders;
  @InjectMocks private DecoderController decoderController;
  @Mock private DecoderDaoImpl decoderDao;
  @Mock private DecoderService decoderService;
  @Mock private DeviceDaoImpl deviceService;
  @Mock private DecoderMapper decoderMapper;
  @Mock private StreamMapper streamMapper;
  @Mock private MaintainDeviceStatus maintainDeviceStatus;

  @BeforeEach
  void setupDecoderFixture() {
    device = DeviceFixture.getDevice1();
    deviceDto = DeviceFixture.getDeviceDto();
    decoder = DecoderFixture.getDecoderEntity1();
    decoderDto = DecoderFixture.getDecoderDto();
    listOfDecoders = DecoderFixture.getListOfDecoders();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this); // to be able to initiate decoderController object
  }

  @Test
  final void testRetrieveAllDecoders() {
    when(decoderDao.getDecoders()).thenReturn(listOfDecoders);
    when(decoderMapper.toDecoderDtos(any())).thenReturn(DecoderFixture.getDecoderDtos());

    List<DecoderDto> allDecoders = decoderController.retrieveAllDecoders();
    List<DecoderDto> listOfExpectDTODecoders = DecoderFixture.getDecoderDtos();

    assertFalse(allDecoders.isEmpty()); // check if an empty list was returned
    assertIterableEquals(listOfExpectDTODecoders, allDecoders); // check both lists contents
  }

  // When a decoder is available in the DB
  @Test
  final void testRetrieveDecoder() {
    when(decoderDao.findDecoder(DecoderFixture.SERIAL_NUMBER)).thenReturn(Optional.of(decoderDto));
    ResponseEntity<DecoderDto> actualDecoder = decoderController.retrieveDecoder("1");

    assertNotNull(actualDecoder);
    assertEquals(200, actualDecoder.getStatusCodeValue());
    assertEquals(decoderDto, actualDecoder.getBody());
  }

  // When a decoder is unavailable in the DB
  @Test
  final void testRetrieveDecoderEmpty() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          decoderController.retrieveDecoder("NotAvailable");
        });
  }

  // When a device is unavailable in the DB
  @Test
  final void testCreateDecoder() {
    when(deviceService.findDevice(DecoderFixture.SERIAL_NUMBER)).thenReturn(Optional.of(deviceDto));
    when(decoderDao.save(decoderDto)).thenReturn(decoderDto);
    ResponseEntity response = decoderController.createDecoder(decoderDto);
    assertEquals(200, response.getStatusCodeValue());
  }

  // When a device is available in the DB
  @Test
  final void testCreateDecoderAlreadyExists() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          decoderController.createDecoder(decoderDto);
        });
  }

  // When a decoder is available in the DB
  @Test
  final void testDeleteDecoder() {
    when(decoderDao.deleteDecoder(DecoderFixture.SERIAL_NUMBER)).thenReturn(Long.valueOf(1));
    ResponseEntity<String> response = decoderController.deleteDecoder("1");
    assertEquals(200, response.getStatusCodeValue());
    assertEquals("Decoder with serial number 1 Deleted", response.getBody());
  }

  // When a decoder is unavailable in the DB
  @Test
  final void testDeleteDecoderNotExisting() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          decoderController.deleteDecoder("Not Available decoder");
        });
  }

  // When a encoder is available in the DB
  @Test
  final void testUpdateDecoder() {
    when(decoderDao.findDecoder(DecoderFixture.SERIAL_NUMBER)).thenReturn(Optional.of(decoderDto));
    when(decoderDao.save(decoderDto)).thenReturn(decoderDto);

    ResponseEntity<DecoderDto> response = decoderController.updateDecoder(decoderDto);

    assertEquals(200, response.getStatusCodeValue());
  }

  // Test exceptions when updating encoder
  @Test
  final void testUpdateDecoderExceptions() {
    DecoderDto decoderDto = DecoderFixture.getDecoderDto();
    when(decoderDao.findDecoder(decoderDto.getSerialNumber())).thenReturn(Optional.empty());

    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          decoderController.updateDecoder(decoderDto);
        });
  }

  @Test
  final void testGetDecoderStreams() {
    when(decoderService.getDecoderStreams(any(String.class)))
        .thenReturn(List.of(StreamFixture.getStreamDto()));
    when(streamMapper.toModelList(anyList())).thenReturn(StreamFixture.getStreamModelList());

    ResponseEntity<List<StreamModel>> response =
        decoderController.getDecoderStreams(DecoderFixture.SERIAL_NUMBER);

    verify(decoderService).getDecoderStreams(DecoderFixture.SERIAL_NUMBER);
    verify(streamMapper).toModelList(List.of(StreamFixture.getStreamDto()));

    assertEquals(200, response.getStatusCodeValue());
    assertIterableEquals(List.of(StreamFixture.getStreamModel()), response.getBody());
  }
}
