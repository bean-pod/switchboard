package org.beanpod.switchboard.repository;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EncoderRepository extends JpaRepository<EncoderEntity, String> {

  EncoderEntity save(EncoderEntity decoder);

  // General data access methods

  List<EncoderEntity> findAll();
  Optional<EncoderEntity> findEncoderBySerialNumber(String serialNumber);
  Long deleteEncoderEntityBySerialNumber(String serialNumber);

  // Ownership data access methods

  List<EncoderEntity> findEncoderEntitiesByDeviceUser(UserEntity user);
  Optional<EncoderEntity> findEncoderByDeviceUserAndSerialNumber(
      UserEntity user, String serialNumber);
  Long deleteEncoderEntityByDeviceUserAndSerialNumber(UserEntity user, String serialNumber);
}
