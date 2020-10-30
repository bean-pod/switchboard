package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.StreamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StreamRepository extends JpaRepository<StreamEntity, Long> {

    @Query(
            "SELECT id FROM Stream"
    )
    public List<Long> getAllUuid();

    @Query(
            "SELECT count(encoder_id)>0 FROM Stream where encoder_id = :encoderSerialNumber AND decoder_id = :decoderSerialNumber"
    )
    public boolean existsBySerialNumbers(@Param(value = "encoderSerialNumber") String encoderSerialNumber, @Param(value = "decoderSerialNumber") String decoderSerialNumber);
}
