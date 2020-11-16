package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.repository.EncoderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class EncoderDaoImpl {

    @Autowired
    EncoderRepository encoderRepository;

    @Autowired
    EncoderMapper encoderMapper;

    public EncoderDTO save(EncoderDTO encoderDTO) {
        return encoderMapper.toEncoderDTO(encoderRepository
                .save(encoderMapper.toEncoderEntity(encoderDTO)));
    }

    public Optional<EncoderDTO> findEncoder(String serialNumber) {
        return encoderRepository.
                findEncoderBySerialNumber(serialNumber).map(encoder -> encoderMapper.toEncoderDTO(encoder));
    }

    public List<EncoderEntity> getEncoders() {
        return encoderRepository.findAll();
    }

    public long deleteEncoder(String serialNumber) {
        return encoderRepository.deleteEncoderEntityBySerialNumber(serialNumber);
    }
}
