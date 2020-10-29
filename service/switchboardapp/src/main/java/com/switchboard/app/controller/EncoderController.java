package com.switchboard.app.controller;

import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.dao.EncoderDaoImpl;
import com.switchboard.app.dto.EncoderDTO;
import com.switchboard.app.dto.mapper.EncoderMapper;
import com.switchboard.app.entity.DeviceEntity;
import com.switchboard.app.entity.EncoderEntity;
import com.switchboard.app.exceptions.ExceptionType;
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
        return encoderMapper.toEncoderDTOs(encoderService.getEncoders());
    }

    @GetMapping("/{serialNumber}")
    public ResponseEntity<EntityModel<EncoderDTO>> retrieveEncoder(@PathVariable @Valid String serialNumber) {

        Optional<EncoderEntity> encoder = encoderService.findEncoder(serialNumber);

        if (encoder.isEmpty()) {
            throw new ExceptionType.DeviceNotFoundException(serialNumber + "/Encoder");
        }

        EntityModel<EncoderDTO> resource = EntityModel.of(encoderMapper.toEncoderDTO(encoder.get()));
        WebMvcLinkBuilder linkTo = linkTo(methodOn(this.getClass()).retrieveAllEncoders());
        resource.add(linkTo.withRel("all-encoders"));
        return ResponseEntity.ok(resource);
    }

    @PostMapping
    public ResponseEntity createEncoder(@RequestBody @Valid EncoderEntity encoderEntity) {
        Optional<DeviceEntity> deviceOptional = deviceService.findDevice(encoderEntity.getSerialNumber());

        if (deviceOptional.isEmpty()) {
            throw new ExceptionType.DeviceNotFoundException(encoderEntity.getSerialNumber() + "/Encoder");
        }
        encoderEntity.setDevice(deviceOptional.get());
        EncoderEntity savedEncoderEntity = encoderService.save(encoderEntity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedEncoderEntity.getSerialNumber()).toUri();
        return ResponseEntity.created(location).build();
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
}
