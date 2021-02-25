package org.beanpod.switchboard.entity;

import java.util.Date;

/*
 * Serves a single purpose which is avoiding duplicating maintainStatusField method
 * Both EncoderEntity and DecoderEntity classes implement this interface
 * */
public interface DecoderEncoderInterface {

  DeviceEntity getDevice();

  Date getLastCommunication();

  String getSerialNumber();
}
