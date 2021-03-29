package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InputChannelRepository extends JpaRepository<InputChannelEntity, Long> {

  InputChannelEntity save(InputChannelEntity inputChannelEntity);

  //  General data access methods
  //
  //  Long deleteInputChannelEntityById(Long id);

  // Ownership data access methods

  Long deleteInputChannelEntityByDecoderDeviceUserAndId(UserEntity user, Long id);
}
