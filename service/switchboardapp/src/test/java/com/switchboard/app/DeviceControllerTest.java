package com.switchboard.app;

import com.switchboard.app.controller.DeviceController;
import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.dto.DeviceDTO;
import com.switchboard.app.dto.mapper.DeviceMapper;
import com.switchboard.app.dto.mapper.DeviceMapperImpl;
import com.switchboard.app.entity.DeviceEntity;
import com.switchboard.app.exceptions.ExceptionType;
import com.switchboard.app.exceptions.ExceptionType.DeviceAlreadyExistsException;
import com.switchboard.app.exceptions.ExceptionType.DeviceNotFoundException;
import com.switchboard.app.fixture.DeviceFixture;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class DeviceControllerTest {
    @InjectMocks
    private DeviceController deviceController;

    @Mock
    private DeviceDaoImpl deviceService;

    private DeviceMapper deviceMapper;

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
        deviceMapper = Mockito.spy(new DeviceMapperImpl());
        MockitoAnnotations.initMocks(this);
    }

    @Test
    final void testRetrieveAllDevices(){
        when(deviceService.getDevices()).thenReturn(listOfDevices);

        List<DeviceDTO> allDevices = deviceController.retrieveAllDevices();
        List<DeviceDTO> listOfExpectDTODevices = deviceMapper.toDeviceDTOs(listOfDevices);

        assertFalse(allDevices.isEmpty(),"allDevices list is empty."); //check if an empty list was returned
        assertIterableEquals(listOfExpectDTODevices, allDevices,"listOfExpectDTODevices and allDevices lists are not equal."); //check both lists contents
    }

    //When a device is available in the DB
    @Test
    final void testRetrieveDevice(){
        when(deviceService.findDevice("1")).thenReturn(java.util.Optional.of(device1));

        ResponseEntity<EntityModel<DeviceDTO>> actualDevice = deviceController.retrieveDevice("1");

        assertNotNull(actualDevice, "actualDevice object is null.");
        assertEquals(200, actualDevice.getStatusCodeValue(), "Status code is not 200");
        assertEquals(device1.getSerialNumber(), actualDevice.getBody().getContent().getSerialNumber(), "expectedDevice and actualDevice objects are not equal.");
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

    //When a device is available in the DB
    @Test
    final void testDeleteDevice(){
        when(deviceService.deleteDevice("1")).thenReturn(Long.valueOf(1));

        ResponseEntity<String> response = deviceController.deleteDevice("1");

        assertEquals(200, response.getStatusCodeValue(), "The status code is not 200.");
        assertEquals("Device with serial number 1 Deleted", response.getBody(), "Returned response does not match the expected.");
    }

    //When a device is unavailable in the DB
    @Test
    final void testDeleteDeviceNotExisting(){
        assertThrows(DeviceNotFoundException.class, () -> {
            deviceController.deleteDevice("Not Available device");
        }, "DeviceNotFoundException should have been thrown.");
    }

    //When a device is available in the DB
    @Test
    final void testUpdateDevice(){
        DeviceDTO deviceDTO1 = deviceMapper.toDeviceDTO(device1);

        when(deviceService.findDevice("1")).thenReturn(java.util.Optional.of(device1));
        when(deviceService.updateDevice("1",deviceDTO1)).thenReturn(Integer.valueOf(1));

        ResponseEntity<String> response = deviceController.updateDevice("1", deviceDTO1);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Device updated", response.getBody());
    }

    /*
     * test all exceptions in the updateDevice controller
     * serial number = 3 doesn't exist
     */
    @Test
    final void testUpdateDeviceExceptions(){
        DeviceDTO deviceDTO1 = deviceMapper.toDeviceDTO(device1);

        //When device is unavailable in the DB
        assertThrows(DeviceNotFoundException.class, () -> {
            deviceController.updateDevice("3", deviceDTO1);
        }, "DeviceNotFoundException should have been thrown.");

        //This stubbing is needed for the following exception to be tested
        when(deviceService.findDevice("1")).thenReturn(java.util.Optional.of(device1));

        //When device is unavailable in the DB
        assertThrows(ExceptionType.DevicePrimaryKeyRestriction.class, () -> {
            deviceController.updateDevice("3", deviceDTO1);
        }, "DevicePrimaryKeyRestriction should have been thrown.");
    }
}