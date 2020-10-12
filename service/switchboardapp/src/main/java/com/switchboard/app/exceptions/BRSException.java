package com.switchboard.app.exceptions;

public class BRSException {


    public static class DeviceAlreadyExistsException extends RuntimeException {
        public DeviceAlreadyExistsException(String s) {
            super(s);
        }
    }

    public static class DeviceNotFoundException extends RuntimeException {
        public DeviceNotFoundException(String s) {
            super(s);
        }
    }

    public static class DevicePrimaryKeyRestriction extends RuntimeException {
        public DevicePrimaryKeyRestriction(String s) {
            super(s);
        }
    }
}
