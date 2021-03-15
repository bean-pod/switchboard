package org.beanpod.switchboard.exceptions;

import org.beanpod.switchboard.exceptions.ExceptionType.MissingChannelsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(Exception.class)
  public final ResponseEntity<Object> handleAllExceptions(Exception ex) {

    ExceptionResponse exceptionResponse =
        new ExceptionResponse(
            HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), "An unknown error occured");
    return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
  }

  @ExceptionHandler(MissingChannelsException.class)
  public final ResponseEntity<Object> handleMissingChannelException(Exception ex) {
    ExceptionResponse exceptionResponse =
        new ExceptionResponse(
            HttpStatus.NOT_FOUND, ex.getMessage(), "Add at least one channel to the device");
    return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
  }

  @ExceptionHandler(ExceptionType.DeviceNotFoundException.class)
  public final ResponseEntity<Object> handleDeviceNotFoundException(Exception ex) {
    ExceptionResponse exceptionResponse =
        new ExceptionResponse(HttpStatus.NOT_FOUND, ex.getMessage(), "The device was not found");
    return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
  }

  @ExceptionHandler(ExceptionType.DeviceAlreadyExistsException.class)
  public final ResponseEntity<Object> handleDeviceAlreadyExistsException(Exception ex) {
    ExceptionResponse exceptionResponse =
        new ExceptionResponse(
            HttpStatus.CONFLICT, ex.getMessage(), "The device already exists, change primary key");
    return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
  }

  @ExceptionHandler(ExceptionType.StreamAlreadyExistsException.class)
  public final ResponseEntity<Object> handleStreamAlreadyExistsException(Exception ex) {
    ExceptionResponse exceptionResponse =
        new ExceptionResponse(HttpStatus.CONFLICT, ex.getMessage(), "Stream already exists");
    return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
  }

  @ExceptionHandler(ExceptionType.StreamDoesNotExistException.class)
  public final ResponseEntity<Object> handleStreamDoesNotExistException(Exception ex) {
    ExceptionResponse exceptionResponse =
        new ExceptionResponse(HttpStatus.NOT_FOUND, ex.getMessage(), "Stream doesnt exist");
    return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
  }

  @ExceptionHandler(ExceptionType.UnknownException.class)
  public final ResponseEntity<ExceptionResponse> handleUnknownException(Exception ex) {
    ExceptionResponse exceptionResponse =
        new ExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), "Unknown Error");
    return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
  }
}
