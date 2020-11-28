package org.beanpod.switchboard.controller;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.service.DecoderService;
import org.openapitools.model.StreamModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/decoder")
@RequiredArgsConstructor
public class DecoderController {

  private final DecoderDaoImpl decoderDao;
  private final DeviceDaoImpl deviceService;
  private final DecoderMapper decoderMapper;
  private final StreamMapper streamMapper;
  private final DecoderService decoderService;

  @GetMapping
  public List<DecoderDto> retrieveAllDecoders() {
    List<DecoderEntity> decoderEntity = decoderDao.getDecoders();
    return decoderMapper.toDecoderDtos(decoderEntity);
  }

  @GetMapping("/{serialNumber}")
  public ResponseEntity<DecoderDto> retrieveDecoder(@PathVariable @Valid String serialNumber) {
    return decoderDao
        .findDecoder(serialNumber)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serialNumber));
  }

  @PostMapping
  public ResponseEntity<DecoderDto> createDecoder(@RequestBody @Valid DecoderDto decoderDto) {
    Optional<DeviceDto> deviceOptional = deviceService.findDevice(decoderDto.getSerialNumber());
    if (deviceOptional.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(decoderDto.getSerialNumber());
    }
    decoderDto.setDevice(deviceOptional.get());
    return ResponseEntity.ok(decoderDao.save(decoderDto));
  }

  @DeleteMapping("/{serialNumber}")
  @Transactional
  public ResponseEntity<String> deleteDecoder(@PathVariable String serialNumber) {
    Long response = decoderDao.deleteDecoder(serialNumber);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(serialNumber);
    }
    return ResponseEntity.ok("Decoder with serial number " + serialNumber + " Deleted");
  }

  @PutMapping
  public ResponseEntity<DecoderDto> updateDecoder(@RequestBody DecoderDto decoderDto) {
    Optional<DecoderDto> decoder = decoderDao.findDecoder(decoderDto.getSerialNumber());
    if (decoder.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(decoderDto.getSerialNumber());
    }
    return ResponseEntity.ok(decoderDao.save(decoderDto));
  }

  @GetMapping("/{serialNumber}/streams")
  public ResponseEntity<List<StreamModel>> getDecoderStreams(@PathVariable String serialNumber) {
    return Optional.of(serialNumber)
        .map(decoderService::getDecoderStreams)
        .map(streamMapper::toModelList)
        .map(ResponseEntity::ok)
        .orElseThrow();
  }
}
