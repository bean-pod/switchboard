package org.beanpod.switchboard.exceptions;

public class ExceptionType {

  private static final String SERIAL_NUMBER = "serial number-";
  private static final String ID = "ID-";

  private ExceptionType() {
    throw new IllegalStateException("Utility class");
  }

  public static class DeviceAlreadyExistsException extends RuntimeException {
    public DeviceAlreadyExistsException(String s) {
      super(SERIAL_NUMBER + s);
    }
  }

  public static class DeviceNotFoundException extends RuntimeException {
    public DeviceNotFoundException(String s) {
      super(SERIAL_NUMBER + s);
    }
  }

  public static class StreamAlreadyExistsException extends RuntimeException {
    public static final String MESSAGE_TEMPLATE =
        "Stream already exists between input %s%s and output %s%s";

    public StreamAlreadyExistsException(Long inputChannelId, Long outputChannelId) {
      super(String.format(MESSAGE_TEMPLATE, ID, inputChannelId, ID, outputChannelId));
    }
  }

  public static class StreamDoesNotExistException extends RuntimeException {
    public static final String MESSAGE_TEMPLATE = "Channel %s%s does not exist";

    public StreamDoesNotExistException(Long streamId) {
      super(String.format(MESSAGE_TEMPLATE, ID, streamId));
    }
  }

  public static class UnknownException extends RuntimeException {
    public static final String MESSAGE_TEMPLATE = "Unknown error the %s controller";

    public UnknownException(String controllerName) {
      super(String.format(MESSAGE_TEMPLATE, controllerName));
    }
  }

  public static class CouldNotAuthenticateUserException extends RuntimeException {
    public static final String MESSAGE = "Could not authenticate the user";

    public CouldNotAuthenticateUserException(){
      super(MESSAGE);
    }
  }
}
