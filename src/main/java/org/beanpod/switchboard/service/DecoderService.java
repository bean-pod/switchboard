package org.beanpod.switchboard.service;

import java.util.List;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.entity.UserEntity;

public interface DecoderService {

  List<StreamDto> getDecoderStreams(UserEntity user, String decoderSerialNumber);
}
