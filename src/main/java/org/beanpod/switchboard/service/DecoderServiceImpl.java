package org.beanpod.switchboard.service;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DecoderServiceImpl implements DecoderService {
  private final StreamDaoImpl streamDao;
  private final DecoderDaoImpl decoderDao;

  @Override
  public List<StreamDto> getDecoderStreams(String decoderSerialNumber) {
    Optional<DecoderDto> decoderOptional = decoderDao.findDecoder(decoderSerialNumber);
    if (decoderOptional.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(decoderSerialNumber);
    }
    DecoderDto decoder = decoderOptional.get();

    decoder.setLastCommunication(Date.from(Instant.now()));
    decoderDao.save(decoder);

    return streamDao.getDecoderStreams(decoderSerialNumber);
  }
}
