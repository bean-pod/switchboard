package org.beanpod.switchboard.fixture;

import java.util.ArrayList;
import java.util.List;
import org.beanpod.switchboard.dto.StreamLogDto;
import org.beanpod.switchboard.entity.StreamLogEntity;
import org.openapitools.model.CreateStreamLogRequest;
import org.openapitools.model.StreamLogModel;

public class StreamLogFixture {
  public static StreamLogDto getStreamLogDto() {
    return StreamLogDto.builder()
        .id(LogFixture.id)
        .serialNumber(DeviceFixture.SERIAL_NUMBER2)
        .streamId(String.valueOf(StreamFixture.ID))
        .logEntity(LogFixture.getLogEntity())
        .build();
  }

  public static StreamLogEntity getStreamLog() {
    return StreamLogEntity.builder()
        .id(LogFixture.id)
        .serialNumber(DeviceFixture.SERIAL_NUMBER2)
        .streamId(String.valueOf(StreamFixture.ID))
        .logEntity(LogFixture.getLogEntity())
        .build();
  }

  public static StreamLogModel getStreamLogModel() {
    return new StreamLogModel()
        .id(LogFixture.id)
        .serialNumber(DeviceFixture.SERIAL_NUMBER2)
        .streamId((int) StreamFixture.ID)
        .logEntity(LogFixture.getLogModel());
  }

  public static CreateStreamLogRequest getCreateStreamLogRequest() {
    return new CreateStreamLogRequest()
        .streamId((int) StreamFixture.ID)
        .message(LogFixture.message)
        .dateTime(LogFixture.dateTime.toString());
  }

  public static List<StreamLogModel> getListOfStreamLogsModel() {
    List<StreamLogModel> listOfStreamLogsModel = new ArrayList<>();
    listOfStreamLogsModel.add(getStreamLogModel());
    return listOfStreamLogsModel;
  }

  public static List<StreamLogEntity> getListOfStreamLogs() {
    List<StreamLogEntity> listOfStreamLogEntities = new ArrayList<>();
    listOfStreamLogEntities.add(getStreamLog());
    return listOfStreamLogEntities;
  }
}
