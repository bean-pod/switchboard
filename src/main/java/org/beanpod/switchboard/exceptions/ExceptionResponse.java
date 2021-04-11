package org.beanpod.switchboard.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public class ExceptionResponse {
  HttpStatus status;
  String message;
  String error;
}
