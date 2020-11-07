package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.repository.EncoderRepository;
import org.beanpod.switchboard.repository.OutputChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class EncoderDaoImpl {

    @Autowired
    EncoderRepository encoderRepository;
    @Autowired
    OutputChannelRepository outputChannelRepository;

    public EncoderEntity save(EncoderEntity encoderEntity) {
        //TODO temporary
        Optional.of(encoderEntity)
                .map(EncoderEntity::getOutputs)

                .orElse(Collections.emptySet())
                .forEach(outputChannelEntity -> outputChannelEntity.setEncoder(encoderEntity));
//        outputChannelRepository.saveAll(encoderEntity.getOutputs());
//        encoderEntity.getOutputs().clear();
        return encoderRepository.save(encoderEntity);
    }

    public Optional<EncoderEntity> findEncoder(String serialNumber) {
        return encoderRepository.findEncoderBySerialNumber(serialNumber);
    }

    public List<EncoderEntity> getEncoders() {
        return encoderRepository.findAll();
    }

    public long deleteEncoder(String serialNumber) {
        return encoderRepository.deleteEncoderEntityBySerialNumber(serialNumber);
    }
}
