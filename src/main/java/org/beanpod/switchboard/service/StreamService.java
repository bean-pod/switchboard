package org.beanpod.switchboard.service;

import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.openapitools.model.CreateStreamRequest;

public interface StreamService {

  StreamDto createStream(CreateStreamRequest createStreamRequest);

  StreamDto updateStream(StreamDto streamDto);

  StreamStatDto updateStreamStat(StreamStatDto streamStatDto);
}
