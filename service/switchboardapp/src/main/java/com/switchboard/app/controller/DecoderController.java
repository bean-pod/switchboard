package com.switchboard.app.controller;

import com.switchboard.app.dao.DecoderDaoImpl;
import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.domain.DecoderEntity;
import com.switchboard.app.domain.DeviceEntity;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@RestController
public class DecoderController {

    @Autowired
    DecoderDaoImpl decoderService;

    @Autowired
    DeviceDaoImpl deviceService;

    @GetMapping("/decoder")
    public List<DecoderEntity> retrieveAllDecoders(){
        return decoderService.getDecoders();
    }

    @PostMapping("/decoder")
    public ResponseEntity createDecoder(@RequestBody @Valid DecoderEntity decoderEntity){
        Optional<DeviceEntity> deviceOptional = deviceService.findDevice(decoderEntity.getSerialNumber());
        decoderEntity.setDevice(deviceOptional.get());

        DecoderEntity savedDecoderEntity = decoderService.save(decoderEntity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedDecoderEntity.getSerialNumber()).toUri();

        return ResponseEntity.created(location).build();
    }

}
