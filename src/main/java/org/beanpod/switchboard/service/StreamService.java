package org.beanpod.switchboard.service;

import org.beanpod.switchboard.dto.StreamDto;
import org.openapitools.model.CreateStreamRequest;

// Blocked by StreamDaoImpl and ChannelDaoImpl

public interface StreamService {

  StreamDto createStream(CreateStreamRequest createStreamRequest);

  StreamDto updateStream(StreamDto streamDto);
}
