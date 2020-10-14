package com.switchboard.app;

import com.switchboard.app.controller.DecoderController;
import com.switchboard.app.dao.DecoderDaoImpl;
import com.switchboard.app.domain.DecoderEntity;
import com.switchboard.app.domain.DeviceEntity;
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

        List allDecoders = decoderController.retrieveAllDecoders(); //

        assertFalse(allDecoders.isEmpty()); //check if an empty list was returned
        assertIterableEquals(allDecoders, listOfDecoders); //check both lists contents
    }
}
