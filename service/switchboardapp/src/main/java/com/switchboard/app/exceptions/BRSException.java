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

    public static class DeviceReferencedException extends RuntimeException {
        public DeviceReferencedException(String s) {
            super(s);
        }
    }
}
