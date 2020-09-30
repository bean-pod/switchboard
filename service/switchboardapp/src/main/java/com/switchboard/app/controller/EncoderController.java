package com.switchboard.app.controller;
import com.switchboard.app.dao.impl.DeviceDaoImpl;
import com.switchboard.app.dao.impl.EncoderDaoImpl;
import com.switchboard.app.domain.Device;
import com.switchboard.app.domain.Encoder;
import com.switchboard.app.exceptions.DeviceNotFoundException;
import com.switchboard.app.repository.DecoderRepository;
import com.switchboard.app.repository.EncoderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class EncoderController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    EncoderDaoImpl encoderService;
//
    @Autowired
   EncoderRepository encoderRepository;

    @Autowired
    DeviceDaoImpl deviceService;

    @GetMapping("/encoder")
    public List<Encoder> retrieveAllEncoders(){
        return encoderService.getEncoders();
    }

    @PostMapping("/encoder")
    public ResponseEntity createEncoder(@RequestBody Encoder encoder){

        Optional<Device> deviceOptional= deviceService.findDevice(encoder.getSerialNumber());
        if(!deviceOptional.isPresent()){
            throw new DeviceNotFoundException("serial number-"+encoder.getSerialNumber());
        }
        Device device = deviceOptional.get();
        //System.out.println(device);
        encoder.setDevice(device);
        System.out.println(encoder);
        //logger.info("This is the device->{}",device.getSerialNumber());
        Encoder savedEncoder = encoderService.addEncoder(encoder);
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
//                path("/{serialNumber}").buildAndExpand(savedEncoder.getSerialNumber()).toUri();
//        return ResponseEntity.created(location).build();
        return new ResponseEntity("Hello", HttpStatus.CREATED);
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
