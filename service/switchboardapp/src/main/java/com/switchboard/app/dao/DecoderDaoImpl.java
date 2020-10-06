package com.switchboard.app.dao;

import com.switchboard.app.domain.DecoderEntity;
import com.switchboard.app.domain.DeviceEntity;
import com.switchboard.app.repository.DecoderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DecoderDaoImpl {

    //Connect to the database
    @Autowired
    DecoderRepository decoderRepository;

    public Optional<DecoderEntity> findDecoder(String serialNumber) {
        return decoderRepository.findDecoderBySerialNumber(serialNumber);
    }

    public DecoderEntity save(DecoderEntity decoderEntity) {
        return decoderRepository.save(decoderEntity);
    }

    public List<DecoderEntity> getDecoders() {
        return decoderRepository.findAll();
    }
}
