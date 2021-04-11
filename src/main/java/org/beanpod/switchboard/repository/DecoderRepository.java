package org.beanpod.switchboard.repository;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DecoderRepository extends JpaRepository<DecoderEntity, String> {

  DecoderEntity save(DecoderEntity decoderEntity);

  List<DecoderEntity> findByDeviceUser(UserEntity user);

  Optional<DecoderEntity> findByDeviceUserAndSerialNumber(UserEntity user, String serialNumber);

  Long deleteByDeviceUserAndSerialNumber(UserEntity user, String serialNumber);
}
