package org.beanpod.switchboard.fixture;

import java.util.List;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.entity.StreamEntity;
import org.openapitools.model.CreateStreamRequest;
import org.openapitools.model.StreamModel;

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
        .isRendezvous(false)
        .build();
  }

  public static List<StreamEntity> getStreamEntityList() {
    return List.of(getStreamEntity());
  }

  public static StreamDto getStreamDto() {
    return StreamDto.builder()
        .id(ID)
        .inputChannel(ChannelFixture.getInputChannelDto())
        .outputChannel(ChannelFixture.getOutputChannelDto())
        .isRendezvous(false)
        .build();
  }

  public static List<StreamDto> getStreamDtoList() {
    return List.of(getStreamDto());
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
        .outputChannel(ChannelFixture.getOutputChannelModel())
        .isRendezvous(false);
  }

  public static List<StreamModel> getStreamModelList() {
    return List.of(getStreamModel());
  }
}
