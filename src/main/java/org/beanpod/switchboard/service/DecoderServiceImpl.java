package org.beanpod.switchboard.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.util.DateUtil;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DecoderServiceImpl implements DecoderService {

  private final StreamDaoImpl streamDao;
  private final DecoderDaoImpl decoderDao;
  private final DateUtil dateUtil;

  @Override
  public List<StreamDto> getDecoderStreams(String decoderSerialNumber) {
    log.info("Getting decoder {} streams", decoderSerialNumber);
    DecoderDto decoder =
        decoderDao
            .findDecoder(decoderSerialNumber)
            .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(decoderSerialNumber));

    decoder.setLastCommunication(dateUtil.getCurrentDate());
    decoderDao.save(decoder);
    log.debug("Updated decoder {} last communication date", decoderSerialNumber);

    return streamDao.getDecoderStreams(decoderSerialNumber);
  }
}
