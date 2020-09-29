package com.switchboard.app.dao.impl;

import com.switchboard.app.dao.EncoderDao;
import com.switchboard.app.domain.Encoder;
import com.switchboard.app.repository.EncoderRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class EncoderDaoImpl implements EncoderDao {

    @Autowired
    EncoderRepository encoderRepository;

    @Override
    public Encoder addEncoder(Encoder encoder) {
        return encoderRepository.save(encoder);
    }
}
