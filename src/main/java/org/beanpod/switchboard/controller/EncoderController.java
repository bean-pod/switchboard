package org.beanpod.switchboard.controller;

import java.time.Instant;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
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
import org.beanpod.switchboard.service.EncoderService;
import org.beanpod.switchboard.util.MaintainDeviceStatus;
import org.openapitools.model.StreamModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/encoder")
@RequiredArgsConstructor
public class EncoderController {

  public static final String UNKNOWN_ERROR_MESSAGE = "Unknown error in EncoderController";

  private final UserDaoImpl userDao;
  private final EncoderDaoImpl encoderDao;
  private final DeviceDaoImpl deviceService;
  private final EncoderMapper encoderMapper;
  private final StreamMapper streamMapper;
  private final EncoderService encoderService;
  private final MaintainDeviceStatus maintainDeviceStatus;
  private final HttpServletRequest request;

  @GetMapping
  public List<EncoderDto> retrieveAllEncoders() {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    List<EncoderEntity> encoderEntities = encoderDao.getEncoders(user);
    maintainDeviceStatus.maintainStatusField(encoderEntities);
    return encoderMapper.toDtos(encoderEntities);
  }

  @GetMapping("/{serialNumber}")
  public ResponseEntity<EncoderDto> retrieveEncoder(@PathVariable @Valid String serialNumber) {
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
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serialNumber));
  }

  @PostMapping
  public ResponseEntity<EncoderDto> createEncoder(@RequestBody @Valid EncoderDto encoderDto) {
    if (encoderDto.getOutput().isEmpty()) {
      throw new ExceptionType.MissingChannelsException(encoderDto.getSerialNumber());
    }

    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Optional<DeviceDto> deviceOptional =
        deviceService.findDevice(user, encoderDto.getSerialNumber());
    if (deviceOptional.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(encoderDto.getSerialNumber());
    }
    encoderDto.setDevice(deviceOptional.get());
    encoderDto.setLastCommunication(Date.from(Instant.now()));
    return ResponseEntity.ok(encoderDao.save(user, encoderDto));
  }

  @DeleteMapping("/{serialNumber}")
  @Transactional
  public ResponseEntity<String> deleteEncoder(@PathVariable String serialNumber) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    long response = encoderDao.deleteEncoder(user, serialNumber);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(serialNumber);
    }
    return ResponseEntity.ok("Encoder with serial number " + serialNumber + " Deleted");
  }

  @PutMapping
  public ResponseEntity<EncoderDto> updateEncoder(@RequestBody EncoderDto encoderDto) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Optional<EncoderDto> encoder = encoderDao.findEncoder(user, encoderDto.getSerialNumber());
    if (encoder.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(encoderDto.getSerialNumber());
    }
    return ResponseEntity.ok(encoderDao.save(user, encoderDto));
  }

  @GetMapping("/{serialNumber}/streams")
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
