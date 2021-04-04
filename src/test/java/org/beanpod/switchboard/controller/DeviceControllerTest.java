package org.beanpod.switchboard.controller;

import static org.beanpod.switchboard.fixture.DeviceFixture.file;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import lombok.SneakyThrows;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.CreateDeviceRequest;
import org.openapitools.model.DeviceModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Slf4j
class DeviceControllerTest {

  // stubbed DeviceEntity object
  private static DeviceEntity device;
  private static DeviceDto deviceDTO;
  private static CreateDeviceRequest createDeviceRequest;
  private static DeviceModel deviceModel;
  private static UserEntity user;
  @InjectMocks private DeviceController deviceController;
  @Mock private DeviceDaoImpl deviceDao;
  @Mock private DeviceMapper deviceMapper;
  @Mock private HttpServletRequest request;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;

  @BeforeEach
  void setup() {
    setupDeviceFixture();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, request, userPrincipal, userDao);
  }

  private void setupDeviceFixture() {
    device = DeviceFixture.getDevice1();
    deviceDTO = DeviceFixture.getDeviceDto();
    createDeviceRequest = DeviceFixture.getCreateDeviceRequest();
    deviceModel = DeviceFixture.getDeviceModel();
    user = UserFixture.getUserEntity();
  }

  @SneakyThrows
  @Test
  final void testUploadConfiguration() {

    when(deviceDao.findDevice(any(), any())).thenReturn(Optional.of(deviceDTO));
    when(deviceMapper.toDeviceDto((DeviceModel) any())).thenReturn(deviceDTO);
    when(deviceDao.save(any(), any())).thenReturn(deviceDTO);
    when(deviceMapper.toDeviceModel(any())).thenReturn(deviceModel);

    String s1 = deviceController.uploadConfiguration(DeviceFixture.SERIAL_NUMBER, file).getBody();
    verify(deviceDao).save(user, deviceDTO);

    assertEquals("Configuration uploaded.", s1);
  }

  @Test
  final void testRetrieveAllDevices() {
    when(deviceDao.getDevices(user)).thenReturn(List.of(device));
    when(deviceMapper.toDeviceDtos(any())).thenReturn(List.of(deviceDTO));
    when(deviceMapper.toDeviceModelList(any())).thenReturn(List.of(deviceModel));
    ResponseEntity<List<DeviceModel>> response = deviceController.retrieveAllDevices();

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response.getBody());
    List<DeviceModel> allDevices = response.getBody();
    assertFalse(allDevices.isEmpty()); // check if an empty list was returned
    assertIterableEquals(List.of(deviceModel), allDevices); // check both lists contents
  }

  // When a device is available in the DB
  @Test
  final void testRetrieveDevice() {
    when(deviceDao.findDevice(user, DeviceFixture.SERIAL_NUMBER))
        .thenReturn(Optional.of(deviceDTO));
    when(deviceMapper.toDeviceModel(deviceDTO)).thenReturn(deviceModel);
    ResponseEntity<DeviceModel> response = deviceController.retrieveDevice("1");

    assertNotNull(response);
    assertEquals(200, response.getStatusCodeValue());
    assertNotNull(response.getBody());
    var device = response.getBody();
    assertEquals(deviceModel, device);
  }

  // When a device is unavailable in the DB
  @Test
  final void testRetrieveDeviceEmpty() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> deviceController.retrieveDevice("NotAvailable"));
  }

  // When a device is unavailable in the DB
  @Test
  final void testCreateDeviceAlreadyExists() {
    when(deviceDao.findDevice(user, DeviceFixture.SERIAL_NUMBER))
        .thenReturn(Optional.of(deviceDTO));

    assertThrows(
        ExceptionType.DeviceAlreadyExistsException.class,
        () -> deviceController.createDevice(createDeviceRequest));
  }

  // When a device is unavailable in the DB
  @Test
  final void testCreateDevice() {
    when(deviceDao.save(user, deviceDTO)).thenReturn(deviceDTO);
    when(request.getRemoteAddr()).thenReturn(DeviceFixture.PUBLIC_IP_ADDRESS);
    when(deviceDao.createDevice(user, createDeviceRequest, DeviceFixture.PUBLIC_IP_ADDRESS))
        .thenReturn(deviceDTO);
    when(deviceMapper.toDeviceModel(deviceDTO)).thenReturn(deviceModel);

    ResponseEntity<DeviceModel> response = deviceController.createDevice(createDeviceRequest);

    assertEquals(200, response.getStatusCodeValue());
    assertNotNull(response.getBody());
    DeviceModel device = response.getBody();
    assertEquals(deviceModel, device);
  }

  // When a device is available in the DB
  @Test
  final void testDeleteDevice() {
    when(deviceDao.deleteDevice(user, DeviceFixture.SERIAL_NUMBER)).thenReturn(Long.valueOf(1));
    ResponseEntity<String> response = deviceController.deleteDevice(DeviceFixture.SERIAL_NUMBER);
    assertEquals(200, response.getStatusCodeValue());
    assertEquals("Device with serial number 1 deleted", response.getBody());
  }

  // When a device is unavailable in the DB
  @Test
  final void testDeleteDeviceNotExisting() {
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> deviceController.deleteDevice("Not Available device"));
  }

  // When a device is available in the DB
  @Test
  final void testUpdateDevice() {
    when(deviceDao.findDevice(user, DeviceFixture.SERIAL_NUMBER))
        .thenReturn(Optional.of(deviceDTO));
    deviceModel.setStatus("Stopped");
    when(deviceMapper.toDeviceDto(deviceModel)).thenReturn(deviceDTO);
    when(deviceDao.save(user, deviceDTO)).thenReturn(deviceDTO);
    when(deviceMapper.toDeviceModel(deviceDTO)).thenReturn(deviceModel);
    ResponseEntity<DeviceModel> response = deviceController.updateDevice(deviceModel);

    assertEquals(200, response.getStatusCodeValue());
    assertNotNull(response.getBody());
    assertEquals("Stopped", response.getBody().getStatus());
  }

  /*
   * test all exceptions in the updateDevice controller
   * serial number = 3 doesn't exist
   */
  @Test
  final void testUpdateDeviceExceptions() {
    // When device is unavailable in the DB
    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> deviceController.updateDevice(deviceModel),
        "DeviceNotFoundException should have been thrown.");

    // This stubbing is needed for the following exception to be tested
    when(deviceDao.findDevice(user, DeviceFixture.SERIAL_NUMBER))
        .thenReturn(java.util.Optional.of(deviceDTO));
  }
}
