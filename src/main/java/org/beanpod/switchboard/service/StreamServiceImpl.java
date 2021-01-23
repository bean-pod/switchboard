package org.beanpod.switchboard.service;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.ChannelDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.util.NetworkingUtil;
import org.openapitools.model.CreateStreamRequest;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StreamServiceImpl implements StreamService {

  private final StreamDaoImpl streamDao;
  private final StreamMapper mapper;
  private final ChannelDaoImpl channelDao;
  private final NetworkingUtil networkingUtil;

  @Override
  public StreamDto createStream(CreateStreamRequest createStreamRequest) {

    InputChannelDto inputChannelDto =
        channelDao.getInputChannelById(createStreamRequest.getInputChannelId());
    OutputChannelDto outputChannelDto =
        channelDao.getOutputChannelById(createStreamRequest.getOutputChannelId());

    StreamDto streamDto =
        StreamDto.builder()
            .inputChannel(inputChannelDto)
            .outputChannel(outputChannelDto)
            .isRendezvous(shouldUseRendezvousMode(inputChannelDto, outputChannelDto))
            .build();

    return streamDao.saveStream(streamDto);
  }

  @Override
  public StreamDto updateStream(StreamDto streamDto) {
    StreamEntity updatedStreamEntity = streamDao.updateStream(streamDto);
    return mapper.toDto(updatedStreamEntity);
  }

  private boolean shouldUseRendezvousMode(
      InputChannelDto inputChannelDto, OutputChannelDto outputChannelDto) {
    DeviceDto decoderDevice = inputChannelDto.getDecoder().getDevice();
    DeviceDto encoderDevice = outputChannelDto.getEncoder().getDevice();
    return !(networkingUtil.areDevicesOnSameLocalNetworkAsService(decoderDevice, encoderDevice)
        || networkingUtil.areDevicesOnSamePrivateNetwork(decoderDevice, encoderDevice));
  }
}
