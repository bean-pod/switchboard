package com.switchboard.app.dao;
import com.switchboard.app.domain.Encoder;
import com.switchboard.app.repository.EncoderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EncoderDaoImpl {

    @Autowired
    EncoderRepository encoderRepository;

    public Encoder save(Encoder encoder) {
        return encoderRepository.save(encoder);
    }

    public List<Encoder> getEncoders() {
        return encoderRepository.findAll();
    }

}
