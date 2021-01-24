package org.beanpod.switchboard.aop;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.exceptions.ExceptionType.UnknownException;
import org.beanpod.switchboard.service.LogService;
import org.openapitools.model.DecoderModel;
import org.openapitools.model.EncoderModel;
import org.openapitools.model.InputChannelModel;
import org.openapitools.model.OutputChannelModel;
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
  private final StreamDaoImpl streamDao;
  String stream = "stream";

  @AfterReturning(
      value = "execution(* org.beanpod.switchboard.controller.StreamController.createStream(..))",
      returning = "result")
  public void createStream(Object result) {
    ResponseEntity<StreamModel> response = (ResponseEntity<StreamModel>) result;

    String decoderSerial =
        Optional.of(response.getBody())
            .map(StreamModel::getInputChannel)
            .map(InputChannelModel::getDecoder)
            .map(DecoderModel::getSerialNumber)
            .orElseThrow(() -> new UnknownException(stream));

    String encoderSerial =
        Optional.of(response.getBody())
            .map(StreamModel::getOutputChannel)
            .map(OutputChannelModel::getEncoder)
            .map(EncoderModel::getSerialNumber)
            .orElseThrow(() -> new UnknownException(stream));

    Long outputId =
        Optional.of(response.getBody())
            .map(StreamModel::getOutputChannel)
            .map(OutputChannelModel::getId)
            .orElseThrow(() -> new UnknownException(stream));

    Long inputId =
        Optional.of(response.getBody())
            .map(StreamModel::getInputChannel)
            .map(InputChannelModel::getId)
            .orElseThrow(() -> new UnknownException(stream));
    String message =
        String.format(
            "A stream started from output channel %d of decoder %s"
                + " to input channel %d of encoder %s",
            outputId, decoderSerial, inputId, encoderSerial);
    logService.createLog(message, "info", decoderSerial + "," + encoderSerial);
  }

  @Before("execution(* org.beanpod.switchboard.controller.StreamController.deleteStream(..))")
  public void deleteStream(JoinPoint joinPoint) {
    Object[] args = joinPoint.getArgs();
    Long streamId = (Long) args[0];
    StreamDto streamDto = streamDao.getStreamById(streamId);
    String decoderSerial = streamDto.getInputChannel().getDecoder().getSerialNumber();
    String encoderSerial = streamDto.getOutputChannel().getEncoder().getSerialNumber();
    String message =
        String.format(
            "Deleted stream of ID %d between decoder %s and encoder %s",
            streamId, decoderSerial, encoderSerial);
    logService.createLog(message, "info", decoderSerial + "," + encoderSerial);
  }

  @AfterReturning(
      "execution(* org.beanpod.switchboard.controller.StreamController.deleteStream(..))")
  public void deleteStream(JoinPoint joinPoint) {
    Object[] args = joinPoint.getArgs();
    Long streamId = (Long) args[0];
    String message =
        String.format(
        "Stream of ID %l is deleted", streamId);
    logService.createLog(message, "info");
  }

}
