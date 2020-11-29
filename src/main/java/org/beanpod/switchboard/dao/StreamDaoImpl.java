package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dto.*;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.repository.StreamRepository;
import org.openapitools.model.CreateStreamRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class StreamDaoImpl {
  public static final String LOOPBACK_IP_V4 = "127.0.0.1";
  public static final String LOOPBACK_IP_V6 = "0:0:0:0:0:0:0:1";
  private final StreamRepository streamRepository;
  private final StreamMapper mapper;
  private final ChannelDaoImpl channelService;

  public List<Long> getStreams() {
    return streamRepository.getAllId();
  }

  public StreamDTO getStreamById(Long id) {
    StreamEntity streamEntity = streamRepository.getOne(id);
    return mapper.toDto(streamEntity);
  }

  public StreamDTO createStream(CreateStreamRequest createStreamRequest) {
    if (streamRepository.existsDuplicate(
        createStreamRequest.getInputChannelId(), createStreamRequest.getOutputChannelId())) {
      throw new ExceptionType.StreamAlreadyExistsException(
          createStreamRequest.getInputChannelId(), createStreamRequest.getOutputChannelId());
    }

    InputChannelDTO inputChannelDto =
        channelService.getInputChannelById(createStreamRequest.getInputChannelId());
    OutputChannelDTO outputChannelDto =
        channelService.getOutputChannelById(createStreamRequest.getOutputChannelId());
    StreamDTO.StreamDTOBuilder streamDtoBuilder =
        StreamDTO.builder().inputChannel(inputChannelDto).outputChannel(outputChannelDto);

    setStreamingMode(inputChannelDto, outputChannelDto, streamDtoBuilder);

    StreamDTO streamDto = streamDtoBuilder.build();
    StreamEntity streamEntity = mapper.toEntity(streamDto);
    return mapper.toDto(streamRepository.save(streamEntity));
  }

  public void deleteStream(Long id) {
    streamRepository.deleteById(id);
  }

  public void updateStream(StreamDTO streamDto) {
    if (!streamRepository.existsById(streamDto.getId())) {
      throw new ExceptionType.StreamDoesNotExistException(streamDto.getId());
    }
    StreamEntity streamEntity = mapper.toEntity(streamDto);
    streamRepository.save(streamEntity);
  }

  private void setStreamingMode(InputChannelDTO inputChannelDto, OutputChannelDTO outputChannelDto, StreamDTO.StreamDTOBuilder streamDtoBuilder) {
    if (onSamePrivateNetwork(inputChannelDto, outputChannelDto)
            || onLocalNetwork(inputChannelDto, outputChannelDto)) {
      streamDtoBuilder.mode(StreamModeDTO.SRT);
    } else {
      streamDtoBuilder.mode(StreamModeDTO.SRT_RENDEZVOUS);
    }
  }

  private boolean onSamePrivateNetwork(
          InputChannelDTO inputChannelDto, OutputChannelDTO outputChannelDto) {
    String decoderPublicIpAddress = inputChannelDto.getDecoder().getDevice().getPublicIpAddress();
    String encoderPublicIpAddress = outputChannelDto.getEncoder().getDevice().getPublicIpAddress();
    return decoderPublicIpAddress.equals(encoderPublicIpAddress);
  }

  private boolean deviceOnLocalNetwork(DeviceDTO deviceDto) {
    //If the public IP address of a device is equal to its private IP address, then the device must be on the same local network as the service.
    return deviceDto.getPublicIpAddress().equals(deviceDto.getPrivateIpAddress())
        || deviceDto.getPublicIpAddress().equals(LOOPBACK_IP_V4)
        || deviceDto.getPublicIpAddress().equals(LOOPBACK_IP_V6);
  }

  // Tests if the two devices are on the same local network as the service.
  private boolean onLocalNetwork(
          InputChannelDTO inputChannelDTO, OutputChannelDTO outputChannelDTO) {
    return deviceOnLocalNetwork(inputChannelDTO.getDecoder().getDevice())
            && deviceOnLocalNetwork(outputChannelDTO.getEncoder().getDevice());
  }
}
