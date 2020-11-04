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

    public static class ChannelAlreadyExistsException extends RuntimeException {
        public final static String MESSAGE_TEMPLATE = "Channel already exists between decoder %s%s and encoder %s%s";
        public ChannelAlreadyExistsException(String decoderSerialNumber, String encoderSerialNumber){
            super(String.format(MESSAGE_TEMPLATE, sn, decoderSerialNumber, sn, encoderSerialNumber));
        }
    }

    public static class ChannelDoesNotExistsException extends RuntimeException{
        public final static String MESSAGE_TEMPLATE = "Channel ID-%s does not exist";
        public ChannelDoesNotExistsException(Long channelId){
            super(String.format(MESSAGE_TEMPLATE, channelId));
        }
    }
}
