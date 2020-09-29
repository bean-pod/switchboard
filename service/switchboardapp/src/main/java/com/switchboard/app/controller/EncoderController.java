package com.switchboard.app.controller;
import com.switchboard.app.dao.impl.EncoderDaoImpl;
import com.switchboard.app.domain.Decoder;
import com.switchboard.app.domain.Device;
import com.switchboard.app.domain.Encoder;
import com.switchboard.app.repository.DecoderRepository;
import com.switchboard.app.repository.EncoderRepository;
import org.openapitools.model.CreateEncoderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
public class EncoderController {

    @Autowired
    EncoderDaoImpl service;

    @GetMapping("/encoder")
    public List<Encoder> retrieveAllEncoders(){
        return service.getEncoders();
    }

    @PostMapping("/encoder")
    public ResponseEntity createEncoder(@RequestBody @Valid Encoder encoder){

        Encoder savedEncoder = service.addEncoder(encoder);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedEncoder.getSerialNumber()).toUri();
        return ResponseEntity.created(location).build();
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
