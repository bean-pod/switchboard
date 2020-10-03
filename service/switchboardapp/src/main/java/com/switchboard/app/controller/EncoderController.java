package com.switchboard.app.controller;
import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.dao.EncoderDaoImpl;
import com.switchboard.app.domain.Device;
import com.switchboard.app.domain.Encoder;
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
    public List<Encoder> retrieveAllEncoders(){
        return encoderService.getEncoders();
    }

    @PostMapping("/encoder")
    public ResponseEntity createEncoder(@RequestBody @Valid Encoder encoder){
        Optional<Device> deviceOptional = deviceService.findDevice(encoder.getSerialNumber());
        encoder.setDevice(deviceOptional.get());
        Encoder savedEncoder = encoderService.save(encoder);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedEncoder.getSerialNumber()).toUri();
        return ResponseEntity.created(location).build();
    }
}
