package org.beanpod.switchboard.service;

import org.beanpod.switchboard.dto.StreamDto;

import java.util.List;

public interface DecoderService {
    List<StreamDto> getDecoderStreams(String decoderSerialNumber);
}
