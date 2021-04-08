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
    return outputChannelMapper.toOutputChannelDto(
        outputChannelRepository.save(outputChannelMapper.toOutputChannelEntity(outputChannelDto)));
  }

  public OutputChannelDto getOutputChannelById(Long id) {
    OutputChannelEntity outputChannelEntity = outputChannelRepository.getOne(id);
    return outputChannelMapper.toOutputChannelDto(outputChannelEntity);
  }

  public Long deleteOutputChannelById(UserEntity user, Long id) {
    return outputChannelRepository.deleteOutputChannelEntityByEncoderDeviceUserAndId(user, id);
  }
}
