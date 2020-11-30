package org.beanpod.switchboard.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.util.DateUtil;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EncoderServiceImpl implements EncoderService {
  private final EncoderDaoImpl encoderDao;
  private final StreamDaoImpl streamDao;
  private final DateUtil dateUtil;

  @Override
  public List<StreamDto> getEncoderStreams(String encoderSerialNumber) {
    EncoderDto encoderDto =
        encoderDao
            .findEncoder(encoderSerialNumber)
            .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(encoderSerialNumber));

    encoderDto.setLastCommunication(dateUtil.getCurrentDate());
    encoderDao.save(encoderDto);

    return streamDao.getEncoderStreams(encoderSerialNumber);
  }
}
