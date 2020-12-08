package org.beanpod.switchboard.dao;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.exceptions.ExceptionType.StreamAlreadyExistsException;
import org.beanpod.switchboard.exceptions.ExceptionType.StreamDoesNotExistException;
import org.beanpod.switchboard.repository.StreamRepository;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class StreamDaoImpl {
  private final StreamRepository streamRepository;
  private final StreamMapper mapper;
  private final ChannelDaoImpl channelService;

  public List<Long> getStreams() {
    return streamRepository.getAllId();
  }

  public StreamDto getStreamById(Long id) {
    StreamEntity streamEntity = streamRepository.getOne(id);
    return mapper.toDto(streamEntity);
  }

  public StreamDto saveStream(StreamDto streamDto) {
    long inputChannelId = streamDto.getInputChannel().getId();
    long outputChannelId = streamDto.getOutputChannel().getId();
    if (streamRepository.existsDuplicate(inputChannelId, outputChannelId)) {
      throw new StreamAlreadyExistsException(inputChannelId, outputChannelId);
    }

    StreamEntity streamEntity = mapper.toEntity(streamDto);
    return mapper.toDto(streamRepository.save(streamEntity));
  }

  public void deleteStream(Long id) {
    streamRepository.deleteById(id);
  }

  public void updateStream(StreamDto streamDto) {
    if (!streamRepository.existsById(streamDto.getId())) {
      throw new StreamDoesNotExistException(streamDto.getId());
    }
    StreamEntity streamEntity = mapper.toEntity(streamDto);
    streamRepository.save(streamEntity);
  }

  public List<StreamDto> getEncoderStreams(String encoderSerialNumber) {
    List<StreamEntity> streamEntities = streamRepository.getEncoderStreams(encoderSerialNumber);
    return mapper.toDtoList(streamEntities);
  }

  public List<StreamDto> getDecoderStreams(String decoderSerialNumber) {
    List<StreamEntity> streamEntities = streamRepository.getDecoderStreams(decoderSerialNumber);
    return mapper.toDtoList(streamEntities);
  }
}
