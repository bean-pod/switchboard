package com.switchboard.app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {

        ExceptionResponse exceptionResponse = new ExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), "An unknown error occured");
        return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
    }

    @ExceptionHandler(ExceptionType.DeviceNotFoundException.class)
    public final ResponseEntity<Object> handleDeviceNotFoundException(Exception ex, WebRequest request) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(HttpStatus.NOT_FOUND, ex.getMessage(), "The device was not found");
        return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
    }

    @ExceptionHandler(ExceptionType.DeviceAlreadyExistsException.class)
    public final ResponseEntity<Object> handleDeviceAlreadyExistsException(Exception ex, WebRequest request) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(HttpStatus.CONFLICT, ex.getMessage(), "The device already exists, change primary key");
        return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
    }

    @ExceptionHandler(ExceptionType.DevicePrimaryKeyRestriction.class)
    public final ResponseEntity<Object> handleDeviceReferencedException(Exception ex, WebRequest request) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(HttpStatus.CONFLICT, ex.getMessage(), "Primary Key altering not allowed");
        return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
    }

    @ExceptionHandler(ExceptionType.DeviceNotUpdated.class)
    public final ResponseEntity<Object> DeviceNotUpdated(Exception ex, WebRequest request) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(HttpStatus.CONFLICT, ex.getMessage(), "Device was not updated");
        return new ResponseEntity<>(exceptionResponse, exceptionResponse.getStatus());
    }


}
