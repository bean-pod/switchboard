package org.beanpod.switchboard.dao;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.dto.mapper.StreamStatMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.entity.StreamStatEntity;
import org.beanpod.switchboard.entity.UserEntity;
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
  private final StreamMapper streamMapper;
  private final StreamStatMapper streamStatMapper;

  public StreamEntity updateStream(UserEntity user, StreamDto streamDto) {
    if (!streamRepository
        .existsByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
            user, streamDto.getId(), user, streamDto.getId())) {
      throw new StreamDoesNotExistException(streamDto.getId());
    }
    StreamEntity streamEntity = streamMapper.toEntity(streamDto);
    return streamRepository.save(streamEntity);
  }

  public StreamStatDto updateStreamStat(UserEntity user, StreamStatDto streamStatDto) {
    if (!streamRepository
        .existsByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
            user, streamStatDto.getId(), user, streamStatDto.getId())) {
      throw new StreamDoesNotExistException(streamStatDto.getId());
    }
    Optional<StreamStatDto> streamStat = getStreamStat(user, streamStatDto.getId());
    streamStatMapper.updateStreamStatFromDto(streamStatDto, streamStat.orElse(null));

    return streamStatMapper.toDto(
        streamStatRepository.save(streamStatMapper.toEntity(streamStat.orElse(null))));
  }

  public StreamDto getStreamById(UserEntity user, Long id) {
    StreamEntity streamEntity =
        streamRepository
            .findByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
                user, id, user, id);
    return streamMapper.toDto(streamEntity);
  }

  public Long deleteStream(UserEntity user, Long id) {
    return streamRepository
        .deleteByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
            user, id, user, id);
  }

  public Optional<StreamStatDto> getStreamStat(UserEntity user, Long id) {
    return streamStatRepository
        .findByStreamInputChannelDecoderDeviceUserAndIdOrStreamOutputChannelEncoderDeviceUserAndId(
            user, id, user, id)
        .map(streamStatMapper::toDto);
  }

  public List<StreamStatDto> getStreamStats(UserEntity user) {
    List<StreamStatEntity> streamStats =
        streamStatRepository
            .findByStreamInputChannelDecoderDeviceUserOrStreamOutputChannelEncoderDeviceUser(
                user, user);
    return streamStatMapper.toDtos(streamStats);
  }

  public List<StreamDto> getEncoderStreams(UserEntity user, String encoderSerialNumber) {
    List<StreamEntity> streamEntities =
        streamRepository.findByOutputChannelEncoderDeviceUserAndOutputChannelEncoderSerialNumber(
            user, encoderSerialNumber);
    return streamMapper.toDtos(streamEntities);
  }

  public List<StreamDto> getDecoderStreams(UserEntity user, String decoderSerialNumber) {
    List<StreamEntity> streamEntities =
        streamRepository.findByInputChannelDecoderDeviceUserAndInputChannelDecoderSerialNumber(
            user, decoderSerialNumber);
    return streamMapper.toDtos(streamEntities);
  }

  public List<Long> getStreams(UserEntity user) {
    return streamRepository
        .findByInputChannelDecoderDeviceUserOrOutputChannelEncoderDeviceUser(user, user)
        .stream()
        .map(StreamEntity::getId)
        .collect(Collectors.toList());
  }

  public StreamDto saveCreateStream(StreamDto streamDto) {
    long inputChannelId = streamDto.getInputChannel().getId();
    long outputChannelId = streamDto.getOutputChannel().getId();
    if (streamRepository.existsByInputChannelIdAndOutputChannelId(
        inputChannelId, outputChannelId)) {
      throw new StreamAlreadyExistsException(inputChannelId, outputChannelId);
    }

    StreamEntity streamEntity = streamMapper.toEntity(streamDto);
    StreamDto streamDto1 = streamMapper.toDto(streamRepository.save(streamEntity));

    // Save an empty stream stat when saving a stream
    if (streamDto.getStreamStat() == null) {
      StreamStatEntity streamStatBuild =
          StreamStatEntity.builder().stream(streamMapper.toEntity(streamDto1))
              .id(streamDto1.getId())
              .build();
      streamStatRepository.save(streamStatBuild);
      streamDto1.setStreamStat(streamStatMapper.toDto(streamStatBuild));
    }

    return streamDto1;
  }
}
