package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.openapitools.model.DeviceModel;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class DeviceFixture {
  public static final String SERIAL_NUMBER = "1";
  public static final String SERIAL_NUMBER2 = "2";
  public static final String IP_ADDRESS = "127";
  public static final String DISPLAY_NAME = "Device #1";
  public static final String DISPLAY_NAME2 = "Device #2";
  public static final String STATUS = "Running";

  public static DeviceEntity getDevice1() {
    return DeviceEntity.builder()
        .serialNumber(SERIAL_NUMBER)
        .ipAddress(IP_ADDRESS)
        .displayName(DISPLAY_NAME)
        .status(STATUS)
        .build();
  }

  public static DeviceEntity getDevice2() {
    return DeviceEntity.builder()
        .serialNumber(SERIAL_NUMBER2)
        .ipAddress(IP_ADDRESS)
        .displayName(DISPLAY_NAME2)
        .status(STATUS)
        .build();
  }

  public static List<DeviceEntity> getListOfDevices() {
    List<DeviceEntity> listOfDevices = new ArrayList<>();
    listOfDevices.add(getDevice1());
    listOfDevices.add(getDevice2());
    return listOfDevices;
  }

  public static DeviceModel getDeviceModel() {
    return new DeviceModel().displayName(SERIAL_NUMBER).serialNumber(DISPLAY_NAME).status(STATUS);
  }

  public static DeviceDto getDeviceDto() {
    return DeviceDto.builder()
        .serialNumber(SERIAL_NUMBER)
        .ipAddress(IP_ADDRESS)
        .displayName(DISPLAY_NAME)
        .status(STATUS)
        .build();
  }

  public static List<DeviceDto> getDeviceDtos() throws ParseException {
    return List.of(getDeviceDto());
  }
}
