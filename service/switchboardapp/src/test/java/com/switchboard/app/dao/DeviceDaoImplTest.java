package com.switchboard.app.dao;

import com.switchboard.app.entity.DeviceEntity;
import com.switchboard.app.fixture.DeviceFixture;
import com.switchboard.app.repository.DeviceRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.Mockito.when;

public class DeviceDaoImplTest {

    @InjectMocks
    private DeviceDaoImpl deviceDaoImpl;

    @Mock
    private DeviceRepository deviceRepository;

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
    final void testSave(){
        when(deviceRepository.save(device1)).thenReturn(device1);
        DeviceEntity deviceEntity = deviceDaoImpl.save(device1);
        assertEquals(deviceEntity,device1,"Returned device is not equal mocked");
    }

    @Test
    final void testFindDevice(){
        when(deviceRepository.findDeviceBySerialNumber("1")).thenReturn(java.util.Optional.of(device1));
        Optional<DeviceEntity> deviceEntity = deviceDaoImpl.findDevice("1");
        assertEquals(deviceEntity,java.util.Optional.of(device1),"Returned device is not equal mocked");
    }

    @Test
    final void testGetDevices(){
        when(deviceRepository.findAll()).thenReturn(listOfDevices);
        List<DeviceEntity> deviceEntities = deviceDaoImpl.getDevices();
        assertIterableEquals(deviceEntities, listOfDevices, "list of expected and given devices are not equal");
    }

    @Test
    final void testDeleteDevice(){
        when(deviceRepository.deleteDeviceEntitiesBySerialNumber("1")).thenReturn((long) 1);
        Long response = deviceDaoImpl.deleteDevice("1");
        assertEquals(response, (long)1, "Deleting device should return 1");
    }

}
