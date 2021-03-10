package org.beanpod.switchboard.service;

import java.util.List;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.openapitools.model.CreateStreamRequest;

// Blocked by StreamDaoImpl and ChannelDaoImpl

public interface StreamService {

  StreamDto createStream(CreateStreamRequest createStreamRequest);
  StreamDto updateStream(StreamDto streamDto);

  StreamStatDto updateStreamStat(StreamStatDto streamStatDto);

  List<StreamStatDto> getStreamStats();

  StreamStatDto getStreamStat(Long id);
}
