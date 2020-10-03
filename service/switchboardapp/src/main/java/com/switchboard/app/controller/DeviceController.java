package com.switchboard.app.controller;

import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.exceptions.DeviceAlreadyExistsException;
import com.switchboard.app.exceptions.DeviceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class DeviceController {

    @Autowired
    DeviceDaoImpl service;

    @GetMapping("/device")
    public List<DeviceEntity> retrieveAllDevices(){
        return service.getDevices();
    }

    @GetMapping("/device/{serialNumber}")
    public EntityModel<DeviceEntity> retrieveDevice(@PathVariable @Valid String serialNumber){

        Optional<DeviceEntity> device =service.findDevice(serialNumber);
        if(!device.isPresent()){
            throw new DeviceNotFoundException("serial number-"+serialNumber);
        }

        EntityModel<DeviceEntity> resource = EntityModel.of(device.get());
        WebMvcLinkBuilder linkto = linkTo(methodOn(this.getClass()).retrieveAllDevices());
        resource.add(linkto.withRel("all-devices"));
        return resource;
    }

    @PostMapping("/device")
    public ResponseEntity createDevice(@RequestBody @Valid DeviceEntity device){

        Optional<DeviceEntity> deviceLookup = service.findDevice(device.getSerialNumber());
        if(deviceLookup.isPresent()){
            throw new DeviceAlreadyExistsException("serial number-"+device.getSerialNumber());
        }
        DeviceEntity savedDevice = service.save(device);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedDevice.getSerialNumber()).toUri();
        return ResponseEntity.created(location).build();
    }

}
