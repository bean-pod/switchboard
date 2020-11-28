package org.beanpod.switchboard.repository;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DecoderRepository extends JpaRepository<DecoderEntity, String> {

  List<DecoderEntity> findAll();

  DecoderEntity save(DecoderEntity decoderEntity);

  Optional<DecoderEntity> findDecoderBySerialNumber(String serialNumber);

  Long deleteDecoderEntityBySerialNumber(String serialNumber);
}
