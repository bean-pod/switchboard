package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.openapitools.model.ChannelModel;
import org.openapitools.model.CreateChannelRequest;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ChannelFixture {
    public static final long ID = 1;
    public static final String NAME = "local";
    public static final int PORT = 8080;

    public static List<Long> getIdList(){
        return List.of(
                ID
        );
    }

    public static ChannelEntity getChannel1(){
        return new ChannelEntity( (long)1,"local",8080,null,null);
    }

    public static ChannelEntity getChannel2(){
        return new ChannelEntity( (long)2,"Dev",9090, null,null    );
    }

    public static Set<ChannelEntity> getSetOfChannels(){
        Set<ChannelEntity> setOfChannels= new HashSet<>();
        setOfChannels.add(getChannel1());
        setOfChannels.add(getChannel1());
        return setOfChannels;
    }

    public static ChannelEntity getChannelEntity(){
        DeviceEntity device = DeviceFixture.getDevice1();
        EncoderEntity encoder = EncoderFixture.getEncoder1(device);
        DecoderEntity decoder = DecoderFixture.getDecoder1(device);
        return new ChannelEntity(ID, NAME, PORT, decoder, encoder);
    }

    public static ChannelDTO getChannelDto(){
        return ChannelDTO.builder()
                .id(ID)
                .name(NAME)
                .port(PORT)
                .decoder(DecoderFixture.getDecoderDto())
                .encoder(EncoderFixture.getEncoderDto())
                .build();
    }

    public static CreateChannelRequest getCreateChannelRequest(){
        return new CreateChannelRequest()
                .name(NAME)
                .port(PORT)
                .decoderSerialNumber(DecoderFixture.SERIAL_NUMBER)
                .encoderSerialNumber(EncoderFixture.SERIAL_NUMBER);
    }

    public static ChannelModel getChannelModel(){
        return new ChannelModel()
                .id(ID)
                .name(NAME)
                .port(PORT)
                .decoder(DecoderFixture.getDecoderModel())
                .encoder(EncoderFixture.getEncoderModel());
    }
}
