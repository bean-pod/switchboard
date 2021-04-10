package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InputChannelRepository extends JpaRepository<InputChannelEntity, Long> {

  InputChannelEntity save(InputChannelEntity inputChannelEntity);

  InputChannelEntity findByDecoderDeviceUserAndId(UserEntity user, Long id);

  Long deleteByDecoderDeviceUserAndId(UserEntity user, Long id);
}
