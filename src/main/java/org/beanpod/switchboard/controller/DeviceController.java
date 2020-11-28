package org.beanpod.switchboard.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/device")
@RequiredArgsConstructor
public class DeviceController {

  private final DeviceDaoImpl service;
  private final DeviceMapper deviceMapper;

  @GetMapping
  public List<DeviceDto> retrieveAllDevices() {
    return (deviceMapper.toDeviceDtos(service.getDevices()));
  }

  @GetMapping("/{serialNumber}")
  public ResponseEntity<DeviceDto> retrieveDevice(@PathVariable String serialNumber) {
    Optional<DeviceDto> device = service.findDevice(serialNumber);
    if (device.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(serialNumber);
    }
    return ResponseEntity.ok(device.get());
  }

  @PostMapping
  public ResponseEntity<DeviceDto> createDevice(@RequestBody @Valid DeviceDto device) {
    Optional<DeviceDto> deviceLookup = service.findDevice(device.getSerialNumber());
    if (deviceLookup.isPresent()) {
      throw new ExceptionType.DeviceAlreadyExistsException(device.getSerialNumber());
    }
    return ResponseEntity.ok(service.save(device));
  }

  @DeleteMapping("/{serialNumber}")
  @Transactional
  public ResponseEntity<String> deleteDevice(@PathVariable String serialNumber) {
    Long response = service.deleteDevice(serialNumber);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(serialNumber);
    }
    return ResponseEntity.ok("Device with serial number " + serialNumber + " Deleted");
  }

  @PutMapping
  @Transactional
  public ResponseEntity<DeviceDto> updateDevice(@RequestBody @Valid DeviceDto device) {
    Optional<DeviceDto> deviceLookup = service.findDevice(device.getSerialNumber());
    if (deviceLookup.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(device.getSerialNumber());
    }
    return ResponseEntity.ok(service.save(device));
  }
}
