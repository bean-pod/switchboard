package org.beanpod.switchboard.exceptions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class CustomRestExceptionHandlerTest {

  private static Exception exception;
  @InjectMocks private CustomRestExceptionHandler customRestExceptionHandler;

  @BeforeAll
  static void exceptionFixture() {
    exception = new Exception("serial number");
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this); // to be able to initiate encoderController object
  }

  @Test
  final void testHandleAllExceptions() {
    ResponseEntity<Object> responseEntity =
        customRestExceptionHandler.handleAllExceptions(exception);
    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
  }

  @Test
  final void testHandleDeviceNotFoundException() {
    ResponseEntity<Object> responseEntity =
        customRestExceptionHandler.handleDeviceNotFoundException(exception);
    assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
  }

  @Test
  final void handleMissingChannelException() {
    ResponseEntity<Object> responseEntity =
        customRestExceptionHandler.handleMissingChannelException(exception);
    assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
  }

  @Test
  final void testHandleDeviceAlreadyExistsException() {
    ResponseEntity<Object> responseEntity =
        customRestExceptionHandler.handleDeviceAlreadyExistsException(exception);
    assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
  }

  @Test
  final void testHandleStreamAlreadyExistsException() {
    ResponseEntity<Object> responseEntity =
        customRestExceptionHandler.handleStreamAlreadyExistsException(exception);
    assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
  }

  @Test
  final void testHandleStreamDoesNotExistException() {
    ResponseEntity<Object> responseEntity =
        customRestExceptionHandler.handleStreamDoesNotExistException(exception);
    assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
  }

  @Test
  final void testUnknownError() {
    ResponseEntity<ExceptionResponse> exceptionResponse =
        customRestExceptionHandler.handleUnknownException(exception);
    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, exceptionResponse.getStatusCode());
    assertNotNull(exceptionResponse.getBody());
    assertEquals(exception.getMessage(), exceptionResponse.getBody().getMessage());
    assertEquals("Unknown Error", exceptionResponse.getBody().getError());
  }
}
