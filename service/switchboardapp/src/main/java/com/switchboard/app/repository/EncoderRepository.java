package com.switchboard.app.repository;

import com.switchboard.app.domain.Encoder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EncoderRepository extends JpaRepository<Encoder,String> {


}
