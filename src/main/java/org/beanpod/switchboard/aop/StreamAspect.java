package org.beanpod.switchboard.aop;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.beanpod.switchboard.service.LogService;
import org.openapitools.model.StreamModel;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Configuration
@Aspect
@Component
@RequiredArgsConstructor
public class StreamAspect {

  private final LogService logService;

  @AfterReturning(
      value = "execution(* org.beanpod.switchboard.controller.StreamController.createStream(..))",
      returning = "result")
  public void createStream(Object result) {
    ResponseEntity<StreamModel> response = (ResponseEntity<StreamModel>) result;
    String decoderSerial = response.getBody().getInputChannel().getDecoder().getSerialNumber();
    String encoderSerial = response.getBody().getOutputChannel().getEncoder().getSerialNumber();
    Long outputId = response.getBody().getOutputChannel().getId();
    Long inputId = response.getBody().getInputChannel().getId();
    String message =
        String.format(
            "A stream started from output channel %d of decoder %s"
                + " to input channel %d of encoder %s",
            outputId, decoderSerial, inputId, encoderSerial);
    logService.createLog(message, "info");
  }
}
