package org.beanpod.switchboard.repository;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.entity.StreamStatEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StreamStatRepository extends JpaRepository<StreamStatEntity, Long> {

  StreamStatEntity save(StreamStatEntity streamStatEntity);

  Optional<StreamStatEntity>
      findStreamStatEntityByStreamInputChannelDecoderDeviceUserAndIdOrStreamOutputChannelEncoderDeviceUserAndId(
          UserEntity inputUser, Long inputId, UserEntity outputUser, Long outputId);

  List<StreamStatEntity>
      findStreamStatEntitiesByStreamInputChannelDecoderDeviceUserOrStreamOutputChannelEncoderDeviceUser(
          UserEntity inputUser, UserEntity outputUser);
}
