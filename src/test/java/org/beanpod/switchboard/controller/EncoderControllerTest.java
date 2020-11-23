package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dto.DeviceDTO;
import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

class EncoderControllerTest {
  // stubbed Objects
  private static DeviceEntity device;
  private static DeviceDTO deviceDto;
  private static EncoderEntity encoder;
  private static EncoderDTO encoderDTO;
  private static List<EncoderEntity> listOfEncoders;
  @InjectMocks private EncoderController encoderController;
  @Mock private EncoderDaoImpl encoderService;
  @Mock private DeviceDaoImpl deviceService;
  @Mock private EncoderMapper encoderMapper;

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
    when(encoderService.getEncoders()).thenReturn(listOfEncoders);
    when(encoderMapper.toEncoderDTOs(any())).thenReturn(EncoderFixture.getEncoderDtos());

    List<EncoderDTO> allEncoders = encoderController.retrieveAllEncoders();
    List<EncoderDTO> listOfExpectDTOEncoders = EncoderFixture.getEncoderDtos();

    assertFalse(allEncoders.isEmpty());
    assertIterableEquals(listOfExpectDTOEncoders, allEncoders);
  }

  // When a encoder is available in the DB
  @Test
  final void testRetrieveEncoder() {
    when(encoderService.findEncoder(EncoderFixture.SERIAL_NUMBER))
        .thenReturn(Optional.of(encoderDTO));
    ResponseEntity<EncoderDTO> actualEncoder =
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
    when(encoderService.save(encoderDTO)).thenReturn(encoderDTO);
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
    when(encoderService.deleteEncoder(EncoderFixture.SERIAL_NUMBER)).thenReturn(Long.valueOf(1));
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
    EncoderDTO encoderDto = EncoderFixture.getEncoderDto();
    when(encoderService.findEncoder(EncoderFixture.SERIAL_NUMBER))
        .thenReturn(Optional.of(encoderDto));
    when(encoderService.save(encoderDto)).thenReturn(encoderDto);
    ResponseEntity<EncoderDTO> response = encoderController.updateEncoder(encoderDto);
    assertEquals(200, response.getStatusCodeValue());
  }

  // Test exceptions when updating encoder
  @Test
  final void testUpdateEncoderExceptions() {
    EncoderDTO encoderDto = EncoderFixture.getEncoderDto();
    when(encoderService.findEncoder(encoderDto.getSerialNumber())).thenReturn(Optional.empty());

    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          encoderController.updateEncoder(encoderDto);
        });
  }
}
