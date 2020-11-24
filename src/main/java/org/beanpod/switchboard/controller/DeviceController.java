package org.beanpod.switchboard.controller;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import javax.validation.Valid;

import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DeviceDTO;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.openapitools.api.DeviceApi;
import org.openapitools.model.CreateDeviceModel;
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
import org.springframework.web.context.request.NativeWebRequest;

@Slf4j
@RestController
@RequestMapping("/device")
@RequiredArgsConstructor
public class DeviceController implements DeviceApi {
  public static final String UNKNOWN_ERROR_MESSAGE = "Unknown error in Device Controller";
  private final DeviceDaoImpl service;
  private final DeviceMapper deviceMapper;


  @Override
  public ResponseEntity<List<DeviceModel>> retrieveAllDevices() {
    return Optional.of(service.getDevices())
            .map(deviceMapper::toDeviceDTOs)
            .map(deviceMapper::toDeviceModels)
            .map(ResponseEntity::ok)
            .orElseThrow(this::getUnknownException);
  }

  @Override
  public ResponseEntity<DeviceModel> retrieveDevice(@PathVariable String serialNumber) {
    return Optional.of(serialNumber)
            .map(service::findDevice)
            .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serialNumber))
            .map(deviceMapper::toDeviceModel)
            .map(ResponseEntity::ok)
            .orElseThrow(this::getUnknownException);
  }

  @Override
  public ResponseEntity<DeviceModel> createDevice(@Valid CreateDeviceModel createDeviceModel) {
    Optional<DeviceDTO> deviceLookup = service.findDevice(createDeviceModel.getSerialNumber());
    if (deviceLookup.isPresent()) {
      throw new ExceptionType.DeviceAlreadyExistsException(createDeviceModel.getSerialNumber());
    }
    return ResponseEntity.ok(service.save(createDeviceModel));
  }

  @Override
  @Transactional
  public ResponseEntity<String> deleteDevice(@PathVariable String serialNumber) {
    Long response = service.deleteDevice(serialNumber);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(serialNumber);
    }
    return ResponseEntity.ok("Device with serial number " + serialNumber + " Deleted");
  }

  @Override
  @Transactional
  public ResponseEntity<DeviceModel> updateDevice(@Valid DeviceModel deviceModel) {
    return Optional.of(deviceModel)
            .map(model -> service.findDevice(model.getSerialNumber()))
            .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(deviceModel.getSerialNumber()))
            .map(service::save)
            .map(deviceMapper::toDeviceModel)
            .map(ResponseEntity::ok)
            .orElseThrow(this::getUnknownException);
  }

  private RuntimeException getUnknownException(){
    return new RuntimeException(UNKNOWN_ERROR_MESSAGE);
  }
}
