package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.dto.StreamDTO;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.entity.StreamEntity;
import org.openapitools.model.CreateStreamRequest;
import org.openapitools.model.StreamModel;

import java.beans.Encoder;
import java.util.List;

public class StreamFixture {
    public static final long ID = 123L;

    public static List<Long> getIdList(){
        return List.of(
                ID
        );
    }

    public static StreamDTO getStreamDto(){
        return new StreamDTO(ID, EncoderFixture.getEncoderDto(), DecoderFixture.getDecoderDto());
    }

    public static StreamEntity getStreamEntity(){
        DeviceEntity device = DeviceFixture.getDevice1();
        EncoderEntity encoder = EncoderFixture.getEncoder1(device);
        DecoderEntity decoder = DecoderFixture.getDecoder1(device);
        return new StreamEntity(ID, encoder, decoder);
    }

    public static CreateStreamRequest getCreateStreamRequest(){
        CreateStreamRequest createStreamRequest = new CreateStreamRequest();
        createStreamRequest.setEncoderSerialNumber(EncoderFixture.SERIAL_NUMBER);
        createStreamRequest.setDecoderSerialNumber(DecoderFixture.SERIAL_NUMBER);
        return createStreamRequest;
    }

    public static StreamModel getStreamModel(){
        return new StreamModel()
                .id(ID)
                .decoder(DecoderFixture.getDecoderModel())
                .encoder(EncoderFixture.getEncoderModel());
    }
}
