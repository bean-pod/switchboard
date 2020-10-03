package com.switchboard.app.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public class ExceptionResponse {

    public HttpStatus status;
    public String message;
    public String error;

}
