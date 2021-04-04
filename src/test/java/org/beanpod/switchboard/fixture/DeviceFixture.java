package org.beanpod.switchboard.fixture;

import java.util.ArrayList;
import java.util.List;
import lombok.SneakyThrows;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.openapitools.model.CreateDeviceRequest;
import org.openapitools.model.DeviceModel;
import org.springframework.mock.web.MockMultipartFile;

public class DeviceFixture {

  public static final String SERIAL_NUMBER = "1";
  public static final String SERIAL_NUMBER2 = "2";
  public static final String PRIVATE_IP_ADDRESS = "192.168.0.158";
  public static final String PUBLIC_IP_ADDRESS = "172.156.78.6";
  public static final String DISPLAY_NAME = "Device #1";
  public static final String DISPLAY_NAME2 = "Device #2";
  public static final String STATUS = "offline";
  public static final MockMultipartFile file =
      new MockMultipartFile("json", "", "application/json", "{\"json\": \"someValue\"}".getBytes());

  @SneakyThrows
  public static DeviceEntity getDevice1() {
    return DeviceEntity.builder()
        .serialNumber(SERIAL_NUMBER)
        .privateIpAddress(PRIVATE_IP_ADDRESS)
        .publicIpAddress(PUBLIC_IP_ADDRESS)
        .displayName(DISPLAY_NAME)
        .status(STATUS)
        .configurationInstance(file.getBytes())
        .user(UserFixture.getUserEntity())
        .build();
  }

  public static DeviceEntity getDevice2() {
    return DeviceEntity.builder()
        .serialNumber(SERIAL_NUMBER2)
        .privateIpAddress(PRIVATE_IP_ADDRESS)
        .publicIpAddress(PUBLIC_IP_ADDRESS)
        .displayName(DISPLAY_NAME2)
        .status(STATUS)
        .user(UserFixture.getUserEntity())
        .build();
  }

  public static List<DeviceEntity> getListOfDevices() {
    List<DeviceEntity> listOfDevices = new ArrayList<>();
    listOfDevices.add(getDevice1());
    return listOfDevices;
  }

  @SneakyThrows
  public static DeviceModel getDeviceModel() {
    return new DeviceModel()
        .displayName(DISPLAY_NAME)
        .serialNumber(SERIAL_NUMBER)
        .privateIpAddress(PRIVATE_IP_ADDRESS)
        .publicIpAddress(PUBLIC_IP_ADDRESS)
        .configurationInstance(file.getBytes())
        .status(STATUS);
  }

  public static CreateDeviceRequest getCreateDeviceRequest() {
    return new CreateDeviceRequest()
        .serialNumber(SERIAL_NUMBER)
        .privateIpAddress(PRIVATE_IP_ADDRESS)
        .displayName(DISPLAY_NAME)
        .status(STATUS);
  }

  @SneakyThrows
  public static DeviceDto getDeviceDto() {
    return DeviceDto.builder()
        .serialNumber(SERIAL_NUMBER)
        .privateIpAddress(PRIVATE_IP_ADDRESS)
        .publicIpAddress(PUBLIC_IP_ADDRESS)
        .displayName(DISPLAY_NAME)
        .configurationInstance(file.getBytes())
        .status(STATUS)
        .build();
  }

  public static DeviceDto getDeviceDto1() {
    return DeviceDto.builder()
        .serialNumber(SERIAL_NUMBER)
        .privateIpAddress(PRIVATE_IP_ADDRESS)
        .publicIpAddress("127.0.0.1")
        .displayName(DISPLAY_NAME)
        .status(STATUS)
        .build();
  }

  public static List<DeviceDto> getDeviceDtos() {
    return List.of(getDeviceDto1());
  }
}
