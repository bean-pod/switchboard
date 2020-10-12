package com.switchboard.app.controller;

import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.dao.EncoderDaoImpl;
import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.domain.EncoderEntity;
import com.switchboard.app.exceptions.DeviceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@Slf4j
public class EncoderController {
    @Autowired
    EncoderDaoImpl encoderService;

    @Autowired
    DeviceDaoImpl deviceService;

    @GetMapping("/encoder")
    public List<EncoderEntity> retrieveAllEncoders() {
        return encoderService.getEncoders();
    }

    @GetMapping("/encoder/{serialNumber}")
    public EntityModel<EncoderEntity> retrieveDevice(@PathVariable @Valid String serialNumber) {

        Optional<EncoderEntity> encoder = encoderService.findEncoder(serialNumber);

        if (!encoder.isPresent()) {
            throw new DeviceNotFoundException("serial number-" + serialNumber + "/Encoder");
        }

        EntityModel<EncoderEntity> resource = EntityModel.of(encoder.get());
        WebMvcLinkBuilder linkto = linkTo(methodOn(this.getClass()).retrieveAllEncoders());
        resource.add(linkto.withRel("all-encoders"));
        return resource;
    }

    @PostMapping("/encoder")
    public ResponseEntity createEncoder(@RequestBody @Valid EncoderEntity encoderEntity) {
        Optional<DeviceEntity> deviceOptional = deviceService.findDevice(encoderEntity.getSerialNumber());
        encoderEntity.setDevice(deviceOptional.get());
        EncoderEntity savedEncoderEntity = encoderService.save(encoderEntity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedEncoderEntity.getSerialNumber()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/encoder/{serialNumber}")
    @Transactional
    public ResponseEntity deleteEncoder(@PathVariable String serialNumber){
        Long response = encoderService.deleteEncoder(serialNumber);
        if(response!=1){
            throw new DeviceNotFoundException("serial number-" + serialNumber);
        }
        return ResponseEntity.ok("Encoder with serial number " + serialNumber+" Deleted");
    }
}
