package org.beanpod.switchboard.controller;

import java.time.Instant;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.EncoderDto.EncoderDtoBuilder;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.service.EncoderService;
import org.beanpod.switchboard.util.MaintainDeviceStatus;
import org.openapitools.model.StreamModel;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/encoder")
@RequiredArgsConstructor
public class EncoderController {

  public static final String UNKNOWN_ERROR_MESSAGE = "Unknown error in EncoderController";

  private final EncoderDaoImpl encoderDao;
  private final DeviceDaoImpl deviceService;
  private final EncoderMapper encoderMapper;
  private final StreamMapper streamMapper;
  private final EncoderService encoderService;
  private final MaintainDeviceStatus maintainDeviceStatus;

  @SneakyThrows
  @PutMapping(
      value = "config/{serialNumber}",
      consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
  public String uploadImage(
      @PathVariable @Valid String serialNumber,
      @RequestParam(value = "configurationSchema", required = false) MultipartFile schema,
      @RequestParam(value = "configurationInstance", required = false) MultipartFile instance) {
    EncoderDtoBuilder builder = EncoderDto.builder().serialNumber(serialNumber);
    if (schema != null) {
      builder.configurationSchema(schema.getBytes());
    }
    if (instance != null) {
      builder
          .configurationInstance(instance.getBytes())
          .configurationLastModified(Date.from(Instant.now()));
    }
    updateEncoder(builder.build());
    return "Configuration uploaded successfully";
  }

  @GetMapping
  public List<EncoderDto> retrieveAllEncoders() {
    List<EncoderEntity> encoderEntities = encoderDao.getEncoders();
    maintainDeviceStatus.maintainStatusField(encoderEntities);
    return encoderMapper.toEncoderDtos(encoderEntities);
  }

  @GetMapping("/{serialNumber}")
  public ResponseEntity<EncoderDto> retrieveEncoder(@PathVariable @Valid String serialNumber) {

    // maintain status field and create a log if status changed
    Optional<EncoderDto> encoder = encoderDao.findEncoder(serialNumber);
    if (encoder.isPresent()) {
      List<EncoderEntity> encodersListTemp = new LinkedList<>();
      encodersListTemp.add(encoderMapper.toEncoderEntity(encoder.get()));
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
    Optional<DeviceDto> deviceOptional = deviceService.findDevice(encoderDto.getSerialNumber());
    if (deviceOptional.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(encoderDto.getSerialNumber());
    }
    encoderDto.setDevice(deviceOptional.get());
    encoderDto.setLastCommunication(Date.from(Instant.now()));
    return ResponseEntity.ok(encoderDao.save(encoderDto));
  }

  @DeleteMapping("/{serialNumber}")
  @Transactional
  public ResponseEntity<String> deleteEncoder(@PathVariable String serialNumber) {
    long response = encoderDao.deleteEncoder(serialNumber);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(serialNumber);
    }
    return ResponseEntity.ok("Encoder with serial number " + serialNumber + " Deleted");
  }

  @PutMapping
  public ResponseEntity<EncoderDto> updateEncoder(@RequestBody EncoderDto encoderDto) {
    Optional<EncoderDto> encoder = encoderDao.findEncoder(encoderDto.getSerialNumber());
    if (encoder.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(encoderDto.getSerialNumber());
    }
    return ResponseEntity.ok(encoderDao.save(encoderDto));
  }

  @GetMapping("/{serialNumber}/streams")
  public ResponseEntity<List<StreamModel>> getEncoderStreams(@PathVariable String serialNumber) {
    return Optional.of(serialNumber)
        .map(encoderService::getEncoderStreams)
        .map(streamMapper::toModelList)
        .map(ResponseEntity::ok)
        .orElseThrow(this::getUnknownException);
  }

  private RuntimeException getUnknownException() {
    return new RuntimeException(UNKNOWN_ERROR_MESSAGE);
  }
}
