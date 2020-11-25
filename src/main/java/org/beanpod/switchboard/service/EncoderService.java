package org.beanpod.switchboard.service;

import org.beanpod.switchboard.dto.StreamDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EncoderService {
  List<StreamDto> getEncoderStreams(String encoderSerialNumber);
}
