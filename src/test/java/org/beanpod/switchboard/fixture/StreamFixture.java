package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.entity.StreamEntity;
import org.openapitools.model.CreateStreamRequest;
import org.openapitools.model.StreamModel;

import java.util.List;

public class StreamFixture {
  public static final long ID = 2429L;

  public static List<Long> getIdList() {
    return List.of(ID);
  }

  public static StreamEntity getStreamEntity() {
    return StreamEntity.builder()
        .id(ID)
        .inputChannel(ChannelFixture.getInputChannelEntity())
        .outputChannel(ChannelFixture.getOutputChannelEntity())
        .build();
  }

  public static StreamDto getStreamDto() {
    return StreamDto.builder()
        .id(ID)
        .inputChannel(ChannelFixture.getInputChannelDto())
        .outputChannel(ChannelFixture.getOutputChannelDto())
        .build();
  }

  public static CreateStreamRequest getCreateStreamRequest() {
    return new CreateStreamRequest()
        .inputChannelId(ChannelFixture.INPUT_CHANNEL_ID)
        .outputChannelId(ChannelFixture.OUTPUT_CHANNEL_ID);
  }

  public static StreamModel getStreamModel() {
    return new StreamModel()
        .id(ID)
        .inputChannel(ChannelFixture.getInputChannelModel())
        .outputChannel(ChannelFixture.getOutputChannelModel());
  }
}
