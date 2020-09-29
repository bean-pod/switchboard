package com.switchboard.app.dao.impl;

import com.switchboard.app.dao.DecoderDao;
import com.switchboard.app.domain.Decoder;
import com.switchboard.app.domain.Device;
import com.switchboard.app.repository.DecoderRepository;
import com.switchboard.app.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DecoderDaoImpl implements DecoderDao {

    //Connect to the database
    @Autowired
    DecoderRepository decoderRepository;

    @Override
    public Decoder addDecoder(Decoder decoder) {
        return decoderRepository.save(decoder);
    }
}
