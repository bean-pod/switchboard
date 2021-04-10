package org.beanpod.switchboard.dao;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.repository.DecoderRepository;
import org.springframework.stereotype.Component;

@Component
public class DecoderDaoImpl {

  private final DecoderRepository decoderRepository;
  private final DecoderMapper decoderMapper;

  public DecoderDaoImpl(DecoderRepository decoderRepository, DecoderMapper decoderMapper) {
    this.decoderRepository = decoderRepository;
    this.decoderMapper = decoderMapper;
  }

  public DecoderDto save(UserEntity user, DecoderDto decoder) {
    Optional<DecoderDto> decoderDto = findDecoder(user, decoder.getSerialNumber());
    if (decoderDto.isPresent()) {
      decoderMapper.updateDecoderFromDto(decoder, decoderDto.orElse(decoder));
    }
    return decoderMapper.toDto(
        decoderRepository.save(decoderMapper.toEntity(decoderDto.orElse(decoder))));
  }

  public List<DecoderEntity> getDecoders(UserEntity user) {
    return decoderRepository.findByDeviceUser(user);
  }

  public Optional<DecoderDto> findDecoder(UserEntity user, String serialNumber) {
    return decoderRepository
        .findByDeviceUserAndSerialNumber(user, serialNumber)
        .map(decoderMapper::toDto);
  }

  public Long deleteDecoder(UserEntity user, String serialNumber) {
    return decoderRepository.deleteByDeviceUserAndSerialNumber(user, serialNumber);
  }
}
