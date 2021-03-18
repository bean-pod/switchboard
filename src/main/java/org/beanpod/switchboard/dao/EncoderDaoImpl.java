package org.beanpod.switchboard.dao;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.repository.EncoderRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EncoderDaoImpl {

  private final EncoderRepository encoderRepository;
  private final EncoderMapper encoderMapper;

  public EncoderDto save(EncoderDto encoder) {
    Optional<EncoderDto> encoderDto = findEncoder(encoder.getSerialNumber());

    if(!encoderDto.isEmpty()){
      encoderMapper.updateEncoderFromDto(encoder, encoderDto.orElse(encoder));
    }
    return encoderMapper.toEncoderDto(
        encoderRepository.save(encoderMapper.toEncoderEntity(encoderDto.orElse(encoder))));
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
