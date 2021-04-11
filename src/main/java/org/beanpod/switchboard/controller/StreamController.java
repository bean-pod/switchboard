package org.beanpod.switchboard.controller;

import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.dto.mapper.StreamStatMapper;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.exceptions.ExceptionType.UnknownException;
import org.beanpod.switchboard.service.StreamService;
import org.beanpod.switchboard.util.MaintainDeviceStatus;
import org.openapitools.api.StreamApi;
import org.openapitools.model.CreateStreamRequest;
import org.openapitools.model.StreamModel;
import org.openapitools.model.StreamStatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StreamController implements StreamApi {

  public static final String CONTROLLER_NAME = "Stream";
  private final UserDaoImpl userDao;
  private final StreamDaoImpl streamDao;
  private final StreamService streamService;
  private final StreamMapper mapper;
  private final StreamStatMapper statMapper;
  private final MaintainDeviceStatus maintainDeviceStatus;
  private final HttpServletRequest request;

  @Override
  public ResponseEntity<List<Long>> getStreams() {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    return Optional.ofNullable(streamDao.getStreams(user))
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<StreamModel> getStreamById(Long id) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Optional<StreamDto> streamDto =
        Optional.of(id).map(streamId -> streamDao.getStreamById(user, streamId));

    // maintain status field and create a log
    streamDto.ifPresent(maintainDeviceStatus::maintainStatusField);

    return streamDto
        .map(mapper::toModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<StreamStatModel> getStreamStatById(Long id) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Optional<StreamStatDto> streamStatDto = streamDao.getStreamStat(user, id);

    return streamStatDto
        .map(statMapper::toModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<StreamModel> createStream(@Valid CreateStreamRequest createStreamRequest) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    return Optional.of(createStreamRequest)
        .map(createStreamReq -> streamService.createStream(user, createStreamReq))
        .map(mapper::toModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
  }

  @Transactional
  @Override
  @Transactional
  public ResponseEntity<Void> deleteStream(Long id) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Optional.of(id)
        .ifPresentOrElse(
            streamId -> streamDao.deleteStream(user, streamId),
            () -> {
              throw new UnknownException(CONTROLLER_NAME);
            });
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<StreamModel> updateStream(@Valid StreamModel streamModel) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    return Optional.of(streamModel)
        .map(mapper::toDto)
        .map(streamDto -> streamService.updateStream(user, streamDto))
        .map(mapper::toModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<StreamStatModel> updateStreamStat(@Valid StreamStatModel streamStatModel) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    return Optional.of(streamStatModel)
        .map(statMapper::toDto)
        .map(streamStatDto -> streamService.updateStreamStat(user, streamStatDto))
        .map(statMapper::toModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new UnknownException(CONTROLLER_NAME));
  }

  @Override
  public ResponseEntity<List<StreamStatModel>> retrieveStreamStats() {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    return Optional.of(streamService.getStreamStats(user))
        .map(statMapper::toModels)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
  }
}
