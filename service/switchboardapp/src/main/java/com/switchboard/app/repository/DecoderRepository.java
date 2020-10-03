package com.switchboard.app.repository;

import com.switchboard.app.domain.DecoderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DecoderRepository extends JpaRepository<DecoderEntity, String> {

       DecoderEntity save(DecoderEntity decoderEntity);
       List<DecoderEntity> findAll();
}
