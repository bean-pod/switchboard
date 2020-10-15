package com.switchboard.app;

import com.switchboard.app.controller.DeviceController;
import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.domain.EncoderEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.Mockito.when;

public class DeviceControllerTest {
    @InjectMocks
    DeviceController deviceController;

    @Mock
    DeviceDaoImpl deviceService;

    private DeviceEntity device1;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.initMocks(this);

        device1 = new DeviceEntity("1","Device #1","Running",null,null);
    }

    @Test
    final void retrieveAllDevicesTest(){
        //stubbing DeviceEntity object
        DeviceEntity device2 = new DeviceEntity("2","Device #2","Running",null,null);

        //Adding stubbed objects to the list that should be returned when getEncoders is called
        List<DeviceEntity> listOfDevices= new ArrayList<DeviceEntity>();
        listOfDevices.add(device1);
        listOfDevices.add(device2);

        when(deviceService.getDevices()).thenReturn(listOfDevices);

        List allDevices = deviceController.retrieveAllDevices();

        assertFalse(allDevices.isEmpty(),"allDevices list is empty."); //check if an empty list was returned
        assertIterableEquals(listOfDevices, allDevices,"listOfDevices and allDevices lists are not equal."); //check both lists contents
    }
}
