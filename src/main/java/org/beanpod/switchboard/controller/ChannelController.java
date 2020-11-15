package org.beanpod.switchboard.controller;

import org.beanpod.switchboard.dao.ChannelDaoImpl;
import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
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

    @Autowired
    ChannelDaoImpl channelService;

    @Autowired
    ChannelMapper channelMapper;

    @GetMapping
    public List<ChannelDTO> retrieveAllChannels(){
        List<ChannelEntity> channelEntities = channelService.getChannels();
        return  channelMapper.toChannelDTOs(channelEntities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChannelDTO> retrieveChannel(@PathVariable Long id){
        Optional<ChannelEntity> channelEntity = channelService.findChannel(id);
        if(channelEntity.isEmpty()){
            throw new ExceptionType.DeviceNotFoundException(id.toString());
        }
        return ResponseEntity.ok(channelMapper.toChannelDTO(channelEntity.get()));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<String> deleteChannel(@PathVariable Long id){
        Long response = channelService.deleteChannel(id);
        if (response != 1) {
            throw new ExceptionType.DeviceNotFoundException(id.toString());
        }
        return ResponseEntity.ok("Device with serial number " + id + " Deleted");
    }


    @PostMapping
    public ResponseEntity createChannel(@RequestBody ChannelEntity channel){
        Optional<ChannelEntity> channelLookup = channelService.findChannel(channel.getId());
        if(channelLookup.isPresent()){
            throw new ExceptionType.DeviceAlreadyExistsException(channel.getId().toString());
        }
        channelService.save(channel);
        return ResponseEntity.ok(channelMapper.toChannelDTO(channel));
    }


}
