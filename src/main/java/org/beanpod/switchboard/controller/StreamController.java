package org.beanpod.switchboard.controller;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.openapitools.api.StreamApi;
import org.openapitools.model.CreateStreamRequest;
import org.openapitools.model.StreamModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class StreamController implements StreamApi {
  public static final String CONTROLLER_NAME = "Stream";
  private final StreamDaoImpl streamService;
  private final StreamMapper mapper;

  @Override
  public ResponseEntity<List<Long>> getStreams() {
    return Optional.ofNullable(streamService.getStreams())
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<StreamModel> getStreamById(Long id) {
    return Optional.of(id)
            .map(streamService::getStreamById)
            .map(mapper::toModel)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<StreamModel> createStream(@Valid CreateStreamRequest createStreamRequest) {
    return Optional.of(createStreamRequest)
            .map(streamService::createStream)
            .map(mapper::toModel)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<Void> deleteStream(Long id) {
    Optional.of(id).ifPresentOrElse(streamService::deleteStream, () -> new ExceptionType.UnknownException(CONTROLLER_NAME));
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<Void> updateStream(@Valid StreamModel streamModel) {
    Optional.of(streamModel)
            .map(mapper::toDto)
            .ifPresentOrElse(streamService::updateStream, () -> new ExceptionType.UnknownException(CONTROLLER_NAME));
    return ResponseEntity.ok().build();
  }

}
