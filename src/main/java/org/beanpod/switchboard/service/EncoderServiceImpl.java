package org.beanpod.switchboard.service;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class EncoderServiceImpl implements EncoderService {
    private final EncoderDaoImpl encoderDao;
    private final StreamDaoImpl streamDao;

    @Override
    public List<StreamDto> getEncoderStreams(String encoderSerialNumber) {
        Optional<EncoderDto> encoderOptional = encoderDao.findEncoder(encoderSerialNumber);
        if(encoderOptional.isEmpty()) {
            throw new ExceptionType.DeviceNotFoundException(encoderSerialNumber);
        }
        EncoderDto encoderDto = encoderOptional.get();

        encoderDto.setLastCommunication(Date.from(Instant.now()));
        encoderDao.save(encoderDto);

        return streamDao.getEncoderStreams(encoderSerialNumber);
    }
}
