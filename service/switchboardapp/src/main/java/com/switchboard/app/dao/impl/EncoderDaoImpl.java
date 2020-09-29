package com.switchboard.app.dao.impl;

import com.switchboard.app.dao.EncoderDao;
import com.switchboard.app.domain.Device;
import com.switchboard.app.domain.Encoder;
import com.switchboard.app.repository.EncoderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EncoderDaoImpl implements EncoderDao {

    @Autowired
    EncoderRepository encoderRepository;

    @Override
    public Encoder addEncoder(Encoder encoder) {
        return encoderRepository.save(encoder);
    }

    @Override
    public List<Encoder> getEncoders() {
        return encoderRepository.findAll();
    }

}
