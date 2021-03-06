package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.dto.DeviceDto;
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
import org.openapitools.model.CreateDeviceRequest;

class DeviceDaoImplTest {

  // stubbed DeviceEntity object
  private static DeviceEntity device;
  private static DeviceDto deviceDto;
  private static List<DeviceEntity> listOfDevices;
  private static CreateDeviceRequest createDeviceRequest;
  private static DeviceEntity deviceEntity;
  @InjectMocks private DeviceDaoImpl deviceDaoImpl;
  @Mock private DeviceRepository deviceRepository;
  @Mock private DeviceMapper deviceMapper;
  @Mock private DeviceDaoImpl deviceDaoImplMock;

  @BeforeEach
  void setupDecoderFixture() {
    device = DeviceFixture.getDevice1();
    deviceDto = DeviceFixture.getDeviceDto();
    listOfDevices = DeviceFixture.getListOfDevices();
    createDeviceRequest = DeviceFixture.getCreateDeviceRequest();
    deviceEntity = DeviceFixture.getDevice1();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testSave() {
    when(deviceMapper.toDeviceDto(any(DeviceEntity.class))).thenReturn(deviceDto);
    when(deviceMapper.toDeviceEntity(any())).thenReturn(device);
    when(deviceRepository.findDeviceBySerialNumber(DecoderFixture.SERIAL_NUMBER))
        .thenReturn(java.util.Optional.of(device));
    when(deviceMapper.toDeviceDto(any(DeviceEntity.class))).thenReturn(deviceDto);
    when(deviceMapper.toDeviceEntity(any())).thenReturn(device);
    when(deviceRepository.save(device)).thenReturn(device);
    DeviceDto deviceDTO = deviceDaoImpl.save(deviceDto);
    assertEquals(deviceDto, deviceDTO);
  }

  @Test
  final void testFindDevice() {
    when(deviceMapper.toDeviceDto(any(DeviceEntity.class))).thenReturn(deviceDto);
    when(deviceMapper.toDeviceEntity(any())).thenReturn(device);
    when(deviceRepository.findDeviceBySerialNumber(DecoderFixture.SERIAL_NUMBER))
        .thenReturn(java.util.Optional.of(device));
    Optional<DeviceDto> deviceDTO = deviceDaoImpl.findDevice(DecoderFixture.SERIAL_NUMBER);
    assertEquals(deviceDTO.get(), deviceDto);
  }

  @Test
  final void testGetDevices() {
    when(deviceRepository.findAll()).thenReturn(listOfDevices);
    List<DeviceEntity> deviceEntities = deviceDaoImpl.getDevices();
    assertIterableEquals(deviceEntities, listOfDevices);
  }

  @Test
  final void testDeleteDevice() {
    when(deviceRepository.deleteDeviceEntitiesBySerialNumber(DecoderFixture.SERIAL_NUMBER))
        .thenReturn((long) 1);
    Long response = deviceDaoImpl.deleteDevice(DecoderFixture.SERIAL_NUMBER);
    assertEquals(1, response);
  }

  @Test
  final void testCreateDevice() {
    String ipAddress = DeviceFixture.PUBLIC_IP_ADDRESS;
    when(deviceMapper.toDeviceDto(createDeviceRequest, ipAddress)).thenReturn(deviceDto);
    when(deviceMapper.toDeviceEntity(deviceDto)).thenReturn(deviceEntity);
    when(deviceRepository.save(deviceEntity)).thenReturn(deviceEntity);
    when(deviceMapper.toDeviceDto(deviceEntity)).thenReturn(deviceDto);

    DeviceDto result = deviceDaoImpl.createDevice(createDeviceRequest, ipAddress);

    assertEquals(deviceDto, result);
  }
}
