package org.beanpod.switchboard.service;

import java.util.List;
import org.beanpod.switchboard.dto.StreamDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface EncoderService {

  List<StreamDto> getEncoderStreams(String encoderSerialNumber);

  void uploadJson(MultipartFile schema, MultipartFile instance);
}
