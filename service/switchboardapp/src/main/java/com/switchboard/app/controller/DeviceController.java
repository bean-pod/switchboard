package com.switchboard.app.controller;

import com.switchboard.app.dao.impl.DeviceDaoImpl;
import com.switchboard.app.domain.Device;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.swing.text.html.parser.Entity;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class DeviceController {

    @Autowired
    DeviceDaoImpl service;


    @PostMapping("/device")
    public ResponseEntity createDevice(@RequestBody @Valid Device device){

        Device savedDevice = service.addDevice(device);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedDevice.getSerialNumber()).toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/device")
    public List<Device> retrieveAllDevices(){
        return service.getDevices();
    }

    @GetMapping("/device/{serialNumber}")
    public EntityModel<Device> retrieveDevice(@PathVariable long serialNumber){

        Optional<Device> device =service.findDevice(serialNumber);
        if(!device.isPresent()){
            throw new DeviceNotFoundException("serial number-"+serialNumber);
        }
        EntityModel<Device> resource = EntityModel.of(device.get());
        WebMvcLinkBuilder linkto = linkto(methodOn(this.getClass()))
    }

}
