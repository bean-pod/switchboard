package com.switchboard.app.repository;

import com.switchboard.app.domain.Decoder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DecoderRepository extends JpaRepository<Decoder, String> {

}
