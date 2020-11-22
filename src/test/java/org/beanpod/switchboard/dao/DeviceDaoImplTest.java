package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.dto.DeviceDTO;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.repository.DeviceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class DeviceDaoImplTest {

    @InjectMocks
    private DeviceDaoImpl deviceDaoImpl;

    @Mock
    private DeviceRepository deviceRepository;

    @Mock
    private DeviceMapper deviceMapper;

    //stubbed DeviceEntity object
    static private DeviceEntity device;
    static private DeviceDTO deviceDto;
    static private List<DeviceEntity> listOfDevices;

    @BeforeEach
    void setupDecoderFixture() {
        device = DeviceFixture.getDevice1();
        deviceDto = DeviceFixture.getDeviceDto();
        listOfDevices = DeviceFixture.getListOfDevices();
    }

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    final void testSave() {
        when(deviceMapper.toDeviceDTO(any())).thenReturn(deviceDto);
        when(deviceMapper.toDeviceEntity(any())).thenReturn(device);
        when(deviceRepository.save(device)).thenReturn(device);
        DeviceDTO deviceDTO = deviceDaoImpl.save(deviceDto);
        assertEquals(deviceDto, deviceDTO);
    }

    @Test
    final void testFindDevice() {
        when(deviceMapper.toDeviceDTO(any())).thenReturn(deviceDto);
        when(deviceMapper.toDeviceEntity(any())).thenReturn(device);
        when(deviceRepository.findDeviceBySerialNumber(DecoderFixture.SERIAL_NUMBER)).thenReturn(java.util.Optional.of(device));
        Optional<DeviceDTO> deviceDTO = deviceDaoImpl.findDevice(DecoderFixture.SERIAL_NUMBER);
        assertEquals(deviceDTO.get(), deviceDto);
    }

    @Test
    final void testGetDevices(){
        when(deviceRepository.findAll()).thenReturn(listOfDevices);
        List<DeviceEntity> deviceEntities = deviceDaoImpl.getDevices();
        assertIterableEquals(deviceEntities, listOfDevices);
    }

    @Test
    final void testDeleteDevice() {
        when(deviceRepository.deleteDeviceEntitiesBySerialNumber(DecoderFixture.SERIAL_NUMBER)).thenReturn((long) 1);
        Long response = deviceDaoImpl.deleteDevice(DecoderFixture.SERIAL_NUMBER);
        assertEquals(1, response);
    }

}
