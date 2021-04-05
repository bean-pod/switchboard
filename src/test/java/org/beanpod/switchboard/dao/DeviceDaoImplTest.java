package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.DeviceRepository;
import org.beanpod.switchboard.util.UserMockUtil;
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
  private static UserEntity user;
  @InjectMocks private DeviceDaoImpl deviceDaoImpl;
  @Mock private DeviceRepository deviceRepository;
  @Mock private DeviceMapper deviceMapper;
  @Mock private HttpServletRequest httpServletRequest;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;

  @BeforeEach
  void setup() {
    setupDecoderFixture();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  private void setupDecoderFixture() {
    device = DeviceFixture.getDevice1();
    deviceDto = DeviceFixture.getDeviceDto();
    listOfDevices = DeviceFixture.getListOfDevices();
    createDeviceRequest = DeviceFixture.getCreateDeviceRequest();
    deviceEntity = DeviceFixture.getDevice1();
    user = UserFixture.getUserEntity();
  }

  @Test
  final void testSave() {
    when(deviceMapper.toDeviceDto(any(DeviceEntity.class))).thenReturn(deviceDto);
    when(deviceMapper.toDeviceEntity(any())).thenReturn(device);
    when(deviceRepository.findDeviceEntityByUserAndSerialNumber(user, DecoderFixture.SERIAL_NUMBER))
        .thenReturn(java.util.Optional.of(device));
    when(deviceMapper.toDeviceDto(any(DeviceEntity.class))).thenReturn(deviceDto);
    when(deviceMapper.toDeviceEntity(any())).thenReturn(device);
    when(deviceRepository.save(device)).thenReturn(device);
    DeviceDto deviceDTO = deviceDaoImpl.save(user, deviceDto);
    assertEquals(deviceDto, deviceDTO);
  }

  @Test
  final void testFindDevice() {
    when(deviceMapper.toDeviceDto(any(DeviceEntity.class))).thenReturn(deviceDto);
    when(deviceMapper.toDeviceEntity(any())).thenReturn(device);
    when(deviceRepository.findDeviceEntityByUserAndSerialNumber(user, DecoderFixture.SERIAL_NUMBER))
        .thenReturn(java.util.Optional.of(device));
    Optional<DeviceDto> deviceDTO = deviceDaoImpl.findDevice(user, DecoderFixture.SERIAL_NUMBER);
    assertEquals(deviceDTO.get(), deviceDto);
  }

  @Test
  final void testGetDevices() {
    when(deviceRepository.findDeviceEntitiesByUser(user)).thenReturn(listOfDevices);
    List<DeviceEntity> deviceEntities = deviceDaoImpl.getDevices(user);
    assertIterableEquals(deviceEntities, listOfDevices);
  }

  @Test
  final void testDeleteDevice() {
    when(deviceRepository.deleteDeviceEntityByUserAndSerialNumber(
            user, DecoderFixture.SERIAL_NUMBER))
        .thenReturn((long) 1);
    Long response = deviceDaoImpl.deleteDevice(user, DecoderFixture.SERIAL_NUMBER);
    assertEquals(1, response);
  }

  @Test
  final void testCreateDevice() {
    String ipAddress = DeviceFixture.PUBLIC_IP_ADDRESS;
    when(deviceMapper.toDeviceDto(user, createDeviceRequest, ipAddress)).thenReturn(deviceDto);
    when(deviceMapper.toDeviceEntity(deviceDto)).thenReturn(deviceEntity);
    when(deviceRepository.save(deviceEntity)).thenReturn(deviceEntity);
    when(deviceMapper.toDeviceDto(deviceEntity)).thenReturn(deviceDto);

    DeviceDto result = deviceDaoImpl.createDevice(user, createDeviceRequest, ipAddress);

    assertEquals(deviceDto, result);
  }
}
