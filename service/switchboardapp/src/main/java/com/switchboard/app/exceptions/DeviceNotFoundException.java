package com.switchboard.app.exceptions;

import lombok.RequiredArgsConstructor;

public class DeviceNotFoundException extends RuntimeException {
    public DeviceNotFoundException(String s) {
        super(s);
    }
}
