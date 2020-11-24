package org.beanpod.switchboard.controller;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DeviceDTO;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.openapitools.api.DeviceApi;
import org.openapitools.model.DeviceModel;
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
@RequestMapping("/device")
@RequiredArgsConstructor
public class DeviceController implements DeviceApi {
  public static final String UNKNOWN_ERROR_MESSAGE = "Unknown error in Device Controller";
  private final DeviceDaoImpl service;
  private final DeviceMapper deviceMapper;

  @GetMapping
  public ResponseEntity<List<DeviceModel>> retrieveAllDevices() {
    return Optional.of(service.getDevices())
            .map(deviceMapper::toDeviceDTOs)
            .map(deviceMapper::toDeviceModels)
            .map(ResponseEntity::ok)
            .orElseThrow(this::getUnknownException);
  }

  @GetMapping("/{serialNumber}")
  public ResponseEntity<DeviceModel> retrieveDevice(@PathVariable String serialNumber) {
    return Optional.of(serialNumber)
            .map(service::findDevice)
            .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serialNumber))
            .map(deviceMapper::toDeviceModel)
            .map(ResponseEntity::ok)
            .orElseThrow(this::getUnknownException);
  }

  @PostMapping
  public ResponseEntity<DeviceDTO> createDevice(@RequestBody @Valid DeviceDTO device) {
    Optional<DeviceDTO> deviceLookup = service.findDevice(device.getSerialNumber());
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
  public ResponseEntity<DeviceDTO> updateDevice(@RequestBody @Valid DeviceDTO device) {
    Optional<DeviceDTO> deviceLookup = service.findDevice(device.getSerialNumber());
    if (deviceLookup.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(device.getSerialNumber());
    }
    return ResponseEntity.ok(service.save(device));
  }

  private RuntimeException getUnknownException(){
    return new RuntimeException(UNKNOWN_ERROR_MESSAGE);
  }
}
