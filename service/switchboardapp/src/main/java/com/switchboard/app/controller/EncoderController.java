package com.switchboard.app.controller;
import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.dao.EncoderDaoImpl;
import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.domain.EncoderEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
public class EncoderController {
    @Autowired
    EncoderDaoImpl encoderService;

    @Autowired
    DeviceDaoImpl deviceService;

    @GetMapping("/encoder")
    public List<EncoderEntity> retrieveAllEncoders(){
        return encoderService.getEncoders();
    }

    @PostMapping("/encoder")
    public ResponseEntity createEncoder(@RequestBody @Valid EncoderEntity encoderEntity){
        Optional<DeviceEntity> deviceOptional = deviceService.findDevice(encoderEntity.getSerialNumber());
        encoderEntity.setDevice(deviceOptional.get());
        EncoderEntity savedEncoderEntity = encoderService.save(encoderEntity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedEncoderEntity.getSerialNumber()).toUri();
        return ResponseEntity.created(location).build();
    }
}
