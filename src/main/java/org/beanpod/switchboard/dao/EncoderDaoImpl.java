package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.repository.EncoderRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class EncoderDaoImpl {

    private final EncoderRepository encoderRepository;
    private final EncoderMapper encoderMapper;

    public EncoderDto save(EncoderDto encoderDto) {
        return encoderMapper.toEncoderDto(
                encoderRepository.save(encoderMapper.toEncoderEntity(encoderDto)));
    }

    public Optional<EncoderDto> findEncoder(String serialNumber) {
        return encoderRepository
                .findEncoderBySerialNumber(serialNumber)
                .map(encoderMapper::toEncoderDto);
    }

    public List<EncoderEntity> getEncoders() {
        return encoderRepository.findAll();
    }

    public long deleteEncoder(String serialNumber) {
        return encoderRepository.deleteEncoderEntityBySerialNumber(serialNumber);
    }
}
