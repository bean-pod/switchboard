package com.switchboard.app.exceptions;

public class BRSException {


    public static class DeviceAlreadyExistsException extends RuntimeException {
        public DeviceAlreadyExistsException(String s) {
            super("serial number-" + s);
        }
    }

    public static class DeviceNotFoundException extends RuntimeException {
        public DeviceNotFoundException(String s) {
            super("serial number-" + s);
        }
    }

    public static class DevicePrimaryKeyRestriction extends RuntimeException {
        public DevicePrimaryKeyRestriction(String s) {
            super("serial number-" + s);
        }
    }

    public static class DeviceNotUpdated extends RuntimeException {
        public DeviceNotUpdated(String s) {
            super("serial number-" + s);
        }
    }

}
