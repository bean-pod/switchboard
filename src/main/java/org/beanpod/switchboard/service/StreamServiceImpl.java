package org.beanpod.switchboard.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dao.InputChannelDaoImpl;
import org.beanpod.switchboard.dao.OutputChannelDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.util.NetworkingUtil;
import org.openapitools.model.CreateStreamRequest;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class StreamServiceImpl implements StreamService {

  private final StreamDaoImpl streamDao;
  private final StreamMapper mapper;
  private final InputChannelDaoImpl inputChannelDao;
  private final OutputChannelDaoImpl outputChannelDao;
  private final NetworkingUtil networkingUtil;

  @Override
  public StreamDto createStream(CreateStreamRequest createStreamRequest) {

    log.info(
        "Creating a stream request between input channel {} and output channel {}",
        createStreamRequest.getInputChannelId(),
        createStreamRequest.getOutputChannelId());

    InputChannelDto inputChannelDto =
        inputChannelDao.getInputChannelById(createStreamRequest.getInputChannelId());
    OutputChannelDto outputChannelDto =
        outputChannelDao.getOutputChannelById(createStreamRequest.getOutputChannelId());

    StreamDto streamDto =
        StreamDto.builder()
            .inputChannel(inputChannelDto)
            .outputChannel(outputChannelDto)
            .isRendezvous(shouldUseRendezvousMode(inputChannelDto, outputChannelDto))
            .build();

    StreamDto streamDto1 = streamDao.saveStream(streamDto);
    log.debug(
        "Stream created between input channel {} and output channel {}",
        createStreamRequest.getInputChannelId(),
        createStreamRequest.getOutputChannelId());
    return streamDto1;
  }

  @Override
  public StreamDto updateStream(StreamDto streamDto) {
    log.info("Updating stream {}", streamDto.getId());
    StreamEntity updatedStreamEntity = streamDao.updateStream(streamDto);
    return mapper.toDto(updatedStreamEntity);
  }

  public StreamStatDto updateStreamStat(StreamStatDto streamStatDto) {
    log.info("Updating stream statistics {}", streamStatDto.getId());
    return streamDao.updateStreamStat(streamStatDto);
  }

  @Override
  public List<StreamStatDto> getStreamStats() {
    return streamDao.getStreamStats();
  }

  @Override
  public StreamStatDto getStreamStat(Long id) {
    return streamDao.getStreamStat(id).orElse(null);
  }

  private boolean shouldUseRendezvousMode(
      InputChannelDto inputChannelDto, OutputChannelDto outputChannelDto) {
    log.info(
        "Determining whether to use RendezvousMode between input channel {} and output channel {}",
        inputChannelDto.getId(),
        outputChannelDto.getId());

    DeviceDto decoderDevice = inputChannelDto.getDecoder().getDevice();
    DeviceDto encoderDevice = outputChannelDto.getEncoder().getDevice();
    boolean rendezVousAllowed =
        !(networkingUtil.areDevicesOnSameLocalNetworkAsService(decoderDevice, encoderDevice)
            || networkingUtil.areDevicesOnSamePrivateNetwork(decoderDevice, encoderDevice));
    log.debug(
        "RendezvousMode is {} between decoder device {} and encoder device {}",
        Boolean.TRUE.equals(rendezVousAllowed) ? "allowed" : "not allowed",
        decoderDevice.getSerialNumber(),
        encoderDevice.getSerialNumber());
    return rendezVousAllowed;
  }
}
