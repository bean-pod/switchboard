package com.switchboard.app.exceptions;

public class ExceptionType {

    private static final String sn = "serial number-";

    private ExceptionType(){
        throw new IllegalStateException("Utility class");
    }

    public static class DeviceAlreadyExistsException extends RuntimeException {
        public DeviceAlreadyExistsException(String s) {
            super( sn + s);
        }
    }

    public static class DeviceNotFoundException extends RuntimeException {
        public DeviceNotFoundException(String s) {
            super(sn + s);
        }
    }

    public static class DevicePrimaryKeyRestriction extends RuntimeException {
        public DevicePrimaryKeyRestriction(String s) {
            super(sn + s);
        }
    }

    public static class DeviceNotUpdated extends RuntimeException {
        public DeviceNotUpdated(String s) {
            super(sn + s);
        }
    }

}
