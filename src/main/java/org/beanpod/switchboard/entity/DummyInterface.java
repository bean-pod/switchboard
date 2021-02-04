package org.beanpod.switchboard.entity;

import java.util.Date;

public interface DummyInterface {
    DeviceEntity getDevice();

    Date getLastCommunication();

    String getSerialNumber();
}
