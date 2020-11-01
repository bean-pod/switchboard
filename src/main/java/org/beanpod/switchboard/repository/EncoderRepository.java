package org.beanpod.switchboard.repository;

import org.beanpod.switchboard.entity.EncoderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EncoderRepository extends JpaRepository<EncoderEntity, String> {

    EncoderEntity save(EncoderEntity decoder);

    Optional<EncoderEntity> findEncoderBySerialNumber(String serialNumber);

    List<EncoderEntity> findAll();

    int deleteEncoderEntityBySerialNumber(String serialNumber);

}
