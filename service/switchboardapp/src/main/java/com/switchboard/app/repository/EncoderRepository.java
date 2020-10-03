package com.switchboard.app.repository;

import com.switchboard.app.domain.Encoder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EncoderRepository extends JpaRepository<Encoder,String> {

    Encoder save(Encoder decoder);
    List<Encoder> findAll();

}
