package org.beanpod.switchboard.repository;

import java.util.List;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StreamRepository extends JpaRepository<StreamEntity, Long> {

  // General data access methods

  @Query("SELECT s FROM Stream s WHERE s.outputChannel.encoder.serialNumber = :encoderSerial")
  List<StreamEntity> getEncoderStreams(@Param(value = "encoderSerial") String encoderSerial);
  @Query("SELECT s FROM Stream s WHERE s.inputChannel.decoder.serialNumber = :decoderSerial")
  List<StreamEntity> getDecoderStreams(@Param(value = "decoderSerial") String decoderSerial);

  // Ownership data access methods refactored using JPA repository named method convention

  List<StreamEntity> findAllByOutputChannelEncoderDeviceUserAndOutputChannelEncoderSerialNumber(
      UserEntity user, String encoderSerial);
  List<StreamEntity> findAllByInputChannelDecoderDeviceUserAndInputChannelDecoderSerialNumber(
      UserEntity user, String decoderSerial);

  // I'm confused as to what purpose the following two methods serve?

  @Query("SELECT id FROM Stream")
  List<Long> getAllId();

  @Query(
      "SELECT count(id) > 0 FROM Stream where input_channel_id = :inputChannelId AND "
          + "output_channel_id = :outputChannelId")
  boolean existsDuplicate(
      @Param(value = "inputChannelId") long inputChannelId,
      @Param(value = "outputChannelId") long outputChannelId);
}
