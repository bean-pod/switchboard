package com.switchboard.app.fixture;

import com.switchboard.app.entity.DeviceEntity;

import java.util.ArrayList;
import java.util.List;

public class DeviceFixture {
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
}