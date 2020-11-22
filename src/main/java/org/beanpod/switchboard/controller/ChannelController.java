package org.beanpod.switchboard.controller;

import org.beanpod.switchboard.dao.ChannelDaoImpl;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dto.*;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.dto.mapper.InputChannelMapper;
import org.beanpod.switchboard.dto.mapper.OutputChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/channel")
public class ChannelController {

    static final String DELETE = " deleted";
    @Autowired
    ChannelDaoImpl channelService;
    @Autowired
    DecoderDaoImpl decoderService;
    @Autowired
    EncoderDaoImpl encoderService;

    @Autowired
    ChannelMapper channelMapper;
    @Autowired
    InputChannelMapper inputChannelMapper;
    @Autowired
    OutputChannelMapper outputChannelMapper;

    @GetMapping
    public List<ChannelDTO> retrieveAllChannels() {
        List<ChannelEntity> channelEntities = channelService.getChannels();
        return channelMapper.toChannelDTOs(channelEntities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChannelDTO> retrieveChannel(@PathVariable Long id) {
        return channelService.findChannel(id).
                map(ResponseEntity::ok).
                orElseThrow(() -> new ExceptionType.DeviceNotFoundException(id.toString()));
    }

    @PostMapping
    public ResponseEntity<ChannelDTO> createChannel(@RequestBody ChannelDTO channel) {
        Optional<ChannelDTO> channelLookup = channelService.findChannel(channel.getId());
        if (channelLookup.isPresent()) {
            throw new ExceptionType.DeviceAlreadyExistsException(channel.getId().toString());
        }
        return ResponseEntity.ok(channelService.save(channel));
    }

    @PostMapping("/input/{id}/decoder/{serial}")
    @Transactional
    public ResponseEntity<InputChannelDTO> createInputChannel(@PathVariable Long id, @PathVariable String serial) {
        //TODO change device not found exception to channel not found
        ChannelDTO channelDTO = channelService.findChannel(id).
                orElseThrow(() -> new ExceptionType.DeviceNotFoundException(id.toString()));
        DecoderDTO decoderDTO = decoderService.findDecoder(serial).
                orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serial));
        InputChannelDTO inputChannelDTO = InputChannelDTO.builder()
                .channel(channelDTO)
                .decoder(decoderDTO)
                .build();
        return ResponseEntity.ok(channelService.saveInputChannel(inputChannelDTO));
    }

    @PostMapping("/output/{id}/encoder/{serial}")
    @Transactional
    public ResponseEntity<OutputChannelDTO> createOutputChannel(@PathVariable Long id, @PathVariable String serial) {
        //TODO change device not found exception to channel not found
        ChannelDTO channelDTO = channelService.findChannel(id).
                orElseThrow(() -> new ExceptionType.DeviceNotFoundException(id.toString()));
        EncoderDTO encoderDTO = encoderService.findEncoder(serial).
                orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serial));
        OutputChannelDTO outputChannelDTO = OutputChannelDTO.builder()
                .channel(channelDTO)
                .encoder(encoderDTO)
                .build();
        return ResponseEntity.ok(channelService.saveOutputChannel(outputChannelDTO));
    }

    @DeleteMapping("/output/{id}")
    @Transactional
    public ResponseEntity<String> deleteOutputChannel(@PathVariable Long id){
        Long response = channelService.deleteOutputChannelById(id);
        if (response != 1) {
            throw new ExceptionType.DeviceNotFoundException(id.toString());
        }
        return ResponseEntity.ok("Output Channel with ID " + id + DELETE);
    }

    @DeleteMapping("/input/{id}")
    @Transactional
    public ResponseEntity<String> deleteInputChannel(@PathVariable Long id){
        Long response = channelService.deleteInputChannelById(id);
        if (response != 1) {
            throw new ExceptionType.DeviceNotFoundException(id.toString());
        }
        return ResponseEntity.ok("Input Channel with ID " + id + DELETE);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<String> deleteChannel(@PathVariable Long id) {
        Long response = channelService.deleteChannel(id);
        if (response != 1) {
            throw new ExceptionType.DeviceNotFoundException(id.toString());
        }
        return ResponseEntity.ok("Channel with ID number " + id + DELETE);
    }
}
