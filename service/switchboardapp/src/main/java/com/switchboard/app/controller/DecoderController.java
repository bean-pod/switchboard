package com.switchboard.app.controller;

import com.switchboard.app.dao.DecoderDaoImpl;
import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.domain.Decoder;
import com.switchboard.app.domain.Device;
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
    public List<Decoder> retrieveAllDecoders(){
        return decoderService.getDecoders();
    }

    @PostMapping("/decoder")
    public ResponseEntity createDecoder(@RequestBody @Valid Decoder decoder){
        Optional<Device> deviceOptional = deviceService.findDevice(decoder.getSerialNumber());
        decoder.setDevice(deviceOptional.get());

        Decoder savedDecoder = decoderService.save(decoder);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedDecoder.getSerialNumber()).toUri();

        return ResponseEntity.created(location).build();
    }

}
