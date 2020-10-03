package com.switchboard.app.repository;

import com.switchboard.app.domain.EncoderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EncoderRepository extends JpaRepository<EncoderEntity,String> {

    EncoderEntity save(EncoderEntity decoder);
    List<EncoderEntity> findAll();

}
