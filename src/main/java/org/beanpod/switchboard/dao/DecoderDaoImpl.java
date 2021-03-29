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
    return decoderMapper.toDecoderDto(
        decoderRepository.save(decoderMapper.toDecoderEntity(decoderDto.orElse(decoder))));
  }

  //  General data access methods
  //
  //  public List<DecoderEntity> getDecoders() {
  //    return decoderRepository.findAll();
  //  }
  //
  //  public Optional<DecoderDto> findDecoder(String serialNumber) {
  //    return decoderRepository
  //        .findDecoderBySerialNumber(serialNumber)
  //        .map(decoderMapper::toDecoderDto);
  //  }
  //
  //  public Long deleteDecoder(String serialNumber) {
  //    return decoderRepository.deleteDecoderEntityBySerialNumber(serialNumber);
  //  }

  // Ownership data access methods

  public List<DecoderEntity> getDecoders(UserEntity user) {
    return decoderRepository.findDecoderEntitiesByDeviceUser(user);
  }

  public Optional<DecoderDto> findDecoder(UserEntity user, String serialNumber) {
    return decoderRepository
        .findDecoderByDeviceUserAndSerialNumber(user, serialNumber)
        .map(decoderMapper::toDecoderDto);
  }

  public Long deleteDecoder(UserEntity user, String serialNumber) {
    return decoderRepository.deleteDecoderEntityByDeviceUserAndSerialNumber(user, serialNumber);
  }
}
