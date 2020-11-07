package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.ChannelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChannelRepository extends JpaRepository<ChannelEntity, Long> {

    @Query(
            "SELECT id FROM Channel"
    )
    List<Long> getAllId();

    @Query(
            "SELECT count(encoder_serial)>0 FROM Channel where encoder_serial = :encoderSerialNumber AND decoder_serial = :decoderSerialNumber and port = :port"
    )
    boolean existsDuplicate(@Param(value = "encoderSerialNumber") String encoderSerialNumber, @Param(value = "decoderSerialNumber") String decoderSerialNumber, @Param(value = "port") int port);
}
