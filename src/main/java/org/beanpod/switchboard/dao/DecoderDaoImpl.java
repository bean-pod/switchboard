package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.repository.DecoderRepository;
import org.beanpod.switchboard.repository.InputChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class DecoderDaoImpl {

    //Connect to the database
    @Autowired
    DecoderRepository decoderRepository;

    public DecoderEntity save(DecoderEntity decoderEntity) {
        Optional.of(decoderEntity)
                .map(DecoderEntity::getInputs)
                .orElse(Collections.emptySet())
                .forEach(inputChannelEntity -> inputChannelEntity.setDecoder(decoderEntity));
        return decoderRepository.save(decoderEntity);
    }

    public Optional<DecoderEntity> findDecoder(String serialNumber) {
        return decoderRepository.findDecoderBySerialNumber(serialNumber);
    }

    public List<DecoderEntity> getDecoders() {
        return decoderRepository.findAll();
    }

    public Long deleteDecoder(String serialNumber) {
        return decoderRepository.deleteDecoderEntityBySerialNumber(serialNumber);
    }

}
