package com.switchboard.app.dao;

import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.domain.EncoderEntity;
import com.switchboard.app.repository.EncoderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class EncoderDaoImpl {

    @Autowired
    EncoderRepository encoderRepository;

    public EncoderEntity save(EncoderEntity encoderEntity) {
        return encoderRepository.save(encoderEntity);
    }

    public List<EncoderEntity> getEncoders() {
        return encoderRepository.findAll();
    }

    public Optional<EncoderEntity> findEncoder(String serialNumber) {
        return encoderRepository.findEncoderBySerialNumber(serialNumber);
    }
}
