package com.switchboard.app.controller;
import com.switchboard.app.dao.impl.EncoderDaoImpl;
import com.switchboard.app.domain.Device;
import com.switchboard.app.domain.Encoder;
import com.switchboard.app.repository.EncoderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
public class EncoderController {

    @Autowired
    EncoderDaoImpl service;
//
    @Autowired
   EncoderRepository encoderRepository;

    @GetMapping("/encoder")
    public List<Encoder> retrieveAllEncoders(){
        return service.getEncoders();
    }

    @PostMapping("/encoder")
    public ResponseEntity createEncoder(@RequestBody @Valid Encoder encoder){

        Device tempDevice = new Device(encoder.getSerialNumber(),"D1","Running",encoder);
        encoder.setDevice(tempDevice);
        System.out.println(encoder.getSerialNumber());
        System.out.println(encoder.getDevice());
        System.out.println(encoder.getDevice().getDisplayName());
      //  encoderRepository.saveAndFlush(encoder);
        Encoder savedEncoder = encoderRepository.save(encoder);

//        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
//                path("/{serialNumber}").buildAndExpand(savedEncoder.getSerialNumber()).toUri();
        return ResponseEntity.ok(HttpStatus.OK);//ResponseEntity.created(location).build();
    }
//    @Override
//    public ResponseEntity<List<String>> getEncoders() {
//        return null;
//    }
//
//    @Override
//    public ResponseEntity<Void> createEncoder(@Valid CreateEncoderRequest createEncoderRequest) {
//        return null;
//    }
//
//    @Override
//    public ResponseEntity<Encoder> getEncoderById(String uuid) {
//        return null;
//    }
//
//    @Override
//    public ResponseEntity<Void> updateEncoder(String uuid, @Valid Encoder encoder) {
//        return null;
//    }
//
//    @Override
//    public ResponseEntity<Void> deleteEncoder(String uuid) {
//        return null;
//    }
}
