package org.beanpod.switchboard.controller;

import java.time.Instant;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.exceptions.ExceptionType.UnknownException;
import org.beanpod.switchboard.service.EncoderService;
import org.beanpod.switchboard.util.MaintainDeviceStatus;
import org.openapitools.api.EncoderApi;
import org.openapitools.model.CreateEncoderRequest;
import org.openapitools.model.EncoderModel;
import org.openapitools.model.StreamModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/encoder")
@RequiredArgsConstructor
public class EncoderController implements EncoderApi {

  public static final String UNKNOWN_ERROR_MESSAGE = "Unknown error in EncoderController";

  private final UserDaoImpl userDao;
  private final EncoderDaoImpl encoderDao;
  private final DeviceDaoImpl deviceService;
  private final EncoderMapper encoderMapper;
  private final StreamMapper streamMapper;
  private final EncoderService encoderService;
  private final MaintainDeviceStatus maintainDeviceStatus;
  private final HttpServletRequest request;

  @Override
  public ResponseEntity<List<EncoderModel>> retrieveAllEncoders() {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    List<EncoderEntity> encoderEntities = encoderDao.getEncoders(user);
    maintainDeviceStatus.maintainStatusField(encoderEntities);
    List<EncoderDto> encoderDtos = encoderMapper.toDtos(encoderEntities);
    List<EncoderModel> encoderModels = encoderMapper.toEncoderModels(encoderDtos);
    return ResponseEntity.ok(encoderModels);
  }

  @Override
  public ResponseEntity<EncoderModel> retrieveDecoder(@PathVariable @Valid String serialNumber) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    // maintain status field and create a log if status changed
    Optional<EncoderDto> encoder = encoderDao.findEncoder(user, serialNumber);
    if (encoder.isPresent()) {
      List<EncoderEntity> encodersListTemp = new LinkedList<>();
      encodersListTemp.add(encoderMapper.toEntity(encoder.get()));
      DeviceEntity updatedDevice =
          maintainDeviceStatus.maintainStatusField(encodersListTemp).get(0);
      // update the retrieved decoder object
      encoder.get().getDevice().setStatus(updatedDevice.getStatus());
    }
    // return encoder
    return encoder
        .map(encoderMapper::toEncoderModel)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serialNumber));
  }

  @Override
  public ResponseEntity<EncoderModel> createEncoder(@RequestBody @Valid EncoderModel encoderModel) {
    if (encoderModel.getOutput().isEmpty()) {
      throw new ExceptionType.MissingChannelsException(encoderModel.getSerialNumber());
    }

    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Optional<DeviceDto> deviceOptional =
        deviceService.findDevice(user, encoderModel.getSerialNumber());
    if (deviceOptional.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(encoderModel.getSerialNumber());
    }
    EncoderDto encoderDto = encoderMapper.toEncoderDto(encoderModel);
    encoderDto.setDevice(deviceOptional.get());
    encoderDto.setLastCommunication(Date.from(Instant.now()));
    EncoderDto savedEncoderDto = encoderDao.save(user, encoderDto);
    EncoderModel savedEncoderModel = encoderMapper.toEncoderModel(savedEncoderDto);
    return ResponseEntity.ok(savedEncoderModel);
  }

  @Override
  public ResponseEntity<String> deleteEncoder(@PathVariable String serialNumber) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    long response = encoderDao.deleteEncoder(user, serialNumber);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(serialNumber);
    }
    return ResponseEntity.ok("Encoder with serial number " + serialNumber + " Deleted");
  }

  @Override
  public ResponseEntity<EncoderModel> updateEncoder(@Valid EncoderModel encoderModel) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    return encoderDao.findEncoder(user, encoderModel.getSerialNumber())
        .map((encoderDto) -> encoderDao.save(user, encoderDto))
        .map(encoderMapper::toEncoderModel)
        .map(ResponseEntity::ok)
        .orElseThrow(this::getUnknownException);
  }

  @Override
  public ResponseEntity<List<StreamModel>> getEncoderStreams(@PathVariable String serialNumber) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    return Optional.of(serialNumber)
        .map(sn -> encoderService.getEncoderStreams(user, sn))
        .map(streamMapper::toModels)
        .map(ResponseEntity::ok)
        .orElseThrow(this::getUnknownException);
  }

  private RuntimeException getUnknownException() {
    return new RuntimeException(UNKNOWN_ERROR_MESSAGE);
  }
}
