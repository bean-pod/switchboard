package org.beanpod.switchboard.service;

import java.util.List;
import org.beanpod.switchboard.dto.StreamDto;

public interface DecoderService {

  List<StreamDto> getDecoderStreams(String decoderSerialNumber);
}
