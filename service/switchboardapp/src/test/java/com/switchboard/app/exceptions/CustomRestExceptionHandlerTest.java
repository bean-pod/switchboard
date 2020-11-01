package com.switchboard.app.exceptions;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CustomRestExceptionHandlerTest {

    @InjectMocks
    private CustomRestExceptionHandler customRestExceptionHandler;

    static private Exception exception;

    @BeforeAll
    static void exceptionFixture(){
        exception = new Exception("serial number");
    }

    @BeforeEach
    void setup(){
        MockitoAnnotations.initMocks(this); //to be able to initiate encoderController object
    }

    @Test
    final void testHandleAllExceptions(){
        ResponseEntity<Object> responseEntity = customRestExceptionHandler.handleAllExceptions(exception);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,responseEntity.getStatusCode());
    }

    @Test
    final void testhandleDeviceNotFoundException(){
        ResponseEntity<Object> responseEntity = customRestExceptionHandler.handleDeviceNotFoundException(exception);
        assertEquals(HttpStatus.NOT_FOUND,responseEntity.getStatusCode());
    }

    @Test
    final void testhandleDeviceAlreadyExistsException(){
        ResponseEntity<Object> responseEntity = customRestExceptionHandler.handleDeviceAlreadyExistsException(exception);
        assertEquals(HttpStatus.CONFLICT,responseEntity.getStatusCode());
    }

    @Test
    final void testhandleDeviceReferencedException(){
        ResponseEntity<Object> responseEntity = customRestExceptionHandler.handleDeviceReferencedException(exception);
        assertEquals(HttpStatus.CONFLICT,responseEntity.getStatusCode());
    }

    @Test
    final void testhandleDeviceNotUpdatedException(){
        ResponseEntity<Object> responseEntity = customRestExceptionHandler.handleDeviceNotUpdatedException(exception);
        assertEquals(HttpStatus.CONFLICT,responseEntity.getStatusCode());
    }

}
