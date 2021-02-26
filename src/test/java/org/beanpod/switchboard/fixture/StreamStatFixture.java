package org.beanpod.switchboard.fixture;

import java.util.List;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.entity.StreamStatEntity;
import org.openapitools.model.StreamStatModel;

public class StreamStatFixture {

  public static final long ID = 2429L;

  public static StreamStatEntity getStreamStatEntity() {
    return StreamStatEntity.builder().id(ID).build();
  }

  public static StreamStatDto getStreamStatDto() {
    return StreamStatDto.builder().id(ID).build();
  }

  public static StreamStatModel getStreamStatModel() {
    return new StreamStatModel().id(ID);
  }

  public static List<StreamStatModel> getStreamStatModelList() {
    return List.of(getStreamStatModel());
  }

  public static List<StreamStatDto> getStreamStatDtoList(){
    return List.of(getStreamStatDto());
  }

  public static List<StreamStatEntity> getStreamStatEntityList(){
    return List.of(getStreamStatEntity());
  }
}
