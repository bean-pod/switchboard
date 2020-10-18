package com.switchboard.app;

import com.switchboard.app.controller.EncoderController;
import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.dao.EncoderDaoImpl;
import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.domain.EncoderEntity;
import com.switchboard.app.exceptions.DeviceNotFoundException;
import com.switchboard.app.fixture.DeviceFixture;
import com.switchboard.app.fixture.EncoderFixture;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class EncoderControllerTest {
    @InjectMocks
    private EncoderController encoderController;

    @Mock
    private EncoderDaoImpl encoderService;

    @Mock
    private DeviceDaoImpl deviceService;

    //stubbed Objects
    static private DeviceEntity device1, device2;
    static private EncoderEntity encoder1, encoder2;
    static private List<EncoderEntity> listOfEncoders;

    @BeforeAll
    static void encoderFixture(){
        //stubbing device and encoder objects
        device1 = DeviceFixture.getDevice1();
        device2 = DeviceFixture.getDevice2();
        encoder1 = EncoderFixture.getEncoder1(device1);
        encoder2 = EncoderFixture.getEncoder2(device2);
        listOfEncoders = EncoderFixture.getListOfEncoder(encoder1, encoder2);
    }

    @BeforeEach
    void setup(){
        MockitoAnnotations.initMocks(this); //to be able to initiate encoderController object
    }

    @Test
    final void testRetrieveAllEncoders(){
        when(encoderService.getEncoders()).thenReturn(listOfEncoders);

        List allEncoders = encoderController.retrieveAllEncoders();

        assertFalse(allEncoders.isEmpty(),"allEncoders list is empty."); //check if an empty list was returned
        assertIterableEquals(listOfEncoders, allEncoders,"listOfEncoders and allEncoders lists are not equal."); //check both lists contents
    }

    //When a encoder is available in the DB
    @Test
    final void testRetrieveEncoder(){
        when(encoderService.findEncoder("1")).thenReturn(java.util.Optional.of(encoder1));

        EncoderEntity actualEncoder = encoderController.retrieveDevice("1").getContent();

        assertNotNull(actualEncoder, "actualEncoder object is null.");
        assertEquals(encoder1, actualEncoder, "expectedEncoder and actualEncoder objects are not equal.");
    }

    //When a encoder is unavailable in the DB
    @Test
    final void testRetrieveEncoderEmpty(){
        assertThrows(DeviceNotFoundException.class, () -> {
            encoderController.retrieveDevice("NotAvailable");
        }, "DeviceNotFoundException exception should have been thrown.");
    }

    //When a device is available in the DB
    @Test
    final void testCreateEncoder(){
        when(deviceService.findDevice("1")).thenReturn(java.util.Optional.of(device1));
        when(encoderService.save(encoder1)).thenReturn(encoder1);

        //mock a request
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setServerName("localhost/encoder");
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        //request response
        ResponseEntity response = encoderController.createEncoder(encoder1);

        assertEquals(201, response.getStatusCodeValue(), "The status code is not 201.");
        assertEquals("http://localhost/encoder/1", response.getHeaders().get("Location").get(0), "The returned location is incorrect.");
    }

    //When a device is unavailable in the DB
    @Test
    final void testCreateEncoderAlreadyExists(){
        assertThrows(NoSuchElementException.class, () -> {
            encoderController.createEncoder(encoder1);
        }, "NoSuchElementException should have been thrown.");
    }
}
