package org.beanpod.switchboard.dao;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.dto.mapper.StreamStatMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.entity.StreamStatEntity;
import org.beanpod.switchboard.exceptions.ExceptionType.StreamAlreadyExistsException;
import org.beanpod.switchboard.exceptions.ExceptionType.StreamDoesNotExistException;
import org.beanpod.switchboard.repository.StreamRepository;
import org.beanpod.switchboard.repository.StreamStatRepository;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class StreamDaoImpl {

  private final StreamRepository streamRepository;
  private final StreamStatRepository streamStatRepository;
  private final StreamMapper mapper;
  private final StreamStatMapper statMapper;

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
    StreamDto streamDto1 = mapper.toDto(streamRepository.save(streamEntity));

    //Save an empty stream stat when saving a stream
    if(streamDto.getStreamStat() == null){
      StreamStatEntity streamStatBuild = StreamStatEntity.builder().stream(mapper.toEntity(streamDto1))
          .id(streamDto1.getId()).build();
      streamStatRepository.save(streamStatBuild);
      streamDto1.setStreamStat(statMapper.toDto(streamStatBuild));
    }

    return streamDto1;
  }

  public void deleteStream(Long id) {
    streamRepository.deleteById(id);
  }

  public StreamEntity updateStream(StreamDto streamDto) {
    if (!streamRepository.existsById(streamDto.getId())) {
      throw new StreamDoesNotExistException(streamDto.getId());
    }
    StreamEntity streamEntity = mapper.toEntity(streamDto);
    return streamRepository.save(streamEntity);
  }

  public List<StreamDto> getEncoderStreams(String encoderSerialNumber) {
    List<StreamEntity> streamEntities = streamRepository.getEncoderStreams(encoderSerialNumber);
    return mapper.toDtoList(streamEntities);
  }

  public List<StreamDto> getDecoderStreams(String decoderSerialNumber) {
    List<StreamEntity> streamEntities = streamRepository.getDecoderStreams(decoderSerialNumber);
    return mapper.toDtoList(streamEntities);
  }

  public StreamStatDto updateStreamStat(StreamStatDto streamStatDto) {
    if (!streamRepository.existsById(streamStatDto.getId())) {
      throw new StreamDoesNotExistException(streamStatDto.getId());
    }
    Optional<StreamStatDto> streamStat = findDevice(streamStatDto.getId());
    statMapper.updateStreamStatFromDto(streamStatDto, streamStat.orElse(null));

  return statMapper.toDto(
        streamStatRepository.save(statMapper.toEntity(streamStat.orElse(null))));
  }

  public Optional<StreamStatDto> findDevice(Long id) {
    return streamStatRepository.findStreamStatEntityById(id).map(statMapper::toDto);
  }

  public List<StreamStatDto> getStreamStats() {
    List<StreamStatEntity> streamStats = streamStatRepository.findAll();
    return statMapper.toDtoList(streamStats);
  }
}
