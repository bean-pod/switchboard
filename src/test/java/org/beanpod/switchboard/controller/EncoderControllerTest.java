package org.beanpod.switchboard.controller;

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
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class EncoderControllerTest {
    @InjectMocks
    private EncoderController encoderController;

    @Mock
    private EncoderDaoImpl encoderService;

    @Mock
    private DeviceDaoImpl deviceService;

    @Mock
    private EncoderMapper encoderMapper;

    //stubbed Objects
    static private DeviceEntity device;
    static private DeviceDTO deviceDto;
    static private EncoderEntity encoder;
    static private EncoderDTO encoderDTO;
    static private List<EncoderEntity> listOfEncoders;

    @BeforeAll
    static void encoderFixture() throws ParseException {
        device = DeviceFixture.getDevice1();
        deviceDto = DeviceFixture.getDeviceDto();
        encoder = EncoderFixture.getEncoderEntity1();
        encoderDTO = EncoderFixture.getEncoderDto();
        listOfEncoders = EncoderFixture.getListOfEncoder();
    }

    @BeforeEach
    void setup() throws ParseException {
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

    //When a encoder is available in the DB
    @Test
    final void testRetrieveEncoder() {
        when(encoderService.findEncoder("1")).thenReturn(Optional.of(encoderDTO));
        ResponseEntity<EncoderDTO> actualEncoder = encoderController.retrieveEncoder("1");

        assertNotNull(actualEncoder);
        assertEquals(200, actualEncoder.getStatusCodeValue());
        assertEquals(encoder.getSerialNumber(), actualEncoder.getBody().getSerialNumber());
    }

    //When a encoder is unavailable in the DB
    @Test
    final void testRetrieveEncoderEmpty() {
        assertThrows(ExceptionType.DeviceNotFoundException.class, () -> {
            encoderController.retrieveEncoder("NotAvailable");
        });
    }

    //When a device is available in the DB
    @Test
    final void testCreateEncoder() {
        when(deviceService.findDevice("1")).thenReturn(Optional.of(deviceDto));
        when(encoderService.save(encoderDTO)).thenReturn(encoderDTO);
        ResponseEntity response = encoderController.createEncoder(encoderDTO);
        assertEquals(200, response.getStatusCodeValue());
    }

    //When a device is unavailable in the DB
    @Test
    final void testCreateEncoderAlreadyExists() {
        assertThrows(ExceptionType.DeviceNotFoundException.class, () -> {
            encoderController.createEncoder(encoderDTO);
        });
    }

    //When an encoder is available in the DB
    @Test
    final void testDeleteEncoder() {
        when(encoderService.deleteEncoder("1")).thenReturn(Long.valueOf(1));
        ResponseEntity<String> response = encoderController.deleteEncoder("1");
        assertEquals(200, response.getStatusCodeValue(), "The status code is not 200.");
        assertEquals("Encoder with serial number 1 Deleted", response.getBody());
    }

    //When a encoder is unavailable in the DB
    @Test
    final void testDeleteEncoderNotExisting() {
        assertThrows(ExceptionType.DeviceNotFoundException.class, () -> {
            encoderController.deleteEncoder("Not Available encoder");
        });
    }

    //When a encoder is available in the DB
    @Test
    final void testUpdateEncoder() {
        EncoderDTO encoderDto = EncoderFixture.getEncoderDto();
        when(encoderService.findEncoder("1")).thenReturn(Optional.of(encoderDto));
        when(encoderService.save(encoderDto)).thenReturn(encoderDto);
        ResponseEntity<EncoderDTO> response = encoderController.updateEncoder(encoderDto);
        assertEquals(200, response.getStatusCodeValue());
    }

    //Test exceptions when updating encoder
    @Test
    final void testUpdateEncoderExceptions() {
        EncoderDTO encoderDto = EncoderFixture.getEncoderDto();
        when(encoderService.findEncoder(encoderDto.getSerialNumber())).thenReturn(Optional.empty());

        assertThrows(ExceptionType.DeviceNotFoundException.class, () -> {
            encoderController.updateEncoder(encoderDto);
        });
    }
}