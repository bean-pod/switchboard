package org.beanpod.switchboard.fixture;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.SneakyThrows;
import org.beanpod.switchboard.dto.ChannelDto;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.openapitools.model.ChannelModel;
import org.openapitools.model.InputChannelModel;
import org.openapitools.model.OutputChannelModel;

public class ChannelFixture {

  public static final long CHANNEL_ID = 4569L;
  public static final long CHANNEL_ID2 = 4568L;
  public static final long INPUT_CHANNEL_ID = 113L;
  public static final long OUTPUT_CHANNEL_ID = 7301L;
  public static final String NAME = "local";
  public static final int PORT = 8080;

  public static ChannelEntity getChannelEntity1() {
    return ChannelEntity.builder().id(CHANNEL_ID).name(NAME).port(PORT).build();
  }

  public static ChannelEntity getChannelEntity2() {
    return ChannelEntity.builder().id(CHANNEL_ID2).name(NAME).port(PORT).build();
  }

  public static List<ChannelEntity> getListOfChannels() {
    List<ChannelEntity> listOfChannels = new ArrayList<>();
    listOfChannels.add(getChannelEntity1());
    listOfChannels.add(getChannelEntity2());
    return listOfChannels;
  }

  public static ChannelDto getChannelDto() {
    return ChannelDto.builder().id(CHANNEL_ID).name(NAME).port(PORT).build();
  }

  @SneakyThrows
  public static InputChannelEntity getInputChannelEntity() {
    return InputChannelEntity.builder()
        .id(INPUT_CHANNEL_ID)
        .channel(getChannelEntity1())
        .decoder(DecoderFixture.getDecoderEntity1())
        .build();
  }

  @SneakyThrows
  public static OutputChannelEntity getOutputChannelEntity() {
    return OutputChannelEntity.builder()
        .id(OUTPUT_CHANNEL_ID)
        .channel(getChannelEntity2())
        .encoder(EncoderFixture.getEncoderEntity2())
        .build();
  }

  @SneakyThrows
  public static InputChannelDto getInputChannelDto() {
    return InputChannelDto.builder()
        .id(INPUT_CHANNEL_ID)
        .decoder(DecoderFixture.getDecoderDto())
        .build();
  }

  public static OutputChannelDto getOutputChannelDto() {
    return OutputChannelDto.builder()
        .id(OUTPUT_CHANNEL_ID)
        .encoder(EncoderFixture.getEncoderDto())
        .build();
  }

  public static InputChannelModel getInputChannelModel() {
    ChannelModel channelModel = new ChannelModel()
        .id(INPUT_CHANNEL_ID)
        .name("Test input channel")
        .port(PORT);
    return new InputChannelModel().id(INPUT_CHANNEL_ID).channel(channelModel).decoder(DecoderFixture.getDecoderModel());
  }

  public static OutputChannelModel getOutputChannelModel() {
    ChannelModel channelModel = new ChannelModel()
        .id(OUTPUT_CHANNEL_ID)
        .name("Test output channel")
        .port(PORT);
    return new OutputChannelModel().id(OUTPUT_CHANNEL_ID).channel(channelModel).encoder(EncoderFixture.getEncoderModel());
  }

  public static Set<InputChannelEntity> getInputChannelEntities() {
    return new HashSet<>() {
      {
        add(getInputChannelEntity());
      }
    };
  }

  public static Set<OutputChannelEntity> getOutputChannelEntities() {
    return new HashSet<>() {
      {
        add(getOutputChannelEntity());
      }
    };
  }

  public static Set<InputChannelDto> getInputChannelDtos() {
    return new HashSet<>() {
      {
        add(getInputChannelDto());
      }
    };
  }

  public static Set<OutputChannelDto> getOutputChannelDtos() {
    return new HashSet<>() {
      {
        add(getOutputChannelDto());
      }
    };
  }
}
