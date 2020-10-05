package com.switchboard.app.repository;

import com.switchboard.app.domain.DecoderEntity;
import com.switchboard.app.domain.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DecoderRepository extends JpaRepository<DecoderEntity, String> {

       Optional<DecoderEntity> findDecoderBySerialNumber(String serialNumber);
       DecoderEntity save(DecoderEntity decoderEntity);
       List<DecoderEntity> findAll();
}
