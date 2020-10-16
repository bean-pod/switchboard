package com.switchboard.app.controller;

import com.switchboard.app.dao.DecoderDaoImpl;
import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.entity.DecoderEntity;
import com.switchboard.app.entity.DeviceEntity;
import com.switchboard.app.exceptions.ExceptionType;
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
@RequestMapping("/decoder")
public class DecoderController {

    @Autowired
    DecoderDaoImpl decoderService;

    @Autowired
    DeviceDaoImpl deviceService;

    @GetMapping
    public List<DecoderEntity> retrieveAllDecoders() {
        return decoderService.getDecoders();
    }

    @GetMapping("/{serialNumber}")
    public EntityModel<DecoderEntity> retrieveDecoder(@PathVariable @Valid String serialNumber) {

        Optional<DecoderEntity> decoder = decoderService.findDecoder(serialNumber);

        if (decoder.isEmpty()) {
            throw new ExceptionType.DeviceNotFoundException(serialNumber + "/Decoder");
        }

        EntityModel<DecoderEntity> resource = EntityModel.of(decoder.get());
        WebMvcLinkBuilder linkTo = linkTo(methodOn(this.getClass()).retrieveAllDecoders());
        resource.add(linkTo.withRel("all-decoders"));
        return resource;
    }

    @PostMapping
    public ResponseEntity createDecoder(@RequestBody @Valid DecoderEntity decoderEntity) {
        Optional<DeviceEntity> deviceOptional = deviceService.findDevice(decoderEntity.getSerialNumber());

        if (deviceOptional.isEmpty()) {
            throw new ExceptionType.DeviceNotFoundException(decoderEntity.getSerialNumber() + "/Decoder");
        }

        decoderEntity.setDevice(deviceOptional.get());
        DecoderEntity savedDecoderEntity = decoderService.save(decoderEntity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedDecoderEntity.getSerialNumber()).toUri();

        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{serialNumber}")
    @Transactional
    public ResponseEntity<String> deleteDecoder(@PathVariable String serialNumber) {
        Long response = decoderService.deleteDecoder(serialNumber);
        if (response != 1) {
            throw new ExceptionType.DeviceNotFoundException(serialNumber);
        }
        return ResponseEntity.ok("Decoder with serial number " + serialNumber + " Deleted");
    }
}
