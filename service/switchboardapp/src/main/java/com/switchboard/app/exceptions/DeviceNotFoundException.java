package com.switchboard.app.exceptions;

public class DeviceNotFoundException extends RuntimeException {
    public DeviceNotFoundException(String s) {
        super(s);
    }
}
