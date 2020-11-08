package org.beanpod.switchboard.controller;

import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.dto.mapper.*;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.beans.Encoder;
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
    static private DeviceEntity device1, device2;
    static private EncoderEntity encoder1, encoder2;
    static private List<EncoderEntity> listOfEncoders;

    @BeforeEach
    void setup(){
        device1 = DeviceFixture.getDevice1();
        device2 = DeviceFixture.getDevice2();
        encoder1 = EncoderFixture.getEncoder1(device1);
        encoder2 = EncoderFixture.getEncoder2(device2);
        listOfEncoders = EncoderFixture.getListOfEncoder(encoder1, encoder2);
        MockitoAnnotations.initMocks(this); //to be able to initiate encoderController object
    }

    @Test
    final void testRetrieveAllEncoders(){
        when(encoderService.getEncoders()).thenReturn(listOfEncoders);
        when(encoderMapper.toEncoderDTOs(any())).thenReturn(EncoderFixture.getEncoderDtos());

        List<EncoderDTO> allEncoders = encoderController.retrieveAllEncoders();
        List<EncoderDTO> listOfExpectDTOEncoders = EncoderFixture.getEncoderDtos();

        assertFalse(allEncoders.isEmpty(),"allEncoders list is empty."); //check if an empty list was returned
        assertIterableEquals(listOfExpectDTOEncoders, allEncoders,"listOfExpectDTOEncoders and allEncoders lists are not equal."); //check both lists contents
    }

    //When a encoder is available in the DB
    @Test
    final void testRetrieveEncoder(){
        when(encoderService.findEncoder("1")).thenReturn(Optional.of(encoder1));
        when(encoderMapper.toEncoderDTO(any())).thenReturn(EncoderFixture.getEncoderDto());

        ResponseEntity<EntityModel<EncoderDTO>> actualEncoder = encoderController.retrieveEncoder("1");

        assertNotNull(actualEncoder, "actualEncoder object is null.");
        assertEquals(200,actualEncoder.getStatusCodeValue(),"Status code is not 200");
        assertEquals(encoder1.getSerialNumber(), actualEncoder.getBody().getContent().getSerialNumber(), "expectedEncoder and actualEncoder objects are not equal.");
    }

    //When a encoder is unavailable in the DB
    @Test
    final void testRetrieveEncoderEmpty(){
        assertThrows(ExceptionType.DeviceNotFoundException.class, () -> {
            encoderController.retrieveEncoder("NotAvailable");
        }, "DeviceNotFoundException exception should have been thrown.");
    }

    //When a device is available in the DB
    @Test
    final void testCreateEncoder(){
        when(deviceService.findDevice("1")).thenReturn(Optional.of(device1));
        when(encoderService.save(encoder1)).thenReturn(encoder1);

        //mock a request
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setServerName("localhost/encoder");
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        //request response
        ResponseEntity response = encoderController.createEncoder(encoderMapper.toEncoderDTO(encoder1));

        assertEquals(201, response.getStatusCodeValue(), "The status code is not 201.");
        assertEquals("http://localhost/encoder/1", response.getHeaders().get("Location").get(0), "The returned location is incorrect.");
    }

    //When a device is unavailable in the DB
    @Test
    final void testCreateEncoderAlreadyExists(){
        assertThrows(ExceptionType.DeviceNotFoundException.class, () -> {
            encoderController.createEncoder(encoderMapper.toEncoderDTO(encoder1));
        }, "DeviceNotFoundException should have been thrown.");
    }

    //When an encoder is available in the DB
    @Test
    final void testDeleteEncoder(){
        when(encoderService.deleteEncoder("1")).thenReturn(Long.valueOf(1));

        ResponseEntity<String> response = encoderController.deleteEncoder("1");

        assertEquals(200, response.getStatusCodeValue(), "The status code is not 200.");
        assertEquals("Encoder with serial number 1 Deleted", response.getBody(), "Returned response does not match the expected.");
    }

    //When a encoder is unavailable in the DB
    @Test
    final void testDeleteEncoderNotExisting(){
        assertThrows(ExceptionType.DeviceNotFoundException.class, () -> {
            encoderController.deleteEncoder("Not Available encoder");
        }, "DeviceNotFoundException should have been thrown.");
    }

    //When a encoder is available in the DB
    @Test
    final void testUpdateEncoder(){
        EncoderDTO encoderDto = EncoderFixture.getEncoderDto();
        when(encoderService.findEncoder("1")).thenReturn(Optional.of(encoder1));
        encoder1.getOutputs().clear();
        when(encoderService.save(encoder1)).thenReturn(encoder1);
        when(encoderMapper.toEncoderEntity(encoderDto)).thenReturn(encoder1);
        when(encoderMapper.toEncoderDTO(any())).thenReturn(encoderDto);

        ResponseEntity<EncoderDTO> response = encoderController.updateEncoder(encoderDto);

        assertEquals(200, response.getStatusCodeValue());
    }

    //Test exceptions when updating encoder
    @Test
    final void testUpdateEncoderExceptions(){
        EncoderDTO encoderDto = EncoderFixture.getEncoderDto();
        when(encoderService.findEncoder(encoderDto.getSerialNumber())).thenReturn(Optional.empty());

        //When device is unavailable in the DB
        assertThrows(ExceptionType.DeviceNotFoundException.class, () -> {
            encoderController.updateEncoder(encoderDto);
        }, "DeviceNotFoundException should have been thrown.");
    }
}