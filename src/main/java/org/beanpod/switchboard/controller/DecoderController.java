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
import org.beanpod.switchboard.service.DecoderService;
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

@RestController
@RequestMapping("/decoder")
@RequiredArgsConstructor
public class DecoderController {

  public static final String UNKNOWN_ERROR_MESSAGE = "Unknown error in DecoderController";

  private final UserDaoImpl userDao;
  private final DecoderDaoImpl decoderDao;
  private final DeviceDaoImpl deviceService;
  private final DecoderMapper decoderMapper;
  private final StreamMapper streamMapper;
  private final DecoderService decoderService;
  private final MaintainDeviceStatus maintainDeviceStatus;
  private final HttpServletRequest request;

  @GetMapping
  public List<DecoderDto> retrieveAllDecoders() {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    List<DecoderEntity> decoderEntity = decoderDao.getDecoders(user);
    maintainDeviceStatus.maintainStatusField(decoderEntity);
    return decoderMapper.toDecoderDtos(decoderEntity);
  }

  @GetMapping("/{serialNumber}")
  public ResponseEntity<DecoderDto> retrieveDecoder(@PathVariable @Valid String serialNumber) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    // maintain status field and create a log if status changed
    Optional<DecoderDto> decoder = decoderDao.findDecoder(user, serialNumber);
    if (decoder.isPresent()) {
      List<DecoderEntity> decodersListTemp = new LinkedList<>();
      decodersListTemp.add(decoderMapper.toDecoderEntity(decoder.get()));
      DeviceEntity updatedDevice =
          maintainDeviceStatus.maintainStatusField(decodersListTemp).get(0);
      // update the retrieved decoder object
      decoder.get().getDevice().setStatus(updatedDevice.getStatus());
    }

    // return decoder
    return decoder
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serialNumber));
  }

  @PostMapping
  public ResponseEntity<DecoderDto> createDecoder(@RequestBody @Valid DecoderDto decoderDto) {
    if (decoderDto.getInput().isEmpty()) {
      throw new ExceptionType.MissingChannelsException(decoderDto.getSerialNumber());
    }

    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Optional<DeviceDto> deviceOptional =
        deviceService.findDevice(user, decoderDto.getSerialNumber());
    if (deviceOptional.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(decoderDto.getSerialNumber());
    }
    decoderDto.setDevice(deviceOptional.get());
    decoderDto.setLastCommunication(Date.from(Instant.now()));
    return ResponseEntity.ok(decoderDao.save(decoderDto));
  }

  @DeleteMapping("/{serialNumber}")
  @Transactional
  public ResponseEntity<String> deleteDecoder(@PathVariable String serialNumber) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Long response = decoderDao.deleteDecoder(user, serialNumber);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(serialNumber);
    }
    return ResponseEntity.ok("Decoder with serial number " + serialNumber + " Deleted");
  }

  @PutMapping
  public ResponseEntity<DecoderDto> updateDecoder(@RequestBody DecoderDto decoderDto) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Optional<DecoderDto> decoder = decoderDao.findDecoder(user, decoderDto.getSerialNumber());
    if (decoder.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(decoderDto.getSerialNumber());
    }
    return ResponseEntity.ok(decoderDao.save(decoderDto));
  }

  @GetMapping("/{serialNumber}/streams")
  public ResponseEntity<List<StreamModel>> getDecoderStreams(@PathVariable String serialNumber) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    // Is there a way to add a second parameter, user, in Optional.of for getDecoderStreams?
    return Optional.of(serialNumber)
        .map(decoderService::getDecoderStreams)
        .map(streamMapper::toModelList)
        .map(ResponseEntity::ok)
        .orElseThrow(this::getUnknownException);
  }

  private RuntimeException getUnknownException() {
    return new RuntimeException(UNKNOWN_ERROR_MESSAGE);
  }
}
