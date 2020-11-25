package org.beanpod.switchboard.dao;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.ChannelDto;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.dto.mapper.InputChannelMapper;
import org.beanpod.switchboard.dto.mapper.OutputChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.beanpod.switchboard.repository.ChannelRepository;
import org.beanpod.switchboard.repository.InputChannelRepository;
import org.beanpod.switchboard.repository.OutputChannelRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelDaoImpl {

  private final ChannelRepository channelRepository;
  private final ChannelMapper channelMapper;
  private final InputChannelRepository inputChannelRepository;
  private final InputChannelMapper inputChannelMapper;
  private final OutputChannelRepository outputChannelRepository;
  private final OutputChannelMapper outputChannelMapper;

  public List<ChannelEntity> getChannels() {
    return channelRepository.findAll();
  }

  public Optional<ChannelDto> findChannel(Long id) {
    return channelRepository.findChannelEntitiesById(id).map(channelMapper::toChannelDto);
  }

  public Long deleteChannel(Long id) {
    return channelRepository.deleteChannelEntitiesById(id);
  }

  public ChannelDto save(ChannelDto channelDto) {
    return channelMapper.toChannelDto(
        channelRepository.save(channelMapper.toChannelEntity(channelDto)));
  }

  public InputChannelDto saveInputChannel(InputChannelDto inputChannelDto) {
    return inputChannelMapper.toInputChannelDto(
        inputChannelRepository.save(inputChannelMapper.toInputChannelEntity(inputChannelDto)));
  }

  public OutputChannelDto saveOutputChannel(OutputChannelDto outputChannelDto) {
    return outputChannelMapper.toOutputChannelDto(
        outputChannelRepository.save(outputChannelMapper.toOutputChannelEntity(outputChannelDto)));
  }

  public InputChannelDto getInputChannelById(Long id) {
    InputChannelEntity inputChannelEntity = inputChannelRepository.getOne(id);
    return inputChannelMapper.toInputChannelDto(inputChannelEntity);
  }

  public OutputChannelDto getOutputChannelById(Long id) {
    OutputChannelEntity outputChannelEntity = outputChannelRepository.getOne(id);
    return outputChannelMapper.toOutputChannelDto(outputChannelEntity);
  }

  public Long deleteOutputChannelById(Long id) {
    return outputChannelRepository.deleteOutputChannelEntitiesById(id);
  }

  public Long deleteInputChannelById(Long id) {
    return inputChannelRepository.deleteInputChannelEntityById(id);
  }
}
