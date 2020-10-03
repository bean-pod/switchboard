package com.switchboard.app.dao;
import com.switchboard.app.domain.DecoderEntity;
import com.switchboard.app.repository.DecoderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DecoderDaoImpl {

    //Connect to the database
    @Autowired
    DecoderRepository decoderRepository;

    public DecoderEntity save(DecoderEntity decoderEntity) {
      return  decoderRepository.save(decoderEntity);
    }

    public List<DecoderEntity> getDecoders() {
        return decoderRepository.findAll();
    }
}
