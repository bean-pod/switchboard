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

  public EncoderDto save(UserEntity user, EncoderDto encoder) {
    Optional<EncoderDto> encoderDto = findEncoder(user, encoder.getSerialNumber());

    if (encoderDto.isPresent()) {
      encoderMapper.updateEncoderFromDto(encoder, encoderDto.orElse(encoder));
    }
    return encoderMapper.toEncoderDto(
        encoderRepository.save(encoderMapper.toEncoderEntity(encoderDto.orElse(encoder))));
  }

  public List<EncoderEntity> getEncoders(UserEntity user) {
    return encoderRepository.findByDeviceUser(user);
  }

  public Optional<EncoderDto> findEncoder(UserEntity user, String serialNumber) {
    return encoderRepository
        .findByDeviceUserAndSerialNumber(user, serialNumber)
        .map(encoderMapper::toEncoderDto);
  }

  public long deleteEncoder(UserEntity user, String serialNumber) {
    return encoderRepository.deleteByDeviceUserAndSerialNumber(user, serialNumber);
  }
}
