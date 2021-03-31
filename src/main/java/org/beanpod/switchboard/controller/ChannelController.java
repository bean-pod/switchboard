package org.beanpod.switchboard.controller;

import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.ChannelDaoImpl;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.ChannelDto;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/channel")
@RequiredArgsConstructor
public class ChannelController {

  static final String DELETE = " deleted";
  private final UserDaoImpl userDao;
  private final ChannelDaoImpl channelDao;
  private final DecoderDaoImpl decoderDao;
  private final EncoderDaoImpl encoderDao;
  private final ChannelMapper channelMapper;
  private final HttpServletRequest request;

  @GetMapping
  public List<ChannelDto> retrieveAllChannels() {
    List<ChannelEntity> channelEntities = channelDao.getChannels();
    return channelMapper.toChannelDtos(channelEntities);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ChannelDto> retrieveChannel(@PathVariable Long id) {
    return channelDao
        .findChannel(id)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(id.toString()));
  }

  @PostMapping
  public ResponseEntity<ChannelDto> createChannel(@RequestBody ChannelDto channel) {
    Optional<ChannelDto> channelLookup = channelDao.findChannel(channel.getId());
    if (channelLookup.isPresent()) {
      throw new ExceptionType.DeviceAlreadyExistsException(channel.getId().toString());
    }
    return ResponseEntity.ok(channelDao.save(channel));
  }

  @PostMapping("/input/{id}/decoder/{serial}")
  @Transactional
  public ResponseEntity<InputChannelDto> createInputChannel(
      @PathVariable Long id, @PathVariable String serial) {
    // TODO change device not found exception to channel not found
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());
    ChannelDto channelDto =
        channelDao
            .findChannel(id)
            .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(id.toString()));
    DecoderDto decoderDto =
        decoderDao
            .findDecoder(user, serial)
            .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serial));
    InputChannelDto inputChannelDto =
        InputChannelDto.builder().channel(channelDto).decoder(decoderDto).build();
    return ResponseEntity.ok(channelDao.saveInputChannel(inputChannelDto));
  }

  @PostMapping("/output/{id}/encoder/{serial}")
  @Transactional
  public ResponseEntity<OutputChannelDto> createOutputChannel(
      @PathVariable Long id, @PathVariable String serial) {
    // TODO change device not found exception to channel not found
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());
    ChannelDto channelDto =
        channelDao
            .findChannel(id)
            .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(id.toString()));
    EncoderDto encoderDto =
        encoderDao
            .findEncoder(user, serial)
            .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serial));
    OutputChannelDto outputChannelDto =
        OutputChannelDto.builder().channel(channelDto).encoder(encoderDto).build();
    return ResponseEntity.ok(channelDao.saveOutputChannel(outputChannelDto));
  }

  @DeleteMapping("/output/{id}")
  @Transactional
  public ResponseEntity<String> deleteOutputChannel(@PathVariable Long id) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Long response = channelDao.deleteOutputChannelById(user, id);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(id.toString());
    }
    return ResponseEntity.ok("Output Channel with ID " + id + DELETE);
  }

  @DeleteMapping("/input/{id}")
  @Transactional
  public ResponseEntity<String> deleteInputChannel(@PathVariable Long id) {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());

    Long response = channelDao.deleteInputChannelById(user, id);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(id.toString());
    }
    return ResponseEntity.ok("Input Channel with ID " + id + DELETE);
  }

  @DeleteMapping("/{id}")
  @Transactional
  public ResponseEntity<String> deleteChannel(@PathVariable Long id) {
    Long response = channelDao.deleteChannel(id);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(id.toString());
    }
    return ResponseEntity.ok("Channel with ID number " + id + DELETE);
  }
}
