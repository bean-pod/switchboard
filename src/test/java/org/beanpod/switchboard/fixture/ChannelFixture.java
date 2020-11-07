package org.beanpod.switchboard.fixture;

import io.swagger.models.auth.In;
import org.apache.http.annotation.Contract;
import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.entity.*;
import org.hibernate.result.Output;
import org.openapitools.model.InputChannelModel;
import org.openapitools.model.OutputChannelModel;
import org.xmlunit.builder.Input;

import java.beans.Encoder;
import java.util.Base64;
import java.util.HashSet;
import java.util.Set;

public class ChannelFixture {
    public static final long CHANNEL_ID = 4569L;
    public static final long INPUT_CHANNEL_ID = 113L;
    public static final long OUTPUT_CHANNEL_ID = 7301L;
    public static final String NAME = "local";
    public static final int PORT = 8080;

    public static ChannelEntity getChannelEntity(){
        return ChannelEntity.builder()
                .id(CHANNEL_ID)
                .name(NAME)
                .port(PORT)
                .build();
    }

    public static InputChannelEntity getInputChannelEntity(){
        return InputChannelEntity.builder()
                .id(INPUT_CHANNEL_ID)
                .channel(getChannelEntity())
                .decoder(DecoderFixture.getDecoder1(DeviceFixture.getDevice1()))
                .build();
    }

    public static OutputChannelEntity getOutputChannelEntity(){
        return OutputChannelEntity.builder()
                .id(INPUT_CHANNEL_ID)
                .channel(getChannelEntity())
                .encoder(EncoderFixture.getEncoder1(DeviceFixture.getDevice1()))
                .build();
    }

    public static InputChannelDTO getInputChannelDto(){
        return InputChannelDTO.builder()
                .id(INPUT_CHANNEL_ID)
                .name(NAME)
                .port(PORT)
                .decoder(DecoderFixture.getDecoderDto())
                .build();
    }

    public static OutputChannelDTO getOutputChannelDto(){
        return OutputChannelDTO.builder()
                .id(OUTPUT_CHANNEL_ID)
                .name(NAME)
                .port(PORT)
                .encoder(EncoderFixture.getEncoderDto())
                .build();
    }

    public static InputChannelModel getInputChannelModel(){
        return new InputChannelModel()
                .id(INPUT_CHANNEL_ID)
                .name(NAME)
                .port(PORT)
                .decoder(DecoderFixture.getDecoderModel());

    }

    public static OutputChannelModel getOutputChannelModel(){
        return new OutputChannelModel()
                .id(OUTPUT_CHANNEL_ID)
                .name(NAME)
                .port(PORT)
                .encoder(EncoderFixture.getEncoderModel());

    }

    public static Set<InputChannelEntity> getInputChannelEntities(){
        return new HashSet<>(){{
            getInputChannelEntity();
        }};
    }

    public static Set<OutputChannelEntity> getOutputChannelEntities(){
        return new HashSet<>(){{
            getOutputChannelEntity();
        }};
    }

    public static Set<InputChannelDTO> getInputChannelDtos(){
        return new HashSet<>(){{
            getInputChannelDto();
        }};
    }

    public static Set<OutputChannelDTO> getOutputChannelDtos(){
        return new HashSet<>(){{
            getOutputChannelDto();
        }};
    }
}
