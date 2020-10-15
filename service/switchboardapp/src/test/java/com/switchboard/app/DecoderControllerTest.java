package com.switchboard.app;

import com.switchboard.app.controller.DecoderController;
import com.switchboard.app.dao.DecoderDaoImpl;
import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.domain.DecoderEntity;
import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.exceptions.DeviceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class DecoderControllerTest {

    @InjectMocks
    DecoderController decoderController;

    @Mock
    DecoderDaoImpl decoderService;

    @Mock
    DeviceDaoImpl deviceService;

    @Mock
    ServletUriComponentsBuilder servletUriComponentsBuilder;

    private DeviceEntity device1;
    private DecoderEntity decoder1;

    @BeforeEach
    void setUp() throws Exception{
        MockitoAnnotations.initMocks(this); //to be able to initiate decoderController object

        //stubbing device and decoder objects
        device1 = new DeviceEntity("1","Decorder #1","Running",null,null);
        decoder1 = new DecoderEntity("1", device1);
    }

    @Test
    final void testRetrieveAllDecoders(){
        //stubbing DeviceEntity and DecoderEntity objects
        DeviceEntity device2 = new DeviceEntity("2","Decorder #2","Failing",null,null);
        DecoderEntity decoder2 = new DecoderEntity("2", device2);

        //Adding stubbed objects to the list that should be returned when getDecoders is called
        List<DecoderEntity> listOfDecoders= new ArrayList<DecoderEntity>();
        listOfDecoders.add(decoder1);
        listOfDecoders.add(decoder2);

        when(decoderService.getDecoders()).thenReturn(listOfDecoders);

        List allDecoders = decoderController.retrieveAllDecoders();

        assertFalse(allDecoders.isEmpty(),"allDecoders list is empty."); //check if an empty list was returned
        assertIterableEquals(listOfDecoders, allDecoders,"listOfDecoders and allDecoders lists are not equal."); //check both lists contents
    }

    //When a decoder is available in the DB
    @Test
    final void testRetrieveDecoder(){
        when(decoderService.findDecoder("2")).thenReturn(java.util.Optional.of(decoder1));

        DecoderEntity actualDecoder = decoderController.retrieveDecoder("1").getContent();

        assertNotNull(actualDecoder, "actualDecoder object is null.");
        assertEquals(decoder1, actualDecoder, "expectedDecoder and actualDecoder objects are not equal.");
    }

    //When a decoder is unavailable in the DB
    @Test
    final void testRetrieveDecoderEmpty(){
        assertThrows(DeviceNotFoundException.class, () -> {
            decoderController.retrieveDecoder("NotAvailable");
        }, "DeviceNotFoundException exception should have been thrown.");
    }

    @Test
    final void testCreateDecoder() throws URISyntaxException {
        when(deviceService.findDevice("1")).thenReturn(java.util.Optional.of(device1));
        when(decoderService.save(decoder1)).thenReturn(decoder1);

        //mock a request
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        //request response
        ResponseEntity response = decoderController.createDecoder(decoder1);

        assertEquals(201, response.getStatusCodeValue(), "The status code is not 201.");
        assertEquals(response.getHeaders().get("Location").get(0), "http://localhost/1", "The returned location is incorrect.");
    }
}
