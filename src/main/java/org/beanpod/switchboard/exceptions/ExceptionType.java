package org.beanpod.switchboard.exceptions;

public class ExceptionType {

    private static final String SERIAL_NUMBER = "serial number-";
    private static final String ID = "ID-";

    private ExceptionType(){
        throw new IllegalStateException("Utility class");
    }

    public static class DeviceAlreadyExistsException extends RuntimeException {
        public DeviceAlreadyExistsException(String s) {
            super( SERIAL_NUMBER + s);
        }
    }

    public static class DeviceNotFoundException extends RuntimeException {
        public DeviceNotFoundException(String s) {
            super(SERIAL_NUMBER + s);
        }
    }

    public static class DevicePrimaryKeyRestriction extends RuntimeException {
        public DevicePrimaryKeyRestriction(String s) {
            super(SERIAL_NUMBER + s);
        }
    }

    public static class DeviceNotUpdated extends RuntimeException {
        public DeviceNotUpdated(String s) {
            super(SERIAL_NUMBER + s);
        }
    }

    public static class StreamAlreadyExistsException extends RuntimeException {
        public final static String MESSAGE_TEMPLATE = "Stream already exists between input %s%s and output %s%s";
        public StreamAlreadyExistsException(Long inputChannelId, Long outputChannelId){
            super(String.format(MESSAGE_TEMPLATE, ID, inputChannelId, ID, outputChannelId));
        }
    }

    public static class StreamDoesNotExistsException extends RuntimeException{
        public final static String MESSAGE_TEMPLATE = "Channel %s%s does not exist";
        public StreamDoesNotExistsException(Long streamId){
            super(String.format(MESSAGE_TEMPLATE, ID, streamId));
        }
    }
}
