package org.beanpod.switchboard.service;

import java.util.List;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.entity.UserEntity;
import org.openapitools.model.CreateStreamRequest;

public interface StreamService {

  StreamDto createStream(UserEntity user, CreateStreamRequest createStreamRequest);

  StreamDto updateStream(UserEntity user, StreamDto streamDto);

  StreamStatDto updateStreamStat(UserEntity user, StreamStatDto streamStatDto);

  List<StreamStatDto> getStreamStats(UserEntity user);

  StreamStatDto getStreamStat(UserEntity user, Long id);
}
