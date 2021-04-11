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
    return inputChannelMapper.toDto(
        inputChannelRepository.save(inputChannelMapper.toEntity(inputChannelDto)));
  }

  public InputChannelDto getInputChannelById(UserEntity user, Long id) {
    InputChannelEntity inputChannelEntity =
        inputChannelRepository.findByDecoderDeviceUserAndId(user, id);
    return inputChannelMapper.toDto(inputChannelEntity);
  }

  public Long deleteInputChannelById(UserEntity user, Long id) {
    return inputChannelRepository.deleteByDecoderDeviceUserAndId(user, id);
  }
}
