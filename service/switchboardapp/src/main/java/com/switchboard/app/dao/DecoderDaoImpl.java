package com.switchboard.app.dao;
import com.switchboard.app.domain.Decoder;
import com.switchboard.app.domain.Device;
import com.switchboard.app.repository.DecoderRepository;
import com.switchboard.app.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DecoderDaoImpl {

    //Connect to the database
    @Autowired
    DecoderRepository decoderRepository;

    public Decoder save(Decoder decoder) {
      return  decoderRepository.save(decoder);
    }

    public List<Decoder> getDecoders() {
        return decoderRepository.findAll();
    }
}
