package com.switchboard.app.dao;

import com.switchboard.app.domain.Decoder;
import com.switchboard.app.domain.Device;
import com.switchboard.app.domain.Encoder;

import java.util.List;

public interface EncoderDao {

    Encoder addEncoder(Encoder encoder);
    List<Encoder> getEncoders();

}
