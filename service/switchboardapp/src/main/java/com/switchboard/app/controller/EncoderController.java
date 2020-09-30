package com.switchboard.app.controller;
import com.switchboard.app.dao.impl.DeviceDaoImpl;
import com.switchboard.app.dao.impl.EncoderDaoImpl;
import com.switchboard.app.domain.Device;
import com.switchboard.app.domain.Encoder;
import com.switchboard.app.exceptions.DeviceNotFoundException;
import com.switchboard.app.repository.DecoderRepository;
import com.switchboard.app.repository.EncoderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class EncoderController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    EncoderDaoImpl encoderService;
//

    @Autowired
    DeviceDaoImpl deviceService;

    @GetMapping("/encoder")
    public List<Encoder> retrieveAllEncoders(){
        return encoderService.getEncoders();
    }

    @PostMapping("/encoder")
    public ResponseEntity createEncoder(@RequestBody Encoder encoder){
        Optional<Device> deviceOptional = deviceService.findDevice(encoder.getSerialNumber());
        encoder.setDevice(deviceOptional.get());

        //  encoderRepository.saveAndFlush(encoder);
        Encoder savedEncoder = encoderService.addEncoder(encoder);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedEncoder.getSerialNumber()).toUri();

        return ResponseEntity.created(location).build();
    }
}
