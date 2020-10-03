package com.switchboard.app.dao;

import com.switchboard.app.domain.Decoder;
import com.switchboard.app.domain.Device;
import com.switchboard.app.domain.Encoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface DecoderDao {

    Decoder addDecoder(Decoder decoder);
    List<Decoder> getDecoders();

}
