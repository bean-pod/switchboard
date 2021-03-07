package org.beanpod.switchboard.controller;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.dto.mapper.StreamStatMapper;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.exceptions.ExceptionType.UnknownException;
import org.beanpod.switchboard.service.StreamService;
import org.beanpod.switchboard.util.MaintainDeviceStatus;
import org.openapitools.api.StreamApi;
import org.openapitools.model.CreateStreamRequest;
import org.openapitools.model.StreamModel;
import org.openapitools.model.StreamStatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StreamController implements StreamApi {

  public static final String CONTROLLER_NAME = "Stream";
  private final StreamDaoImpl streamDao;
  private final StreamService streamService;
  private final StreamMapper mapper;
  private final StreamStatMapper statMapper;
  private final MaintainDeviceStatus maintainDeviceStatus;

  @Override
  public ResponseEntity<List<Long>> getStreams() {
    return Optional.ofNullable(streamDao.getStreams())
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<StreamModel> getStreamById(Long id) {
    Optional<StreamDto> streamDto = Optional.of(id).map(streamDao::getStreamById);

    // maintain status field and create a log
    if (streamDto.isPresent()) {
      maintainDeviceStatus.maintainStatusField(streamDto.get());
    }

    return streamDto
        .map(mapper::toModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<StreamStatModel> getStreamStatById(Long id) {
    Optional<StreamStatDto> streamStatDto =
        Optional.of(id).map(streamDao::getStreamStat).get();

    return streamStatDto
        .map(statMapper::toModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new UnknownException(CONTROLLER_NAME));
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
    Optional.of(id)
        .ifPresentOrElse(
            streamDao::deleteStream,
            () -> {
              throw new UnknownException(CONTROLLER_NAME);
            });
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<StreamModel> updateStream(@Valid StreamModel streamModel) {
    return Optional.of(streamModel)
        .map(mapper::toDto)
        .map(streamService::updateStream)
        .map(mapper::toModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<StreamStatModel> updateStreamStat(@Valid StreamStatModel streamStatModel) {
    return Optional.of(streamStatModel)
        .map(statMapper::toDto)
        .map(streamService::updateStreamStat)
        .map(statMapper::toModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<List<StreamStatModel>> retrieveStreamStats() {
    return Optional.of(streamService.getStreamStats())
        .map(statMapper::toModelList)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
  }
}
