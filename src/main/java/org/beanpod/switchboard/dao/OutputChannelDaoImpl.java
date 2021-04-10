package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.mapper.OutputChannelMapper;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.repository.OutputChannelRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OutputChannelDaoImpl {

  private final OutputChannelRepository outputChannelRepository;
  private final OutputChannelMapper outputChannelMapper;

  public OutputChannelDto saveOutputChannel(OutputChannelDto outputChannelDto) {
    return outputChannelMapper.toDto(
        outputChannelRepository.save(outputChannelMapper.toEntity(outputChannelDto)));
  }

  public OutputChannelDto getOutputChannelById(UserEntity user, Long id) {
    OutputChannelEntity outputChannelEntity =
        outputChannelRepository.findByEncoderDeviceUserAndId(user, id);
    return outputChannelMapper.toDto(outputChannelEntity);
  }

  public Long deleteOutputChannelById(UserEntity user, Long id) {
    return outputChannelRepository.deleteByEncoderDeviceUserAndId(user, id);
  }
}
