package org.beanpod.switchboard.dao;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.repository.EncoderRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EncoderDaoImpl {

  private final EncoderRepository encoderRepository;
  private final EncoderMapper encoderMapper;

  public EncoderDto save(EncoderDto encoderDto) {
    return encoderMapper.toEncoderDto(
        encoderRepository.save(encoderMapper.toEncoderEntity(encoderDto)));
  }

  // General data access methods

  public List<EncoderEntity> getEncoders() {
    return encoderRepository.findAll();
  }

  public Optional<EncoderDto> findEncoder(String serialNumber) {
    return encoderRepository
        .findEncoderBySerialNumber(serialNumber)
        .map(encoderMapper::toEncoderDto);
  }

  public long deleteEncoder(String serialNumber) {
    return encoderRepository.deleteEncoderEntityBySerialNumber(serialNumber);
  }

  // Ownership data access methods

  public List<EncoderEntity> getEncoders(UserEntity user) {
    return encoderRepository.findEncoderEntitiesByDeviceUser(user);
  }

  public Optional<EncoderDto> findEncoder(UserEntity user, String serialNumber) {
    return encoderRepository
        .findEncoderByDeviceUserAndSerialNumber(user, serialNumber)
        .map(encoderMapper::toEncoderDto);
  }

  public long deleteEncoder(UserEntity user, String serialNumber) {
    return encoderRepository.deleteEncoderEntityByDeviceUserAndSerialNumber(user, serialNumber);
  }
}
