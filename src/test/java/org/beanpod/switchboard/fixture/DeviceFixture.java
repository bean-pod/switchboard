package org.beanpod.switchboard.fixture;
import org.beanpod.switchboard.dto.DeviceDTO;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.openapitools.model.DeviceModel;

import java.util.ArrayList;
import java.util.List;

public class DeviceFixture {
    public static final String SERIAL_NUMBER = "1";
    public static final String DISPLAY_NAME = "Device #1";
    public static final String STATUS = "Running";

    public static DeviceEntity getDevice1(){
        return new DeviceEntity("1",
                "127.111.111",
                "Device #1",
                "Running",
                null,
                null);
    }

    public static DeviceEntity getDevice2(){
        return new DeviceEntity("2",
                "127.111.112",
                "Device #2",
                "Running",
                null,
                null);
    }

    public static List<DeviceEntity> getListOfDevices(){
        //Adding stubbed objects to the list that should be returned when getEncoders is called
        List<DeviceEntity> listOfDevices= new ArrayList<>();
        listOfDevices.add(getDevice1());
        listOfDevices.add(getDevice2());
        return listOfDevices;
    }

    public static DeviceModel getDeviceModel(){
        return new DeviceModel()
                .displayName(SERIAL_NUMBER)
                .serialNumber(DISPLAY_NAME)
                .status(STATUS);
    }

    public static DeviceDTO getDeviceDto() {
        return DeviceDTO.builder()
                .displayName(SERIAL_NUMBER)
                .serialNumber(DISPLAY_NAME)
                .status(STATUS)
                .build();
    }
}