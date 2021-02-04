package org.beanpod.switchboard.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.exceptions.ExceptionType.DeviceNotFoundException;
import org.openapitools.api.DeviceApi;
import org.openapitools.model.CreateDeviceRequest;
import org.openapitools.model.DeviceModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
public class DeviceController implements DeviceApi {
    public static final String CONTROLLER_NAME = "Device";
    private final DeviceDaoImpl service;
    private final DeviceMapper deviceMapper;
    private final HttpServletRequest request;

    @Override
    public ResponseEntity<List<DeviceModel>> retrieveAllDevices() {
        return Optional.of(service.getDevices())
                .map(deviceMapper::toDeviceDtos)
                .map(deviceMapper::toDeviceModelList)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
    }

    @Override
    public ResponseEntity<DeviceModel> retrieveDevice(@PathVariable String serialNumber) {
        DeviceDto deviceDto =
                service
                        .findDevice(serialNumber)
                        .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serialNumber));

        return Optional.of(deviceDto)
                .map(deviceMapper::toDeviceModel)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
    }

    @Override
    public ResponseEntity<DeviceModel> createDevice(@Valid CreateDeviceRequest createDeviceRequest) {
        Optional<DeviceDto> deviceLookup = service.findDevice(createDeviceRequest.getSerialNumber());
        if (deviceLookup.isPresent()) {
            throw new ExceptionType.DeviceAlreadyExistsException(createDeviceRequest.getSerialNumber());
        }

        return Optional.of(createDeviceRequest)
                .map(createRequest -> service.createDevice(createRequest, request.getRemoteAddr()))
                .map(deviceMapper::toDeviceModel)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
    }

    @Override
    @Transactional
    public ResponseEntity<String> deleteDevice(@PathVariable String serialNumber) {
        Long response = service.deleteDevice(serialNumber);
        if (response != 1) {
            throw new ExceptionType.DeviceNotFoundException(serialNumber);
        }
        return ResponseEntity.ok("Device with serial number " + serialNumber + " deleted");
    }

    @Override
    @Transactional
    public ResponseEntity<DeviceModel> updateDevice(@Valid DeviceModel deviceModel) {
        if (service.findDevice(deviceModel.getSerialNumber()).isEmpty()) {
            throw new DeviceNotFoundException(deviceModel.getSerialNumber());
        }

        return Optional.of(deviceModel)
                .map(deviceMapper::toDeviceDto)
                .map(service::save)
                .map(deviceMapper::toDeviceModel)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ExceptionType.UnknownException(CONTROLLER_NAME));
    }
}
