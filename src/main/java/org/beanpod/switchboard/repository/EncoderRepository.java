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

  List<EncoderEntity> findByDeviceUser(UserEntity user);

  Optional<EncoderEntity> findByDeviceUserAndSerialNumber(UserEntity user, String serialNumber);

  Long deleteByDeviceUserAndSerialNumber(UserEntity user, String serialNumber);
}
