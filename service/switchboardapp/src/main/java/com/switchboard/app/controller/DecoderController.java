package com.switchboard.app.controller;

import com.switchboard.app.dao.DecoderDaoImpl;
import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.domain.DecoderEntity;
import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.domain.EncoderEntity;
import com.switchboard.app.exceptions.DeviceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class DecoderController {

    @Autowired
    DecoderDaoImpl decoderService;

    @Autowired
    DeviceDaoImpl deviceService;

    @GetMapping("/decoder")
    public List<DecoderEntity> retrieveAllDecoders() {
        return decoderService.getDecoders();
    }

    @GetMapping("/decoder/{serialNumber}")
    public EntityModel<DecoderEntity> retrieveDecoder(@PathVariable @Valid String serialNumber) {

        Optional<DecoderEntity> decoder = decoderService.findDecoder(serialNumber);

        if (!decoder.isPresent()) {
            throw new DeviceNotFoundException("serial number-" + serialNumber + "/Encoder");
        }

        EntityModel<DecoderEntity> resource = EntityModel.of(decoder.get());
        WebMvcLinkBuilder linkto = linkTo(methodOn(this.getClass()).retrieveAllDecoders());
        resource.add(linkto.withRel("all-decoders"));
        return resource;
    }

    @PostMapping("/decoder")
    public ResponseEntity createDecoder(@RequestBody @Valid DecoderEntity decoderEntity) {
        Optional<DeviceEntity> deviceOptional = deviceService.findDevice(decoderEntity.getSerialNumber());
        decoderEntity.setDevice(deviceOptional.get());

        DecoderEntity savedDecoderEntity = decoderService.save(decoderEntity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedDecoderEntity.getSerialNumber()).toUri();

        return ResponseEntity.created(location).build();
    }

}
