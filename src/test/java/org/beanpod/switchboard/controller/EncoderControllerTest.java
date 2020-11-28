package org.beanpod.switchboard.controller;

import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.service.EncoderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.StreamModel;
import org.springframework.http.ResponseEntity;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class EncoderControllerTest {
  // stubbed Objects
  private static DeviceEntity device;
  private static DeviceDto deviceDto;
  private static EncoderEntity encoder;
  private static EncoderDto encoderDTO;
  private static List<EncoderEntity> listOfEncoders;
  @InjectMocks private EncoderController encoderController;
  @Mock private EncoderDaoImpl encoderDao;
  @Mock private DeviceDaoImpl deviceService;
  @Mock private EncoderService encoderService;
  @Mock private EncoderMapper encoderMapper;
  @Mock private StreamMapper streamMapper;

  @BeforeEach
  void setupEncoderFixture() throws ParseException {
    device = DeviceFixture.getDevice1();
    deviceDto = DeviceFixture.getDeviceDto();
    encoder = EncoderFixture.getEncoderEntity1();
    encoderDTO = EncoderFixture.getEncoderDto();
    listOfEncoders = EncoderFixture.getListOfEncoder();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testRetrieveAllEncoders() {
    when(encoderDao.getEncoders()).thenReturn(listOfEncoders);
    when(encoderMapper.toEncoderDtos(any())).thenReturn(EncoderFixture.getEncoderDtos());

    List<EncoderDto> allEncoders = encoderController.retrieveAllEncoders();
    List<EncoderDto> listOfExpectDTOEncoders = EncoderFixture.getEncoderDtos();

    assertFalse(allEncoders.isEmpty());
    assertIterableEquals(listOfExpectDTOEncoders, allEncoders);
  }

  // When a encoder is available in the DB
  @Test
  final void testRetrieveEncoder() {
    when(encoderDao.findEncoder(EncoderFixture.SERIAL_NUMBER)).thenReturn(Optional.of(encoderDTO));
    ResponseEntity<EncoderDto> actualEncoder =
        encoderController.retrieveEncoder(EncoderFixture.SERIAL_NUMBER);

    assertNotNull(actualEncoder);
    assertEquals(200, actualEncoder.getStatusCodeValue());
    assertEquals(encoder.getSerialNumber(), actualEncoder.getBody().getSerialNumber());
  }

  // When a encoder is unavailable in the DB
  @Test
  final void testRetrieveEncoderEmpty() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          encoderController.retrieveEncoder("NotAvailable");
        });
  }

  // When a device is available in the DB
  @Test
  final void testCreateEncoder() {
    when(deviceService.findDevice(EncoderFixture.SERIAL_NUMBER)).thenReturn(Optional.of(deviceDto));
    when(encoderDao.save(encoderDTO)).thenReturn(encoderDTO);
    ResponseEntity response = encoderController.createEncoder(encoderDTO);
    assertEquals(200, response.getStatusCodeValue());
  }

  // When a device is unavailable in the DB
  @Test
  final void testCreateEncoderAlreadyExists() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          encoderController.createEncoder(encoderDTO);
        });
  }

  // When an encoder is available in the DB
  @Test
  final void testDeleteEncoder() {
    when(encoderDao.deleteEncoder(EncoderFixture.SERIAL_NUMBER)).thenReturn(Long.valueOf(1));
    ResponseEntity<String> response = encoderController.deleteEncoder(EncoderFixture.SERIAL_NUMBER);
    assertEquals(200, response.getStatusCodeValue(), "The status code is not 200.");
    assertEquals("Encoder with serial number 1 Deleted", response.getBody());
  }

  // When a encoder is unavailable in the DB
  @Test
  final void testDeleteEncoderNotExisting() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          encoderController.deleteEncoder("Not Available encoder");
        });
  }

  // When a encoder is available in the DB
  @Test
  final void testUpdateEncoder() {
    EncoderDto encoderDto = EncoderFixture.getEncoderDto();
    when(encoderDao.findEncoder(EncoderFixture.SERIAL_NUMBER)).thenReturn(Optional.of(encoderDto));

    when(encoderDao.save(encoderDto)).thenReturn(encoderDto);

    ResponseEntity<EncoderDto> response = encoderController.updateEncoder(encoderDto);

    assertEquals(200, response.getStatusCodeValue());
  }

  // Test exceptions when updating encoder
  @Test
  final void testUpdateEncoderExceptions() {
    EncoderDto encoderDto = EncoderFixture.getEncoderDto();
    when(encoderDao.findEncoder(encoderDto.getSerialNumber())).thenReturn(Optional.empty());

    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          encoderController.updateEncoder(encoderDto);
        });
  }

  @Test
  final void testGetEncoderStreams() {
    when(encoderService.getEncoderStreams(any(String.class)))
        .thenReturn(List.of(StreamFixture.getStreamDto()));
    when(streamMapper.toModel(anyList())).thenReturn(List.of(StreamFixture.getStreamModel()));

    ResponseEntity<List<StreamModel>> response =
        encoderController.getEncoderStreams(EncoderFixture.SERIAL_NUMBER);

    verify(encoderService).getEncoderStreams(EncoderFixture.SERIAL_NUMBER);
    verify(streamMapper).toModel(List.of(StreamFixture.getStreamDto()));

    assertEquals(200, response.getStatusCodeValue());
    assertIterableEquals(List.of(StreamFixture.getStreamModel()), response.getBody());
  }
}
