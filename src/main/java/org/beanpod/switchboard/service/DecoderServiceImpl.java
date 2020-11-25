package org.beanpod.switchboard.service;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.StreamDto;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DecoderServiceImpl implements DecoderService {
    private final StreamDaoImpl streamDao;

    @Override
    public List<StreamDto> getDecoderStreams(String decoderSerialNumber) {
        return streamDao.getDecoderStreams(decoderSerialNumber);
    }
}
