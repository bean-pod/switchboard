package org.beanpod.switchboard.controller;

import java.time.Instant;
import java.util.Base64.Decoder;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.exceptions.ExceptionType.UnknownException;
import org.beanpod.switchboard.service.DecoderService;
import org.beanpod.switchboard.util.MaintainDeviceStatus;
import org.openapitools.api.DecoderApi;
import org.openapitools.model.CreateDecoderRequest;
import org.openapitools.model.DecoderModel;
import org.openapitools.model.StreamModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DecoderController implements DecoderApi {

  public static final String UNKNOWN_ERROR_MESSAGE = "Unknown error in DecoderController";

  private final UserDaoImpl userDao;
  private final DecoderDaoImpl decoderDao;
  private final DeviceDaoImpl deviceService;
  private final DecoderMapper decoderMapper;
  private final StreamMapper streamMapper;
  private final DecoderService decoderService;
  private final MaintainDeviceStatus maintainDeviceStatus;
  private final HttpServletRequest request;

  @Override
  public ResponseEntity<List<DecoderModel>> retrieveAllDecoders() {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    List<DecoderEntity> decoderEntity = decoderDao.getDecoders(user);
    maintainDeviceStatus.maintainStatusField(decoderEntity);
    List<DecoderDto> decoderDtos = decoderMapper.toDtos(decoderEntity);
    List<DecoderModel> decoderModels = decoderMapper.toDecoderModels(decoderDtos);
    return ResponseEntity.ok(decoderModels);
  }

  @Override
  public ResponseEntity<DecoderModel> retrieveDecoder(@PathVariable @Valid String serialNumber) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    // maintain status field and create a log if status changed
    Optional<DecoderDto> decoder = decoderDao.findDecoder(user, serialNumber);
    if (decoder.isPresent()) {
      List<DecoderEntity> decodersListTemp = new LinkedList<>();
      decodersListTemp.add(decoderMapper.toEntity(decoder.get()));
      DeviceEntity updatedDevice =
          maintainDeviceStatus.maintainStatusField(decodersListTemp).get(0);
      // update the retrieved decoder object
      decoder.get().getDevice().setStatus(updatedDevice.getStatus());
    }

    // return decoder
    return decoder
        .map(decoderMapper::toDecoderModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serialNumber));
  }

  @Override
  public ResponseEntity<DecoderModel> createDecoder(@Valid DecoderModel decoderModel) {
    if (decoderModel.getInput().isEmpty()) {
      throw new ExceptionType.MissingChannelsException(decoderModel.getSerialNumber());
    }

    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Optional<DeviceDto> deviceOptional =
        deviceService.findDevice(user, decoderModel.getSerialNumber());
    if (deviceOptional.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(decoderModel.getSerialNumber());
    }

    DecoderDto decoderDto = decoderMapper.toDecoderDto(decoderModel);
    decoderDto.setDevice(deviceOptional.get());
    decoderDto.setLastCommunication(Date.from(Instant.now()));
    DecoderDto savedDecoderDto = decoderDao.save(user, decoderDto);
    DecoderModel savedDecoderModel = decoderMapper.toDecoderModel(savedDecoderDto);
    return ResponseEntity.ok(savedDecoderModel);
  }

  @Override
  public ResponseEntity<String> deleteDecoder(@PathVariable String serialNumber) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Long response = decoderDao.deleteDecoder(user, serialNumber);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(serialNumber);
    }
    return ResponseEntity.ok("Decoder with serial number " + serialNumber + " Deleted");
  }

  @Override
  public ResponseEntity<DecoderModel> updateDecoder(@Valid DecoderModel decoderModel) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Optional<DecoderDto> decoder = decoderDao.findDecoder(user, decoderModel.getSerialNumber());
    if (decoder.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(decoderModel.getSerialNumber());
    }

    DecoderDto decoderDto = decoderMapper.toDecoderDto(decoderModel);
    DecoderDto savedDecoderDto = decoderDao.save(user, decoderDto);
    DecoderModel savedDecoderModel = decoderMapper.toDecoderModel(savedDecoderDto);
    return ResponseEntity.ok(savedDecoderModel);
  }

  @Override
  public ResponseEntity<List<StreamModel>> getDecoderStreams(@PathVariable String serialNumber) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    return Optional.of(serialNumber)
        .map(sn -> decoderService.getDecoderStreams(user, sn))
        .map(streamMapper::toModels)
        .map(ResponseEntity::ok)
        .orElseThrow(this::getUnknownException);
  }

  private RuntimeException getUnknownException() {
    return new UnknownException(UNKNOWN_ERROR_MESSAGE);
  }
}
