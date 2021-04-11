package org.beanpod.switchboard.repository;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends JpaRepository<DeviceEntity, String> {

  DeviceEntity save(DeviceEntity device);

  List<DeviceEntity> findByUser(UserEntity user);

  Optional<DeviceEntity> findBySerialNumber(String serialNumber);

  Optional<DeviceEntity> findByUserAndSerialNumber(UserEntity user, String serialNumber);

  Long deleteByUserAndSerialNumber(UserEntity user, String serialNumber);
}
