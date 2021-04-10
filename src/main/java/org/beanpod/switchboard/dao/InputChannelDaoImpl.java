package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.mapper.InputChannelMapper;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.repository.InputChannelRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InputChannelDaoImpl {
  private final InputChannelRepository inputChannelRepository;
  private final InputChannelMapper inputChannelMapper;

  public InputChannelDto saveInputChannel(InputChannelDto inputChannelDto) {
    return inputChannelMapper.toInputChannelDto(
        inputChannelRepository.save(inputChannelMapper.toInputChannelEntity(inputChannelDto)));
  }

  public InputChannelDto getInputChannelById(Long id) {
    InputChannelEntity inputChannelEntity = inputChannelRepository.getOne(id);
    return inputChannelMapper.toInputChannelDto(inputChannelEntity);
  }

  public Long deleteInputChannelById(UserEntity user, Long id) {
    return inputChannelRepository.deleteInputChannelEntityByDecoderDeviceUserAndId(user, id);
  }
}