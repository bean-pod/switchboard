package org.beanpod.switchboard.controller;

import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
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

    @Autowired
    DecoderMapper decoderMapper;

    @GetMapping
    public List<DecoderDTO> retrieveAllDecoders() {
        return decoderMapper.toDecoderDTOs(decoderService.getDecoders());
    }

    @GetMapping("/{serialNumber}")
    public ResponseEntity<EntityModel<DecoderDTO>> retrieveDecoder(@PathVariable @Valid String serialNumber) {

        Optional<DecoderEntity> decoder = decoderService.findDecoder(serialNumber);

        if (decoder.isEmpty()) {
            throw new ExceptionType.DeviceNotFoundException(serialNumber + "/Decoder");
        }

        EntityModel<DecoderDTO> resource = EntityModel.of(decoderMapper.toDecoderDTO(decoder.get()));
        WebMvcLinkBuilder linkTo = linkTo(methodOn(this.getClass()).retrieveAllDecoders());
        resource.add(linkTo.withRel("all-decoders"));
        return ResponseEntity.ok(resource);
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
