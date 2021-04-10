package org.beanpod.switchboard.aop;

import java.time.OffsetDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.exceptions.ExceptionType.UnknownException;
import org.beanpod.switchboard.service.StreamLogService;
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

  private final StreamDaoImpl streamDao;
  private final StreamLogService streamLogService;

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

    Long streamId =
        Optional.of(response.getBody())
            .map(StreamModel::getId)
            .orElseThrow(() -> new UnknownException(stream));

    streamLogService.createLog(
        OffsetDateTime.now(), message, decoderSerial, encoderSerial, streamId.toString());
  }
}
