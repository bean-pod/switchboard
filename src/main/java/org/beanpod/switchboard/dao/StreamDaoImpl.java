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
import org.beanpod.switchboard.entity.StreamEntity.StreamIdProjection;
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
        .existsStreamEntityByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
            user, streamDto.getId(), user, streamDto.getId())) {
      throw new StreamDoesNotExistException(streamDto.getId());
    }
    StreamEntity streamEntity = streamMapper.toStreamEntity(streamDto);
    return streamRepository.save(streamEntity);
  }

  public StreamStatDto updateStreamStat(UserEntity user, StreamStatDto streamStatDto) {
    if (!streamRepository
        .existsStreamEntityByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
            user, streamStatDto.getId(), user, streamStatDto.getId())) {
      throw new StreamDoesNotExistException(streamStatDto.getId());
    }
    Optional<StreamStatDto> streamStat = getStreamStat(user, streamStatDto.getId());
    streamStatMapper.updateStreamStatFromDto(streamStatDto, streamStat.orElse(null));

    return streamStatMapper.toStreamStatDto(
        streamStatRepository.save(streamStatMapper.toStreamStatEntity(streamStat.orElse(null))));
  }

  public StreamDto getStreamById(UserEntity user, Long id) {
    StreamEntity streamEntity =
        streamRepository
            .findStreamEntityByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
                user, id, user, id);
    return streamMapper.toStreamDto(streamEntity);
  }

  public Long deleteStream(UserEntity user, Long id) {
    return streamRepository
        .deleteStreamEntityByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
            user, id, user, id);
  }

  public Optional<StreamStatDto> getStreamStat(UserEntity user, Long id) {
    return streamStatRepository
        .findStreamStatEntityByStreamInputChannelDecoderDeviceUserAndIdOrStreamOutputChannelEncoderDeviceUserAndId(
            user, id, user, id)
        .map(streamStatMapper::toStreamStatDto);
  }

  public List<StreamStatDto> getStreamStats(UserEntity user) {
    List<StreamStatEntity> streamStats =
        streamStatRepository
            .findStreamStatEntitiesByStreamInputChannelDecoderDeviceUserOrStreamOutputChannelEncoderDeviceUser(
                user, user);
    return streamStatMapper.toStreamStatDtoList(streamStats);
  }

  public List<StreamDto> getEncoderStreams(UserEntity user, String encoderSerialNumber) {
    List<StreamEntity> streamEntities =
        streamRepository
            .findStreamEntitiesByOutputChannelEncoderDeviceUserAndOutputChannelEncoderSerialNumber(
                user, encoderSerialNumber);
    return streamMapper.toStreamDtos(streamEntities);
  }

  public List<StreamDto> getDecoderStreams(UserEntity user, String decoderSerialNumber) {
    List<StreamEntity> streamEntities =
        streamRepository
            .findStreamEntitiesByInputChannelDecoderDeviceUserAndInputChannelDecoderSerialNumber(
                user, decoderSerialNumber);
    return streamMapper.toStreamDtos(streamEntities);
  }

  public List<Long> getStreams(UserEntity user) {
    return streamRepository
        .findStreamIdsByInputChannelDecoderDeviceUserOrOutputChannelEncoderDeviceUser(user, user)
        .stream()
        .map(StreamIdProjection::getId)
        .collect(Collectors.toList());
  }

  public StreamDto saveCreateStream(StreamDto streamDto) {
    long inputChannelId = streamDto.getInputChannel().getId();
    long outputChannelId = streamDto.getOutputChannel().getId();
    if (streamRepository.existsStreamEntityByInputChannelIdAndOutputChannelId(
        inputChannelId, outputChannelId)) {
      throw new StreamAlreadyExistsException(inputChannelId, outputChannelId);
    }

    StreamEntity streamEntity = streamMapper.toStreamEntity(streamDto);
    StreamDto streamDto1 = streamMapper.toStreamDto(streamRepository.save(streamEntity));

    // Save an empty stream stat when saving a stream
    if (streamDto.getStreamStat() == null) {
      StreamStatEntity streamStatBuild =
          StreamStatEntity.builder().stream(streamMapper.toStreamEntity(streamDto1))
              .id(streamDto1.getId())
              .build();
      streamStatRepository.save(streamStatBuild);
      streamDto1.setStreamStat(streamStatMapper.toStreamStatDto(streamStatBuild));
    }

    return streamDto1;
  }
}
