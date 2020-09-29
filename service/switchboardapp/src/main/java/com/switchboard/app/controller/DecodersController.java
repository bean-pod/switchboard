package com.switchboard.app.controller;

import com.switchboard.app.dao.impl.DecoderDaoImpl;
import com.switchboard.app.dao.impl.DeviceDaoImpl;
import com.switchboard.app.domain.Decoder;
import com.switchboard.app.domain.Device;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

public class DecodersController{

    @Autowired
    DecoderDaoImpl service;

    @PostMapping("/Encoder")
    public ResponseEntity createDevice(@RequestBody @Valid Decoder decoder){

        Decoder savedDecoder = service.addDecoder(decoder);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedDecoder.getSerialNumber()).toUri();
        return ResponseEntity.created(location).build();
    }

}
