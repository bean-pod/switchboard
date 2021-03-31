package org.beanpod.switchboard.service;

import java.util.List;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.stereotype.Service;

@Service
public interface EncoderService {

  List<StreamDto> getEncoderStreams(UserEntity user, String encoderSerialNumber);
}
