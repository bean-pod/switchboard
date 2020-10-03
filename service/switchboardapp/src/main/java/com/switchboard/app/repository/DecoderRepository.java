package com.switchboard.app.repository;

import com.switchboard.app.domain.Decoder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DecoderRepository extends JpaRepository<Decoder, String> {

       Decoder save(Decoder decoder);
       List<Decoder> findAll();
}
