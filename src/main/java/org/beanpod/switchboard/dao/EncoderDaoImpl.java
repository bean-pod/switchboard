package org.beanpod.switchboard.dao;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.repository.EncoderRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EncoderDaoImpl {

  private final EncoderRepository encoderRepository;
  private final EncoderMapper encoderMapper;

  public EncoderDTO save(EncoderDTO encoderDTO) {
    return encoderMapper.toEncoderDTO(
        encoderRepository.save(encoderMapper.toEncoderEntity(encoderDTO)));
  }

  public Optional<EncoderDTO> findEncoder(String serialNumber) {
    return encoderRepository
        .findEncoderBySerialNumber(serialNumber)
        .map(encoderMapper::toEncoderDTO);
  }

  public List<EncoderEntity> getEncoders() {
    return encoderRepository.findAll();
  }

  public long deleteEncoder(String serialNumber) {
    return encoderRepository.deleteEncoderEntityBySerialNumber(serialNumber);
  }
}
