package com.switchboard.app;

import com.switchboard.app.controller.DeviceController;
import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.exceptions.DeviceAlreadyExistsException;
import com.switchboard.app.exceptions.DeviceNotFoundException;
import com.switchboard.app.fixture.DeviceFixture;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class DeviceControllerTest {
    @InjectMocks
    private DeviceController deviceController;

    @Mock
    private DeviceDaoImpl deviceService;

    //stubbed DeviceEntity object
    static private DeviceEntity device1, device2;
    static private List<DeviceEntity> listOfDevices;

    @BeforeAll
    static void deviceFixture(){
        device1 = DeviceFixture.getDevice1();
        device2 = DeviceFixture.getDevice2();
        listOfDevices = DeviceFixture.getListOfDevices();
    }

    @BeforeEach
    void setup(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    final void retrieveAllDevicesTest(){
        when(deviceService.getDevices()).thenReturn(listOfDevices);

        List allDevices = deviceController.retrieveAllDevices();

        assertFalse(allDevices.isEmpty(),"allDevices list is empty."); //check if an empty list was returned
        assertIterableEquals(listOfDevices, allDevices,"listOfDevices and allDevices lists are not equal."); //check both lists contents
    }

    //When a device is available in the DB
    @Test
    final void testRetrieveDevice(){
        when(deviceService.findDevice("1")).thenReturn(java.util.Optional.of(device1));

        DeviceEntity actualDevice = deviceController.retrieveDevice("1").getContent();

        assertNotNull(actualDevice, "actualDevice object is null.");
        assertEquals(device1, actualDevice, "expectedDevice and actualDevice objects are not equal.");
    }

    //When a device is unavailable in the DB
    @Test
    final void testRetrieveDeviceEmpty(){
        assertThrows(DeviceNotFoundException.class, () -> {
            deviceController.retrieveDevice("NotAvailable");
        }, "DeviceNotFoundException exception should have been thrown.");
    }

    //When a device is unavailable in the DB
    @Test
    final void testCreateDeviceAlreadyExists(){
        when(deviceService.findDevice("1")).thenReturn(java.util.Optional.of(device1));

        assertThrows(DeviceAlreadyExistsException.class, () -> {
            deviceController.createDevice(device1);
        }, "DeviceAlreadyExistsException should have been thrown.");
    }

    //When a device is unavailable in the DB
    @Test
    final void testCreateDevice() {
        when(deviceService.save(device1)).thenReturn(device1);

        //mock a request
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setServerName("localhost/device");
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        //request response
        ResponseEntity response = deviceController.createDevice(device1);

        assertEquals(201, response.getStatusCodeValue(), "The status code is not 201.");
        assertEquals("http://localhost/device/1", response.getHeaders().get("Location").get(0), "The returned location is incorrect.");
    }
}
