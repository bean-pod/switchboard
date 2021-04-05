package org.beanpod.switchboard.repository;

import java.util.List;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.entity.StreamEntity.StreamIdProjection;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StreamRepository extends JpaRepository<StreamEntity, Long> {

  StreamEntity save(StreamEntity stream);

  List<StreamEntity>
      findStreamEntitiesByOutputChannelEncoderDeviceUserAndOutputChannelEncoderSerialNumber(
          UserEntity user, String encoderSerial);

  List<StreamEntity>
      findStreamEntitiesByInputChannelDecoderDeviceUserAndInputChannelDecoderSerialNumber(
          UserEntity user, String decoderSerial);

  List<StreamIdProjection>
      findStreamIdsByInputChannelDecoderDeviceUserOrOutputChannelEncoderDeviceUser(
          UserEntity inputUser, UserEntity outputUser);

  StreamEntity
      findStreamEntityByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
          UserEntity inputUser, Long inputStreamId, UserEntity outputUser, Long outputStreamId);

  boolean
      existsStreamEntityByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
          UserEntity inputUser, Long inputStreamId, UserEntity outputUser, Long outputStreamId);

  boolean existsStreamEntityByInputChannelIdAndOutputChannelId(
      long inputChannelId, long outputChannelId);

  long deleteStreamEntityByInputChannelDecoderDeviceUserAndIdOrOutputChannelEncoderDeviceUserAndId(
      UserEntity inputUser, Long inputStreamId, UserEntity outputUser, Long outputStreamId);
}
