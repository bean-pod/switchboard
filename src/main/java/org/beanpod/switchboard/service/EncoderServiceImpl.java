package org.beanpod.switchboard.service;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.StreamDto;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class EncoderServiceImpl implements EncoderService {
    private final StreamDaoImpl streamDao;

    @Override
    public List<StreamDto> getEncoderStreams(String encoderSerialNumber) {
        return streamDao.getEncoderStreams(encoderSerialNumber);
    }
}
