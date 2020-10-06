package com.switchboard.app.exceptions;

public class DeviceAlreadyExistsException extends RuntimeException {
    public DeviceAlreadyExistsException(String s) {
        super(s);
    }
}
