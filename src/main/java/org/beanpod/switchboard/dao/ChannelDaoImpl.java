package org.beanpod.switchboard.dao;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.ChannelDto;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.repository.ChannelRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelDaoImpl {

  private final ChannelRepository channelRepository;
  private final ChannelMapper channelMapper;

  public ChannelDto save(ChannelDto channelDto) {
    return channelMapper.toChannelDto(
        channelRepository.save(channelMapper.toChannelEntity(channelDto)));
  }

  public List<ChannelEntity> getChannels() {
    return channelRepository.findAll();
  }

  public Optional<ChannelDto> findChannel(Long id) {
    return channelRepository.findChannelEntityById(id).map(channelMapper::toChannelDto);
  }

  public Long deleteChannel(Long id) {
    return channelRepository.deleteChannelEntityById(id);
  }
}
