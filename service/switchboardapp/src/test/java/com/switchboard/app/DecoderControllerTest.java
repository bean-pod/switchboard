package com.switchboard.app;

import com.switchboard.app.controller.DecoderController;
import com.switchboard.app.dao.DecoderDaoImpl;
import com.switchboard.app.domain.DecoderEntity;
import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.exceptions.DeviceNotFoundException;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
//import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class DecoderControllerTest {

    @InjectMocks
    DecoderController decoderController;

    @Mock
    DecoderDaoImpl decoderService;

    @BeforeEach
    void setUp() throws Exception{
        MockitoAnnotations.initMocks(this); //to be able to initiate decoderController object
    }

    @Test
    final void testRetrieveAllDecoders(){
        //stubbing DeviceEntity and DecoderEntity objects
        DeviceEntity device1 = new DeviceEntity("1","Decorder #1","Running",null,null);
        DeviceEntity device2 = new DeviceEntity("2","Decorder #2","Failing",null,null);
        DecoderEntity decoder1 = new DecoderEntity("1", device1);
        DecoderEntity decoder2 = new DecoderEntity("1", device2);
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
        DeviceEntity device = new DeviceEntity("2","Decorder #2","Running",null,null);
        DecoderEntity expectedDecoder = new DecoderEntity("2", device);

        when(decoderService.findDecoder("2")).thenReturn(java.util.Optional.of(expectedDecoder));

        DecoderEntity actualDecoder = decoderController.retrieveDecoder("2").getContent();

        assertNotNull(actualDecoder, "actualDecoder object is null.");
        assertEquals(expectedDecoder, actualDecoder, "expectedDecoder and actualDecoder objects are not equal.");
    }

    //When a decoder is unavailable in the DB
    @Test
    final void testRetrieveDecoderEmpty(){
        assertThrows(DeviceNotFoundException.class, () -> {
            decoderController.retrieveDecoder("NotAvailable");
        }, "DeviceNotFoundException exception should have been thrown.");
    }
}
