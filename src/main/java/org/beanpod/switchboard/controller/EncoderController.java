package org.beanpod.switchboard.controller;

import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dto.DeviceDTO;
import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/encoder")
public class EncoderController {

    @Autowired
    EncoderDaoImpl encoderService;

    @Autowired
    DeviceDaoImpl deviceService;

    @Autowired
    EncoderMapper encoderMapper;

    @GetMapping
    public List<EncoderDTO> retrieveAllEncoders() {
        List<EncoderEntity> encoderEntities = encoderService.getEncoders();
        return encoderMapper.toEncoderDTOs(encoderEntities);
    }

    @GetMapping("/{serialNumber}")
    public ResponseEntity<EncoderDTO> retrieveEncoder(@PathVariable @Valid String serialNumber) {

        Optional<EncoderDTO> encoder = encoderService.findEncoder(serialNumber);
        if (encoder.isEmpty()) {
            throw new ExceptionType.DeviceNotFoundException(serialNumber);
        }
        return ResponseEntity.ok(encoder.get());
    }

    @PostMapping
    public ResponseEntity<EncoderDTO> createEncoder(@RequestBody @Valid EncoderDTO encoderDTO) {
        Optional<DeviceDTO> deviceOptional = deviceService.findDevice(encoderDTO.getSerialNumber());
        if (deviceOptional.isEmpty()) {
            throw new ExceptionType.DeviceNotFoundException(encoderDTO.getSerialNumber());
        }
        encoderDTO.setDevice(deviceOptional.get());
        return ResponseEntity.ok(encoderService.save(encoderDTO));
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
    public ResponseEntity<EncoderDTO> updateEncoder(@RequestBody EncoderDTO encoderDTO){
        Optional<EncoderDTO> encoder = encoderService.findEncoder(encoderDTO.getSerialNumber());
        if (encoder.isEmpty()) {
            throw new ExceptionType.DeviceNotFoundException(encoderDTO.getSerialNumber());
        }
        return ResponseEntity.ok(encoderService.save(encoderDTO));
    }

}
