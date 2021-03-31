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
import org.beanpod.switchboard.entity.UserEntity;
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

  // ChannelEntity -----------------------------------------------------------------------------

  public ChannelDto save(ChannelDto channelDto) {
    return channelMapper.toChannelDto(
        channelRepository.save(channelMapper.toChannelEntity(channelDto)));
  }

  // ChannelEntity general data access methods

  public List<ChannelEntity> getChannels() {
    return channelRepository.findAll();
  }

  public Optional<ChannelDto> findChannel(Long id) {
    return channelRepository.findChannelEntitiesById(id).map(channelMapper::toChannelDto);
  }

  public Long deleteChannel(Long id) {
    return channelRepository.deleteChannelEntitiesById(id);
  }

  // ChannelEntity ownership data access methods


  // InputChannelEntity ------------------------------------------------------------------------

  public InputChannelDto saveInputChannel(InputChannelDto inputChannelDto) {
    return inputChannelMapper.toInputChannelDto(
        inputChannelRepository.save(inputChannelMapper.toInputChannelEntity(inputChannelDto)));
  }

  public InputChannelDto getInputChannelById(Long id) {
    InputChannelEntity inputChannelEntity = inputChannelRepository.getOne(id);
    return inputChannelMapper.toInputChannelDto(inputChannelEntity);
  }

  //  InputChannelEntity general data access methods
  //
  //  public Long deleteOutputChannelById(Long id) {
  //    return outputChannelRepository.deleteOutputChannelEntitiesById(id);
  //  }

  // InputChannelEntity ownership data access methods

  public Long deleteOutputChannelById(UserEntity user, Long id) {
    return outputChannelRepository.deleteOutputChannelEntitiesByEncoderDeviceUserAndId(user, id);
  }

  // OutputChannelEntity -----------------------------------------------------------------------

  public OutputChannelDto saveOutputChannel(OutputChannelDto outputChannelDto) {
    return outputChannelMapper.toOutputChannelDto(
        outputChannelRepository.save(outputChannelMapper.toOutputChannelEntity(outputChannelDto)));
  }

  public OutputChannelDto getOutputChannelById(Long id) {
    OutputChannelEntity outputChannelEntity = outputChannelRepository.getOne(id);
    return outputChannelMapper.toOutputChannelDto(outputChannelEntity);
  }

  //  OutputChannelEntity general data access methods
  //
  //  public Long deleteInputChannelById(Long id) {
  //    return inputChannelRepository.deleteInputChannelEntityById(id);
  //  }

  // OutputChannelEntity ownership data access methods

  public Long deleteInputChannelById(UserEntity user, Long id) {
    return inputChannelRepository.deleteInputChannelEntityByDecoderDeviceUserAndId(user, id);
  }
}
