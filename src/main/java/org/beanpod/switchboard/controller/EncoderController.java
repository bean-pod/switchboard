package org.beanpod.switchboard.controller;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
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

  private final EncoderDaoImpl encoderService;
  private final DeviceDaoImpl deviceService;
  private final EncoderMapper encoderMapper;

  @GetMapping
  public List<EncoderDto> retrieveAllEncoders() {
    List<EncoderEntity> encoderEntities = encoderService.getEncoders();
    return encoderMapper.toEncoderDtos(encoderEntities);
  }

  @GetMapping("/{serialNumber}")
  public ResponseEntity<EncoderDto> retrieveEncoder(@PathVariable @Valid String serialNumber) {
    return encoderService
        .findEncoder(serialNumber)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serialNumber));
  }

  @PostMapping
  public ResponseEntity<EncoderDto> createEncoder(@RequestBody @Valid EncoderDto encoderDto) {
    Optional<DeviceDto> deviceOptional = deviceService.findDevice(encoderDto.getSerialNumber());
    if (deviceOptional.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(encoderDto.getSerialNumber());
    }
    encoderDto.setDevice(deviceOptional.get());
    return ResponseEntity.ok(encoderService.save(encoderDto));
  }

  @DeleteMapping("/{serialNumber}")
  @Transactional
  public ResponseEntity<String> deleteEncoder(@PathVariable String serialNumber) {
    long response = encoderService.deleteEncoder(serialNumber);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(serialNumber);
    }
    return ResponseEntity.ok("Encoder with serial number " + serialNumber + " Deleted");
  }

  @PutMapping
  public ResponseEntity<EncoderDto> updateEncoder(@RequestBody EncoderDto encoderDto) {
    Optional<EncoderDto> encoder = encoderService.findEncoder(encoderDto.getSerialNumber());
    if (encoder.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(encoderDto.getSerialNumber());
    }
    return ResponseEntity.ok(encoderService.save(encoderDto));
  }
}
