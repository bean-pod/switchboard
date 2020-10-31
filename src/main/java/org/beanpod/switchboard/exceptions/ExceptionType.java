package org.beanpod.switchboard.exceptions;

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

    public static class StreamAlreadyExistsException extends RuntimeException {
        public final static String MESSAGE_TEMPLATE = "Stream already exists between decoder %s%s and encoder %s%s";
        public StreamAlreadyExistsException(String decoderSerialNumber, String encoderSerialNumber){
            super(String.format(MESSAGE_TEMPLATE, sn, decoderSerialNumber, sn, encoderSerialNumber));
        }
    }

    public static class StreamDoesNotExistsException extends RuntimeException{
        public final static String MESSAGE_TEMPLATE = "Stream ID-%s does not exist";
        public StreamDoesNotExistsException(Long streamId){
            super(String.format(MESSAGE_TEMPLATE, streamId));
        }
    }
}
