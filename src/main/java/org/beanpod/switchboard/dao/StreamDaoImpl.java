package org.beanpod.switchboard.dao;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.repository.StreamRepository;
import org.openapitools.model.CreateStreamRequest;
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

  public void createStream(CreateStreamRequest createStreamRequest) {
    InputChannelDto inputChannelDto =
        channelService.getInputChannelById(createStreamRequest.getInputChannelId());
    OutputChannelDto outputChannelDto =
        channelService.getOutputChannelById(createStreamRequest.getOutputChannelId());
    StreamDto streamDto =
        StreamDto.builder().inputChannel(inputChannelDto).outputChannel(outputChannelDto).build();
    StreamEntity streamEntity = mapper.toEntity(streamDto);
    if (streamRepository.existsDuplicate(
        createStreamRequest.getInputChannelId(), createStreamRequest.getOutputChannelId())) {
      throw new ExceptionType.StreamAlreadyExistsException(
          createStreamRequest.getInputChannelId(), createStreamRequest.getOutputChannelId());
    }
    streamRepository.save(streamEntity);
  }

  public void deleteStream(Long id) {
    streamRepository.deleteById(id);
  }

  public void updateStream(StreamDto streamDto) {
    if (!streamRepository.existsById(streamDto.getId())) {
      throw new ExceptionType.StreamDoesNotExistException(streamDto.getId());
    }
    StreamEntity streamEntity = mapper.toEntity(streamDto);
    streamRepository.save(streamEntity);
  }

  public List<StreamDto> getEncoderStreams(String encoderSerialNumber) {
    List<StreamEntity> streamEntities = streamRepository.getEncoderStreams(encoderSerialNumber);
    List<StreamDto> streamDtos = mapper.toDto(streamEntities);
    return streamDtos;
  }

  public List<StreamDto> getDecoderStreams(String decoderSerialNumber) {
    List<StreamEntity> streamEntities = streamRepository.getDecoderStreams(decoderSerialNumber);
    List<StreamDto> streamDtos = mapper.toDto(streamEntities);
    return streamDtos;
  }
}
